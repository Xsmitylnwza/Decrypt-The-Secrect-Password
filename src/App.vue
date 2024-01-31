<script setup>
import { ref } from "vue";

// data mockup สำหรับการ test rule componant

let rules = [
  {
    ruleNumber: 2,
    message: "Your password must include a number",
    correct: false,
  },
  {
    ruleNumber: 1,
    message: "Your password must be at least 5 characters",
    correct: true,
  },
];

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
function levelSelector(level) {
  if (level === "hard") {
    console.warn("HARD MODE");
  } else if (level === "veryhard") {
    console.warn("VERY HARD MODE");
  } else console.warn("HARDEST MODE!");
}
</script>

<template>
  <!-- rulebox componant -->
  <div
    class="flex flex-col w-full min-h-screen items-center justify-center bg-rose-100 border-2 border-solid"
  >
    <div class="grid md:w-4/12 grid-cols-1 m-2 gap-5">
      <div
        v-for="rule in rules"
        class="sm:w-full rounded-md shadow-md bg-red-300 p-0.5"
        :key="rule.ruleNumber"
      >
        <div
          :class="rule.correct ? 'bg-green-300' : 'bg-red-300'"
          class="py-1 px-4 flex flex-row items-center gap-2"
        >
          <i
            v-if="rule.correct"
            class="fa-solid fa-check text-red-500 pt-1 text-2xl"
          />
          <i v-else class="fa-solid fa-xmark text-red-500 pt-1 text-2xl"></i>
          <p class="font-itim text-xl">Rule {{ rule.ruleNumber }}</p>
        </div>
      </div>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Enter Password Here...</span>
        </div>
      </label>
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Enter Password Here...</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs bg-slate-200"
        />
      </label>
      <img
        class="m-4 rounded-box border-4 border-black"
        src="./assets/picture/2Q.png"
      />
      <div class="animate-bounce flex justify-center font-serif text-base pt-6">
        HOW TO PLAY GAME 🎮
      </div>
    </div>
    <!-- Timer display -->
    <div class="mt-5">
      <p class="font-istok text-xl">Timer {{ Displaytimeformat() }}</p>
      <!-- button for test timer-->
      <button
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
    </div>
    <div class="h-screen">
      <a class="flex justify-center" href="#HowtoPlay">
        <svg
          class="animate-bounce w-8 h-8 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </a>
      <div id="HowtoPlay" class="flex justify-center mt-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque rem
          magni repudiandae tempora eos nemo maiores, doloremque quis obcaecati
          totam, culpa dolorem sit eligendi adipisci laudantium ut! Rem, quidem
          explicabo! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Ea nesciunt corrupti minus facere ex. Distinctio incidunt maxime
          provident rerum ad ea suscipit fuga ex praesentium! Maxime aliquam eos
          excepturi vel.
        </p>
      </div>
    </div>

    <div
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
          magni repudiandae tempora eos nemo maiores, doloremque quis obcaecati
          totam, culpa dolorem sit eligendi adipisci laudantium ut! Rem, quidem
          explicabo! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Ea nesciunt corrupti minus facere ex. Distinctio incidunt maxime
          provident rerum ad ea suscipit fuga ex praesentium! Maxime aliquam eos
          excepturi vel.
        </p>
      </div>
      <!-- <div class="grid md:w-4/12 grid-cols-1 m-2 gap-5">
        <div
          v-for="rule in rules"
          class="sm:w-full rounded-md shadow-md bg-red-300 p-0.5"
          :key="rule.ruleNumber"
        >
          <div
            :class="rule.correct ? 'bg-green-300' : 'bg-red-300'"
            class="py-1 px-4 flex flex-row items-center gap-2"
          >
            <Correct
              v-if="rule.correct"
              class="fa-solid fa-check text-red-500 pt-1 text-2xl"
            />
            <i v-else class="fa-solid fa-xmark text-red-500 pt-1 text-2xl"></i>
            <p class="font-itim text-xl">Rule {{ rule.ruleNumber }}</p>
          </div>
          <div
            :class="rule.correct ? 'bg-green-100' : 'bg-red-100'"
            class="p-4"
          >
            <p class="font-itim text-xl">{{ rule.message }}.</p>
          </div>
        </div> -->
      <!-- </div> -->
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
</style>

