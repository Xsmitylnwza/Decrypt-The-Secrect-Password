  <script setup>
import { computed, ref } from "vue";

// data mockup สำหรับการ test rule componant

let passwordRules = [
  {
    level: "hard",
    rules: [
      {
        id: 1,
        message: "Your loved your cat",
        correct: true,
      },
    ],
  },
  {
    level: "veryhard",
    rules: [
      { id: 2, message: "Your don't loved your cat", correct: false },
      {
        id: 1,
        message: "Your loved your cat",
        correct: true,
      },
    ],
  },
  {
    level: "hardest",
    rules: [
      { id: 3, message: "Your neet to love your cat", correct: true },
      { id: 2, message: "Your don't loved your catr", correct: false },
      {
        id: 1,
        message: "Your loved your cat",
        correct: true,
      },
    ],
  },
];

let selectedLevel = ref("");
let userInput = ref("");
let gameStartted = ref(false);

function levelSelector(level) {
  selectedLevel.value = level;
  stopTimer();
  resetGame();
}

function resetGame() {
  gameStartted.value = false;
  timer.value = 0;
  userInput.value = "";
}

const selectedRules = computed(() => {
  const level = selectedLevel.value;
  const selectedRules = passwordRules.find((rule) => rule.level === level);
  return selectedRules ? selectedRules.rules : [];
});

function startGame() {
  if (selectedLevel.value !== "" && !gameStartted.value) {
    gameStartted.value = true;
    startTimer();
  }
}
let isOpen = ref(false);

// Timer function handle
let timer = ref(0);
let timerInterval;

// function สำหรับจับเวลาจะอัพเดทค่าทุกๆ 1 วินาที
function startTimer() {
  timerInterval = setInterval(() => {
    timer.value++;
  }, 1000);
}

// function สำหรับหยุดจับเวลา
function stopTimer() {
  clearInterval(timerInterval);
}

// function สำหรับแสดงผลลัพธ์ของเวลา
function Displaytimeformat() {
  const hours = Math.floor(timer.value / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timer.value % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer.value % 60).toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
</script>

  <template>
  <!-- rulebox componant -->
  <div
    :class="
      selectedLevel === 'hard'
        ? 'background-color-hard'
        : selectedLevel === 'veryhard'
        ? 'background-color-veryhard'
        : selectedLevel === 'hardest'
        ? 'btn-bg-hardest'
        : 'background-color-hard'
    "
    class="flex flex-col w-full min-h-screen items-center"
  >
    <img
      src="./assets/logo/IMG_5174-removebg-preview.png"
      class="mobile:flex w-3/5 h-3/5 my-4 logo"
    />
    <div
      :class="
        selectedLevel === 'hard'
          ? 'bg-color-hard-box'
          : selectedLevel === 'veryhard'
          ? 'bg-color-veryhard-box'
          : selectedLevel === 'hardest'
          ? 'bg-color-hardest-box'
          : 'bg-color-hard-box'
      "
      class="flex flex-col items-center w-11/12 h-full rounded-box p-3 hardBox"
    >
      <section
        id="select_level"
        class="text-center flex justify-center w-full text-black"
      >
        <div>
          <p class="font-Saira text-white text-center font-medium">
            SELECT LEVEL
          </p>
          <div class="flex flex-row">
            <button
              @click="levelSelector('hard')"
              class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-hard shadow-lg transition-all hover:shadow-indigo-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2"
            >
              HARD
            </button>
            <button
              @click="levelSelector('veryhard')"
              class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-veryHard shadow-lg transition-all hover:shadow-red-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2"
            >
              VERY<br />HARD
            </button>
            <button
              @click="levelSelector('hardest')"
              class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-hardest shadow-lg transition-all hover:shadow-red-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2"
            >
              HARDEST
            </button>
          </div>
        </div>
      </section>
      <div id="input-password" class="items-center w-[300px]">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="font-Saira text-[16px] text-white"
              >Enter Password Here...</span
            >
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="font-itim text-[14px] input input-bordered w-full max-w-xs bg-[#FAFAFA] shadow-inner-lx"
            @input="startGame"
            v-model="userInput"
          />
        </label>
      </div>
      <p class="font-Saira text-[14px] text-white mt-[10px]">
        Time:
        <span class="text-[14px]">
          {{ Displaytimeformat() }}
        </span>
      </p>
      <div class="mobile:flex w-[300px] flex-col my-7 items-center spy">
        <img
          v-if="selectedLevel === 'hard' && !gameStartted"
          class=""
          src="./assets/picture/hard-pic.png"
        />
        <img
          v-if="selectedLevel === 'veryhard' && !gameStartted"
          class=""
          src="./assets/picture/very-hard-pic.png"
        />
        <img
          v-if="selectedLevel === 'hardest' && !gameStartted"
          class="w-80 h-52"
          src="./assets/picture/hardest-pic.png"
        />
        <img
          v-if="selectedLevel === '' && !gameStartted"
          class=""
          src="./assets/picture/hard-pic.png"
        />
        <div v-if="gameStartted" class="flex flex-col">
          <div
            v-for="rule in selectedRules"
            class="sm:w-full rounded-md py-4"
            :key="rule.id"
          >
            <div
              :class="rule.correct ? 'bg-green-300' : 'bg-red-300'"
              class="py-1 px-4 flex flex-row items-center gap-2"
            >
              <i
                v-if="rule.correct"
                class="fa-solid fa-check text-red-500 pt-1 text-xl"
              />
              <i v-else class="fa-solid fa-xmark text-red-500 pt-1 text-xl"></i>
              <p class="font-itim text-sm">Rule {{ rule.id }}</p>
              <p class="font-itim text-sm">{{ rule.message }}.</p>
            </div>
          </div>
        </div>
        <p
          v-if="!gameStartted"
          class="font-Saira text-[13px] text-white mt-[5px]"
        >
          Your Character :
          {{
            selectedLevel === "hard"
              ? "SPY"
              : selectedLevel === "veryhard"
              ? "FBI"
              : selectedLevel === "hardest"
              ? "HACKER"
              : "SPY"
          }}
        </p>
      </div>
      <div
        class="font-Saira text-base text-white pt-6 animate-bounce ml-[5px] HowToPlayFont"
      >
        HOW TO PLAY GAME
      </div>
      <div class="HowToPlay">
        <a class="flex justify-center" href="#HowtoPlay">
          <svg
            class="animate-bounce w-8 h-8"
            width="27"
            height="16"
            viewBox="0 0 27 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="13.8826"
              y1="15.2968"
              x2="1.29288"
              y2="2.70715"
              stroke="white"
              stroke-width="2"
            />
            <line
              x1="13.0878"
              y1="14.5877"
              x2="26.0878"
              y2="1.58769"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        </a>
        <div id="HowtoPlay" class="flex justify-center mt-3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque rem
            magni repudiandae tempora eos nemo maiores, doloremque quis
            obcaecati totam, culpa dolorem sit eligendi adipisci laudantium ut!
            Rem, quidem explicabo! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Ea nesciunt corrupti minus facere ex. Distinctio
            incidunt maxime provident rerum ad ea suscipit fuga ex praesentium!
            Maxime aliquam eos excepturi vel.
          </p>
        </div>
      </div>

      <!-- Timer display -->
      <!-- <div class="mt-5">
          <p class="font-istok text-xl">Timer {{ Displaytimeformat() }}</p>
          button for test timer-->
      <!-- <button
            @click="startTimer"
            class="font-itim border border-black p-1 rounded-[5px] mr-[8px]"
          >
            Start Timer
          </button>
          <button
            @click="stopTimer"
            class="font-itim border border-black p-1 rounded-[5px]"
          >
            Stop Timer
          </button>
        </div> -->
      <!-- <div
          :class="
            isOpen
              ? 'h-[350px] bg-white rounded-[10px] transition-height duration-300 ease-in-out'
              : 'h-[43px] transition-height duration-300 ease-in-out'
          "
          class="fixed bottom-0 overflow-hidden"
        >
          <div class="flex flex-col items-center p-1" @click="isOpen = !isOpen">
            <button class="flex flex-col items-center font-itim">
              HOW TO PLAY GAME 🎮
              <svg
                width="24"
                height="10"
                viewBox="0 0 27 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="13.8826"
                  y1="15.2968"
                  x2="1.29294"
                  y2="2.70715"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="13.0877"
                  y1="14.5877"
                  x2="26.0877"
                  y2="1.58769"
                  stroke="black"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
          <div class="w-[300px] p-[10px]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque rem
              magni repudiandae tempora eos nemo maiores, doloremque quis
              obcaecati totam, culpa dolorem sit eligendi adipisci laudantium ut!
              Rem, quidem explicabo! Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Ea nesciunt corrupti minus facere ex. Distinctio
              incidunt maxime provident rerum ad ea suscipit fuga ex praesentium!
              Maxime aliquam eos excepturi vel.
            </p>
          </div> -->
    </div>
  </div>
</template>

  <style scoped>
.background-color-hard {
  background: linear-gradient(
    104deg,
    #6e07f0 8.15%,
    rgba(64, 22, 131, 0.44) 68.84%,
    rgba(29, 34, 45, 0) 89.63%
  );
}

.bg-color-hard-box {
  border-radius: 31px;
  border: 1px solid #fff;
  background: #590ebb;
}

.btn-bg-hard {
  background: linear-gradient(
    104deg,
    #590ebb 6.68%,
    rgba(0, 0, 0, 0.74) 92.15%
  );
}

.background-color-veryhard {
  background: linear-gradient(
    104deg,
    rgba(209, 164, 15, 1) 0%,
    rgba(133, 39, 18, 1) 100%
  );
}

.bg-color-veryhard-box {
  border-radius: 31px;
  border: 1px solid #fff;
  background: #e36409;
}

.btn-bg-veryHard {
  background: linear-gradient(
    104deg,
    #f06907 8.15%,
    rgba(169, 57, 21, 0.53) 68.84%,
    rgba(60, 23, 8, 0.68) 89.63%
  );
}

.background-color-hardest {
  background: linear-gradient(
    104deg,
    rgba(209, 15, 15, 1) 14%,
    rgba(133, 18, 18, 1) 87%,
    rgba(209, 164, 15, 1) 100%,
    rgba(133, 18, 18, 1) 100%
  );
}

.bg-color-hardest-box {
  border-radius: 31px;
  border: 1px solid #fff;
  background: #cb0809;
}

.btn-bg-hardest {
  background: linear-gradient(
    104deg,
    #f00707 8.15%,
    rgba(96, 22, 22, 0.83) 68.6%,
    rgba(29, 34, 45, 0.94) 89.63%
  );
}

@media (max-width: 600px) {
  .HowToPlay {
    height: 100vh;
  }
  .spy {
    width: 166px;
    height: 236px;
  }
}
@media (min-width: 601px) and (max-width: 1200px) {
  .logo {
    width: 441px;
    height: 238px;
  }
  .spy {
    width: 276px;
    height: 392px;
  }
}
@media (min-width: 1201px) {
  .hardBox {
    height: 100vh;
  }
  .logo {
    width: 441px;
    height: 238px;
  }
  .spy {
    width: 200px;
    height: 380px;
    position: absolute;
    margin-top: 60px;
    left: 13%;
  }

  .button {
  }
  .HowToPlayFont {
    position: absolute;
    bottom: 5%;
    text-align: center;
    left: 45%;
  }
  .HowToPlay {
    position: absolute;
    bottom: -10%;
    right: 5%;
    left: 5%;
  }
}
</style>
