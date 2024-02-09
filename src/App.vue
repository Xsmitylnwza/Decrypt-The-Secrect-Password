<script setup>
import { computed, ref } from 'vue'

// data mockup สำหรับการ test rule componant

let passwordRules = [
  {
    level: 'Hard',
    rules: [
      {
        id: 1,
        message: 'React vs Vue',
        correct: false,
      },
    ],
    logo: './images/hard-pic.png',
    character: 'SPY',
    backgroundColor: 'background-color-hard',
    boxColor: 'bg-color-hard-box',
  },
  {
    level: 'Veryhard',
    rules: [
      {
        id: 1,
        message: 'พูดว่า lungtoo',
        correct: false,
      },
      {
        id: 2,
        message: 'ในภาพนี้เป็นภาพของใคร',
        correct: false,
        picture: './images/lungpon.png',
      },
    ],
    logo: './images/veryhard-pic.png',
    character: 'FBI',
    backgroundColor: 'background-color-veryhard',
    boxColor: 'bg-color-veryhard-box',
  },
  {
    level: 'Hardest',
    rules: [
      { id: 1, message: 'Your password must have some digit', correct: false },
      {
        id: 2,
        message: 'Your password must have atleast 5 characters',
        correct: false,
      },
      {
        id: 3,
        message: 'Your password must includes speial characters',
        correct: false,
      },
      { id: 4, message: 'Your digit must add to 35', correct: false },
      { id: 5, message: 'What month its is?', correct: false },
      { id: 6, message: '2 + 7 * 2 + 9 / 3 + 9 * 2 = ?', correct: false },
      { id: 7, message: 'What do Japanese people used?', correct: false },
      {
        id: 8,
        message: 'Oh no it fire burning your password!?!!',
        correct: false,
      },
    ],
    logo: './images/hardest-pic.png',
    character: 'HACKER',
    backgroundColor: 'background-color-hardest',
    boxColor: 'bg-color-hardest-box',
  },
]

let passedRule = ref(1)
let selectedLevel = ref(passwordRules[0])
let userInput = ref('')
let gameStartted = ref(false)
let timer = ref(0)
let timerInterval
let isOpen = ref(false)
const checkAnswer = {
  checkAnswerHard,
  checkAnswerVeryhard,
  checkAnswerHardest,
}

function levelSelector(level) {
  selectedLevel.value = level
  passedRule.value = 1
  stopTimer()
  resetGame()
}

function checkAnswerHard() {
  let question = passwordRules[0]
  if (userInput.value.includes('React')) {
    question.rules[0].correct = true
  } else {
    question.rules[0].correct = false
  }
}

function checkAnswerVeryhard() {
  let question = passwordRules[1]
  if (userInput.value.includes('lungtoo')) {
    question.rules[0].correct = true
    passedRule.value = 2
  } else {
    question.rules[0].correct = false
  }

  if (userInput.value.includes('no')) {
    question.rules[1].correct = true
    userInput.value = '🔥🔥🔥'
  } else {
    question.rules[1].correct = false
  }
}

function checkAnswerHardest() {
  let question = passwordRules[2]
  let numSum = userInput.value.match(/\d/g)
  let sum = numSum
    ? numSum.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0)
    : 0
  var today = new Date()
  var month = today.toLocaleString('en-US', { month: 'short' })

  if (/\d{3,}/.test(userInput.value)) {
    question.rules[0].correct = true
    if (passedRule.value < 2) {
      passedRule.value = 2
    }
  } else {
    question.rules[0].correct = false
  }

  if (userInput.value.length >= 5 && passedRule.value >= 2) {
    question.rules[1].correct = true
    if (passedRule.value < 3) {
      passedRule.value = 3
    }
    // userInput.value = "🔥🔥🔥"
  } else {
    question.rules[1].correct = false
  }

  if (/[!@#$%]/.test(userInput.value) && passedRule.value >= 3) {
    question.rules[2].correct = true
    if (passedRule.value < 4) {
      passedRule.value = 4
    }
  } else {
    question.rules[2].correct = false
  }
  if (sum == 35 && passedRule.value >= 4) {
    question.rules[3].correct = true
    if (passedRule.value < 5) passedRule.value = 5
  } else {
    question.rules[3].correct = false
  }
  if (userInput.value.includes(month) && passedRule.value >= 5) {
    question.rules[4].correct = true
    if (passedRule.value < 6) passedRule.value = 6
  } else {
    question.rules[4].correct = false
  }
  if (userInput.value.includes('37') && passedRule.value >= 6) {
    question.rules[5].correct = true
    if (passedRule.value < 7) passedRule.value = 7
  } else {
    question.rules[5].correct = false
  }
  if (userInput.value.includes('¥') && passedRule.value >= 7) {
    question.rules[6].correct = true
    if (passedRule.value < 8) passedRule.value = 8
  } else {
    question.rules[6].correct = false
  }
}

function resetGame() {
  gameStartted.value = false
  timer.value = 0
  userInput.value = ''
}

function startGame() {
  if (selectedLevel.value !== '' && !gameStartted.value) {
    gameStartted.value = true
    startTimer()
  }
}

// Timer function handle

// function สำหรับจับเวลาจะอัพเดทค่าทุกๆ 1 วินาที
function startTimer() {
  timerInterval = setInterval(() => {
    timer.value++
  }, 1000)
}

// function สำหรับหยุดจับเวลา
function stopTimer() {
  clearInterval(timerInterval)
}

// function สำหรับแสดงผลลัพธ์ของเวลา
function Displaytimeformat() {
  const hours = Math.floor(timer.value / 3600)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((timer.value % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (timer.value % 60).toString().padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
</script>

<template>
  <!-- rulebox componant -->
  <div
    :class="selectedLevel.backgroundColor"
    class="flex flex-col w-full min-h-screen items-center"
  >
    <img
      src="./assets/logo/IMG_5174-removebg-preview.png"
      class="mobile:flex w-3/5 h-3/5 my-4 laptop:w-3/12 h-3/12"
    />
    <!-- main box -->
    <div
      :class="selectedLevel.boxColor"
      class="flex flex-row w-11/12 h-full rounded-box p-3 mb-4 border"
    >
      <!-- row1 character hidden-->
      <div
        class="absolute invisible laptop:visible flex flex-col items-center ml-[2%] labtop-L:ml-[8%]"
      >
        <!-- Image only visible on laptop -->
        <img
          :src="selectedLevel.logo"
          alt
          class="laptop:flex w-[220px] h-[250px] pt-3"
        />
        <p class="font-Saira text-[13px] text-white items-center">
          Your Character : {{ selectedLevel.character }}
        </p>
      </div>
      <!-- level componant  row2-->

      <div class="flex flex-col items-center w-[auto] m-[auto]">
        <section id="select_level" class="text-center">
          <div>
            <p class="font-Saira text-white font-medium">SELECT LEVEL</p>
            <div class="flex flex-row">
              <button
                @click="levelSelector(passwordRules[0])"
                class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-hard shadow-lg transition-all hover:shadow-indigo-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2"
              >
                HARD
              </button>
              <button
                @click="levelSelector(passwordRules[1])"
                class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-veryHard shadow-lg transition-all hover:shadow-red-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2"
              >
                VERY<br />HARD
              </button>
              <button
                @click="levelSelector(passwordRules[2])"
                class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-hardest shadow-lg transition-all hover:shadow-red-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2"
              >
                HARDEST
              </button>
            </div>
          </div>
        </section>
        <!-- input component in row 2-->
        <div id="input-password" class="items-start w-[300px]">
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
              @input="
                () => {
                  startGame()
                  checkAnswer['checkAnswer' + selectedLevel.level]()
                }
              "
              v-model="userInput"
            />
          </label>
        </div>
        <!-- timer componant in row2 -->
        <div class="timer m-[auto] laptop:ml-24">
          <p class="flex font-Saira text-[14px] text-white mt-[10px]">
            Time:
            <span class="text-[14px] text-red-600">
              {{ Displaytimeformat() }}
            </span>
          </p>
        </div>
        <!-- Characteristic component row 2 for mobile -->
        <div class="flex w-[300px] flex-col items-center my-7">
          <img
            v-if="selectedLevel && !gameStartted"
            :src="selectedLevel.logo"
            alt
            class="flex items-center w-4/5 h-4/5 laptop:hidden"
          />
          <div v-if="gameStartted" class="flex flex-col">
            <div
              v-for="i in passedRule"
              class="min-w-[307px] sm:w-full rounded-md py-4"
              :key="i"
            >
              <div
                :class="
                  selectedLevel.rules[i - 1]?.correct
                    ? 'bg-[#62EC70]'
                    : 'bg-[#FC6C6C]'
                "
                class="py-2 px-3 flex flex-col border border-white rounded-[14px]"
              >
                <div class="flex items-center gap-2">
                  <i
                    v-if="selectedLevel.rules[i - 1]?.correct"
                    class="fa-solid fa-check text-white pt-1 text-xl"
                  />
                  <i
                    v-else
                    class="fa-solid fa-xmark text-white pt-1 text-xl"
                  ></i>
                  <p class="font-Saira text-sm text-white">
                    {{
                      selectedLevel.rules[i - 1]?.correct
                        ? 'Correct'
                        : 'Incorrect'
                    }}
                    Rule {{ selectedLevel.rules[i - 1]?.id }}
                    {{ selectedLevel.rules[i - 1]?.message }}
                  </p>
                </div>
                <img
                  v-if="selectedLevel.rules[i - 1]?.picture"
                  :src="selectedLevel.rules[i - 1]?.picture"
                  class="w-[250px] h-[150px] m-[auto] mt-[10px] rounded-[15px]"
                />
              </div>
            </div>
          </div>
          <p
            v-if="!gameStartted"
            class="font-Saira text-[13px] text-white mt-[5px] laptop:hidden"
          >
            Your Character : {{ selectedLevel.character }}
          </p>
        </div>
        <!-- how to play componant -->
        <!-- Open the modal using ID.showModal() method -->
        <div class="flex m-[auto]">
          <button
            class="btn border-0 font-Saira font-light bg-white text-black hover:text-white transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 duration-150"
            onclick="howToPlay.showModal()"
          >
            HOW TO PLAY GAME 🎮
          </button>
          <dialog id="howToPlay" class="modal">
            <div class="modal-box bg-white">
              <h3 class="font-bold text-lg">How to play game</h3>
              <p class="py-4">
                <!-- Press ESC key or click the button below to close -->
                1.first step
              </p>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button
                    class="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 duration-150 border-0 text-white"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
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
</style>
