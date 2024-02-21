<script setup>
import { ref, watchEffect } from "vue";
import data from "./data/data.json";
import musicHard from "/music/musicHard.mp3";
import musicVeryHard from "/music/musicVeryHard.mp3";
import musicHardest from "/music/musicHardest.mp3";
import correct from "/music/correct.mp3";
import victory from "/music/victoryscreech.mp3";
import loose from "/music/lose.mp3"

const passedRule = ref(1);
const selectedLevel = ref(getRule());
const userInput = ref("");
const gameStartted = ref(false);
const timer = ref("10:00:00");
const ruleShow = ref(selectedLevel.value.rules.slice(0, 1));
const isAnimated = ref(false);
const showResult = ref(false);
const isWin = ref(false);
let checkAudio = ref(null);
let isPlaying = ref(true);
let IsSpread = true;
let IsFire = true;
let time;

function getRule() {
  const localRule = JSON.parse(sessionStorage.getItem('data')) || data[0]
  if (localRule.level === 'Hard') {
    return data[0]
  } else if (localRule.level === 'Veryhard') {
    return data[1]
  } else return data[2]
}

const toggleAnimation = () => {
  isAnimated.value = !isAnimated.value;
};

const checkAnswer = {
  checkAnswerHard,
  checkAnswerVeryhard,
  checkAnswerHardest,
}

const audioMapping = {
  Hard: new Audio(musicHard),
  Veryhard: new Audio(musicVeryHard),
  Hardest: new Audio(musicHardest),
}

const startNewAudio = (level) => {
  const audio = audioMapping[level]
  if (checkAudio.value !== null) {
    checkAudio.value.pause()
    checkAudio.value.currentTime = 0
  }
  audio.play()
  checkAudio.value = audio
}

const startNewSoundCorrect = () => {
  const audioCorrect = new Audio(correct)
  audioCorrect.play()
}

const stopSound = () => {
  isPlaying = false;
  checkAudio.value.pause();
};

const playSound = () => {
  isPlaying = true
  checkAudio.value.play()
}

function sortRules(rules) {
  return rules.slice(0, passedRule.value).sort((a, b) => {
    if (a.correct && b.correct) {
      return -1
    } else if (!a.correct && b.correct) {
      return -1
    } else {
      return a.id - b.id
    }
  })
}

watchEffect(() => {
  if (checkAudio.value !== null) {
    checkAudio.value.onended = () => startNewAudio(selectedLevel.value.level)
  }
  ruleShow.value = sortRules(selectedLevel.value.rules)
})


function levelSelector(level) {
  selectedLevel.value = level
  passedRule.value = 1
  ruleShow.value = selectedLevel.value.rules.slice(0, passedRule.value)
  resetGame()
  timeformat(selectedLevel.value.time)
  startNewAudio(selectedLevel.value.level)
  if (!isPlaying) stopSound()
}

function updateRuleStatus(ruleIndex) {
  selectedLevel.value.rules[ruleIndex].correct = true;
  if (passedRule.value <= ruleIndex + 1) {
    passedRule.value = passedRule.value + 1;
    startNewSoundCorrect();
    return;
  }
}
function firePassword(length) {
  let passwordLength = length;
  let index = 0;
  const fire = setInterval(function () {
    let inputArray = Array.from(userInput.value);
    inputArray[index] = "🔥";
    userInput.value = inputArray.join("");
    index++;
    if (index >= passwordLength) {
      clearInterval(fire);
      getResult(passedRule.value - 1 == selectedLevel.value.rules.length);
    }
  }, 100);
}

function timeformat(seconds) {
  const minute = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const second = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  const milisecond = ((seconds - Math.floor(seconds)) * 1000)
    .toFixed(0)
    .padStart(2, "0")
    .slice(0, 2);
  timer.value = minute + ":" + second + ":" + milisecond;
}

function countdown(seconds) {
  time = setInterval(function () {
    seconds -= 0.004;
    timeformat(seconds);
    if (seconds < 0.001 || isWin.value) {
      clearInterval(time);
      firePassword(userInput.value.length);
    }
  }, 1);
}

function resetGame() {
  clearInterval(time);
  gameStartted.value = false;
  userInput.value = "";
}

function startGame() {
  if (selectedLevel.value !== "" && !gameStartted.value) {
    gameStartted.value = true;
    countdown(selectedLevel.value.time);
  }
}
function getResult(result) {
  showResult.value = true;
  isWin.value = result;
  if (isWin.value === true) {
    const audioWin = new Audio(victory)
    audioWin.play()
  } else {
    const audioLose = new Audio(loose)
    audioLose.play()
  }
}

function retry() {
  sessionStorage.setItem("data", JSON.stringify(selectedLevel.value));
  location.reload();
}

function checkAnswerHard() {
  const rules = selectedLevel.value.rules
  if (/[aeiouAEIOU]/.test(userInput.value) && passedRule.value >= 1) {
    updateRuleStatus(0)
  } else {
    rules[0].correct = false
  }
  if (/\d{2,}/.test(userInput.value) && passedRule.value >= 2) {
    updateRuleStatus(1)
  } else {
    rules[1].correct = false
  }
  if (/yes/i.test(userInput.value) && passedRule.value >= 3) {
    updateRuleStatus(2)
  } else {
    rules[2].correct = false
  }
  if (/liverpool/i.test(userInput.value) && passedRule.value >= 4) {
    updateRuleStatus(3)
  } else {
    rules[3].correct = false
  }
  if (userInput.value.includes('ฟ้า') && passedRule.value >= 5) {
    updateRuleStatus(4)
  } else {
    rules[4].correct = false
  }
  if (userInput.value.includes('BLUE') && passedRule.value >= 6) {
    updateRuleStatus(5)
  } else {
    rules[5].correct = false
  }
  if (userInput.value.includes('0') && passedRule.value >= 7) {
    updateRuleStatus(6)
  } else {
    rules[6].correct = false
  }
  if (/ronaldo/i.test(userInput.value) && passedRule.value >= 8) {
    updateRuleStatus(7)
  } else {
    rules[7].correct = false
  }
  if (userInput.value.includes('2547') && passedRule.value >= 9) {
    updateRuleStatus(8)
  } else {
    rules[8].correct = false
  }
  if (/youtube/i.test(userInput.value) && passedRule.value >= 10) {
    updateRuleStatus(9)
  } else {
    rules[9].correct = false
  }
  if (rules.every((rule) => rule.correct === true)) {
    firePassword(userInput.value.length);
  }
}

function checkAnswerVeryhard() {
  const rules = selectedLevel.value.rules
  let numMatch = userInput.value.match(/\d/g)
  let multiply = numMatch.reduce((acc, cur) => parseInt(acc) * parseInt(cur), 1)
  if (userInput.value.length >= 4 && passedRule.value >= 1) {
    updateRuleStatus(0)
  } else {
    rules[0].correct = false
  }
  if (multiply == 20 && passedRule.value >= 2) {
    updateRuleStatus(1)
  } else {
    rules[1].correct = false
  }
  if (/yellow/i.test(userInput.value) && passedRule.value >= 3) {
    updateRuleStatus(2)
  } else {
    rules[2].correct = false
  }
  if (
    /ricardo/i.test(userInput.value) ||
    (userInput.value.includes('ริคาโด้') && passedRule.value >= 4)
  ) {
    updateRuleStatus(3)
  } else {
    rules[3].correct = false
  }
  if (/somporn/i.test(userInput.value) && passedRule.value >= 5) {
    updateRuleStatus(4)
  } else {
    rules[4].correct = false
  }
  if (
    /lungtoo/i.test(userInput.value) ||
    (userInput.value.includes('ลุงตู่') && passedRule.value >= 6)
  ) {
    updateRuleStatus(5)
  } else {
    rules[5].correct = false
  }
  if (
    /Russia/i.test(userInput.value) ||
    (userInput.value.includes('รัสเซีย') && passedRule.value >= 7)
  ) {
    updateRuleStatus(6)
  } else {
    rules[6].correct = false
  }
  if (/BillRussell/i.test(userInput.value) && passedRule.value >= 8) {
    updateRuleStatus(7)
  } else {
    rules[7].correct = false
  }
  if (/XIII/i.test(userInput.value) && passedRule.value >= 9) {
    updateRuleStatus(8)
  } else {
    rules[8].correct = false
  }
  if (/seventeen/i.test(userInput.value) && passedRule.value >= 10) {
    updateRuleStatus(9)
  } else {
    rules[9].correct = false
  }
  if (userInput.value.includes('an=a1+(n-1)d') && passedRule.value >= 11) {
    updateRuleStatus(10)
  } else {
    rules[10].correct = false
  }
  if (rules.every((rule) => rule.correct === true)) {
    firePassword(userInput.value.length);
  }
}

function checkAnswerHardest() {
  const rules = selectedLevel.value.rules
  let numSum = userInput.value.match(/\d/g)
  let sum = numSum
    ? numSum.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0)
    : 0
  const today = new Date()
  const month = today.toLocaleString('en-US', { month: 'short' })

  if (/\d{3,}/.test(userInput.value) && passedRule.value >= 1) {
    updateRuleStatus(0)
  } else {
    rules[0].correct = false
  }
  if (userInput.value.length >= 5 && passedRule.value >= 2) {
    updateRuleStatus(1)
  } else {
    rules[1].correct = false
  }
  if (/[!@#$%]/.test(userInput.value) && passedRule.value >= 3) {
    updateRuleStatus(2)
  } else {
    rules[2].correct = false
  }
  if (sum == 35 && passedRule.value >= 4) {
    updateRuleStatus(3)
  } else {
    rules[3].correct = false
  }
  if (userInput.value.includes(month) && passedRule.value >= 5) {
    updateRuleStatus(4)
  } else {
    rules[4].correct = false
  }
  if (userInput.value.includes('37') && passedRule.value >= 6) {
    updateRuleStatus(5)
  } else {
    rules[5].correct = false
  }
  if (userInput.value.includes('¥') && passedRule.value >= 7) {
    let index = 1
    if (IsSpread) {
      userInput.value = '🦠' + userInput.value.substring(1)
      IsSpread = false
    }
    updateRuleStatus(6)
    if (!rules[7].correct) {
      const virus = setInterval(function () {
        let inputArray = Array.from(userInput.value)
        inputArray[index] = '🦠'
        userInput.value = inputArray.join('')
        index++
        if (rules[7].correct) {
          clearInterval(virus)
        }
      }, 4000)
    }
  } else {
    rules[6].correct = false
  }
  if (!userInput.value.includes('🦠') && passedRule.value >= 8) {
    updateRuleStatus(7)
  } else {
    rules[7].correct = false
  }
  if (/33f7m/.test(userInput.value) && passedRule.value >= 9) {
    updateRuleStatus(8)
  } else {
    rules[8].correct = false
  }
  if (/cheer/i.test(userInput.value) && passedRule.value >= 10) {
    let index = 1
    if (IsFire) {
      userInput.value = '🔥' + userInput.value.substring(1)
      IsFire = false
    }
    updateRuleStatus(9)
    if (!rules[10].correct) {
      const virus = setInterval(function () {
        let inputArray = Array.from(userInput.value)
        inputArray[index] = '🔥'
        userInput.value = inputArray.join('')
        index++
        if (rules[10].correct) {
          clearInterval(virus)
        }
      }, 2000)
    }
  } else {
    rules[9].correct = false
  }
  if (!userInput.value.includes('🔥') && passedRule.value >= 11) {
    updateRuleStatus(10)
  } else {
    rules[10].correct = false
  }
  if (userInput.value.includes('👑') && passedRule.value >= 12) {
    updateRuleStatus(11)
  } else {
    rules[11].correct = false
  }
  if (rules.every((rule) => rule.correct === true)) {
    firePassword(userInput.value.length);
  }
}


</script>

<template>
  <!-- rulebox componant -->
  <div v-show="showResult">
    <div id="modelConfirm" class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
      <div class="relative top-40 mx-auto rounded-md bg-white-0 max-w-md">
        <div class="p-6 pt-0 text-center">
          <img :src="isWin ? '/images/congrat.png' : '/images/game-over.png'" />
          <button @click=" retry()"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
            ReStart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div :class="selectedLevel.backgroundColor" class="flex flex-col w-full min-h-screen items-center">
    <div class="flex flex-row w-full">

      <div class="absolute right-0 z-50">
        <label class="swap">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" />
          <!-- volume off icon -->
          <svg :class="selectedLevel.soundColor" class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg"
            width="48" height="48" viewBox="0 0 24 24" @click="stopSound">
            <path
              d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
          </svg>
          <!-- volume on icon -->
          <svg :class="selectedLevel.soundColor" class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg"
            width="48" height="48" viewBox="0 0 24 24" @click="playSound">
            <path
              d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
          </svg>
        </label>
      </div>
      <div class="grow">
        <div class="w-11/12 animate-jump-in m-auto">
          <img src="./assets/logo/IMG_5174-removebg-preview.png" class="w-[90%] m-auto laptop:w-[30%] curser-pointer"
            @click="toggleAnimation" :class="{ 'animate-jump-in': isAnimated }" />
        </div>
      </div>
    </div>
    <!-- main box -->
    <div :class="selectedLevel.boxColor" class="flex flex-row w-11/12 h-full rounded-box p-3 mb-4 border">
      <!-- row1 character hidden-->
      <div
        class="absolute invisible laptop:visible flex flex-col items-center ml-[2%] labtop-L:ml-[8%] hover:animate-jump hover:animate-once hover:animate-ease-in-out hover:animate-normal hover:animate-fill-forwards">
        <!-- Image only visible on laptop -->
        <img :src="selectedLevel.logo" alt
          class="laptop:flex w-[220px] h-[250px] pt-3 hover:animate-rotate-y 1`hover:animate-ease-in-out hover:animate-normal hover:animate-fill-forwards" />
        <p class="font-Saira text-[13px] text-white items-center">
          Your Character : {{ selectedLevel.character }}
        </p>
      </div>
      <!-- level componant  row2-->

      <div class="flex flex-col items-center w-[280px] m-[auto] mobile-M:w-[375px]">
        <section id="select_level" class="text-center">
          <div>
            <p class="font-Saira text-white font-medium">SELECT LEVEL</p>
            <div class="flex flex-row">
              <button @click="levelSelector(data[0])"
                class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-hard shadow-lg transition-all hover:shadow-indigo-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2">
                HARD
              </button>
              <button @click="levelSelector(data[1])"
                class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-veryHard shadow-lg transition-all hover:shadow-red-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2">
                VERY<br />HARD
              </button>
              <button @click="levelSelector(data[2])"
                class="font-Saira text-md text-center font-medium text-white h-20 w-20 rounded-full btn-bg-hardest shadow-lg transition-all hover:shadow-red-500/50 motion-safe:hover:scale-110 focus:scale-110 my-3 mx-2">
                HARDEST
              </button>
            </div>
          </div>
        </section>
        <!-- input component in row 2-->
        <div id="input-password" class="items-start w-[250px] mobile-M:w-[300px]">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="font-Saira text-[16px] text-white">Enter Password Here...</span>
            </div>
            <input type="text" placeholder="Type here"
              class="font-itim text-[14px] input input-bordered w-full max-w-xs bg-[#FAFAFA] shadow-inner-lx" @input="() => {
                startGame()
                checkAnswer['checkAnswer' + selectedLevel.level]()
              }
                " v-model="userInput" />
          </label>
        </div>
        <!-- timer componant in row2 -->
        <div class="timer m-[auto]">
          <p class="flex font-Saira text-[14px] text-white mt-[10px]">
            Time:&nbsp;
            <span :class="selectedLevel.textColor" class="text-[14px]">
              {{ timer }}
            </span>
          </p>
        </div>
        <!-- Characteristic component row 2 for mobile -->
        <div class="flex w-[300px] flex-col items-center my-2">
          <img v-if="selectedLevel && !gameStartted" :src="selectedLevel.logo" alt
            class="flex items-center w-4/5 h-4/5 laptop:hidden" />
          <div v-if="gameStartted" class="flex flex-col">
            <div v-for="rule in ruleShow" class="w-[270px] mobile-M:w-[307px] sm:w-full rounded-md py-3 animate-fade-up"
              :key="rule.id">
              <div :class="rule?.correct
                ? 'bg-[#22c55e] hover:bg-green-400 shadow-md shadow-green-200 animate-jump animate-ease-in'
                : 'bg-[#e11d48] hover:bg-red-500 shadow-md shadow-red-200 animate-shake'
                " class="py-4 px-5 flex flex-col border border-white rounded-[14px]">
                <div class="flex flex-col gap-2">
                  <div class="items-start font-Saira text-white">
                    Rule {{ rule?.id }} :
                    {{ rule?.correct ? 'Correct' : 'Incorrect' }}
                    <div class="border mt-2"></div>
                  </div>
                  <div class="flex flex-row">
                    <i v-if="rule?.correct" class="fa-solid fa-check text-green-50 pt-1 text-xl" />
                    <i v-else class="fa-solid fa-xmark text-white pt-1 text-xl"></i>
                    <p class="font-Saira text-sm text-white ml-3 mt-1">
                      {{ rule?.message }}
                    </p>
                  </div>
                </div>
                <img v-if="rule?.picture" :src="rule?.picture"
                  class="w-[250px] h-[150px] m-[auto] mt-[10px] rounded-[15px]" />
              </div>
            </div>
          </div>
          <p v-if="!gameStartted" class="font-Saira text-[13px] text-white mt-[5px] laptop:hidden">
            Your Character : {{ selectedLevel.character }}
          </p>
        </div>
        <!-- how to play componant -->
        <!-- Open the modal using ID.showModal() method -->
        <div class="flex m-[auto]">
          <button
            class="btn border-0 font-Saira font-light bg-white text-black hover:text-white transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 duration-150"
            onclick="howToPlay.showModal()">
            HOW TO PLAY GAME 🎮
          </button>
          <dialog id="howToPlay" class="modal">
            <div class="modal-box bg-white">
              <h3
                class="font-bold text-3xl text-black mb-4 text-center hover:transition ease-in-out hover:-translate-y-1 hover:scale-105">
                How to play this game! 🎮
              </h3>
              <div class="overflow-y-auto overscroll-auto h-96">
                <div class="flex flex-col items-center">
                  <div class="py-4 text-center">
                    <!-- Press ESC key or click the button below to close -->
                    <div class="font-bold text-black">
                      1.Select your Power(Level)
                    </div>
                    (Hard = beginner)<br />
                    (Very Hard = ok (but smart in Math))<br />
                    (Hardest = Genius)
                  </div>
                  <img src="/images/howtoplay1.png" alt="select Level image"
                    class="rounded-box hover:transition ease-in-out hover:-translate-y-1 hover:scale-105" />
                  <p class="mt-4 text-center">
                    Then any level it give your Character to play password game
                  </p>
                  <p class="mt-4 font-bold">Characteristic to play Game</p>
                </div>
                <div class="flex flex-row mt-3">
                  <div class="w-[100%] hover:transition ease-in-out hover:-translate-y-1 hover:scale-105">
                    <img src="/images/hard-pic.png" alt="spy" class="w-[100%] h-[100%]" />
                  </div>
                  <div class="w-[100%] hover:transition ease-in-out hover:-translate-y-1 hover:scale-105">
                    <img src="/images/veryhard-pic.png" alt="FBI" class="w-[100%] h-[99.7%]" />
                  </div>
                  <div class="w-[100%] hover:transition ease-in-out hover:-translate-y-1 hover:scale-105">
                    <img src="/images/hardest-pic.png" alt="hacker" class="w-[100%] h-[99.5%]" />
                  </div>
                </div>
                <div class="flex flex-row mt-3 mr-1">
                  <p class="text-center text-sm font-bold mx-2">
                    Your Character is SPY
                  </p>
                  <p class="text-center text-sm font-bold mx-2">
                    Your Character is FBI
                  </p>
                  <p class="text-center text-sm font-bold mx-2">
                    Your Character is Hacker
                  </p>
                </div>
                <div class="flex flex-col items-center mt-3">
                  <p>**Character mean your power to play game harder**</p>
                  <p class="font-bold text-black mt-2">
                    2.Enter password in textbox input
                  </p>
                  <img src="/images/enterpassword.png" alt="enterpassword"
                    class="rounded-box w-11/12 mt-3 hover:transition ease-in-out hover:-translate-y-1 hover:scale-105" />
                  <p class="text-center mt-3 mb-3">
                    2.1 ) when you enter password in textbox input rule will
                    generate
                  </p>
                  <div class="font-bold text-red-300 mt-3 text-center">
                    Then : You must follow the rule
                  </div>

                  <img src="/images/correct-some-password.png" alt="corretSomePassword"
                    class="rounded-box w-11/12 mt-3 hover:transition ease-in-out hover:-translate-y-1 hover:scale-105" />
                  <div class="text-center mt-3">
                    2.2 ) When you enter password follow rule1 untill
                    <div class="text-green-500 font-bold">correct</div>
                    next rule will generate new rule on top of correct rule
                  </div>
                  <div class="font-bold text-black mt-3">
                    3.Follow the rule until All rule
                    <div class="text-green-500 font-bold text-center">
                      correct!!!
                    </div>
                  </div>
                  <div class="text-center">this is two way of Game finish</div>
                  <div class="flex flex-col items-center">
                    <img src="/images/congratulation-end.png" alt="congratulation"
                      class="rounded-box w-11/12 mt-3 hover:transition ease-in-out hover:-translate-y-1 hover:scale-105" />
                    <div class="flex flex-row mt-3 hover:animate-shake">
                      <div class="font-bold">Way 1:</div>
                      <div class="font-bold text-green-500">
                        WIN THIS LEVEL🎇
                      </div>
                    </div>

                    <img src="/images/game-over-end.png" alt="gameOver"
                      class="rounded-box w-11/12 mt-3 hover:transition ease-in-out hover:-translate-y-1 hover:scale-105" />
                    <div class="flex flex-row mt-3 hover:animate-shake">
                      <div class="font-bold">Way 2:</div>
                      <div class="font-bold text-red-500">GAME OVER🚨</div>
                      <div class="font-bold">(loser way)</div>
                    </div>
                  </div>
                  <div class="mt-3 text-center hover:text-red-500">
                    <div class="font-bold hover:animate-shake hover:text-red-500">
                      Game tip!!!
                    </div>
                    <div class="hover:text-red-500">
                      Time is runing when you text in text box you can get time
                      to challenge with your friend
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button
                    class="btn rounded-box w-30 bg-red-600 text-white border-0 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform motion-safe:hover:scale-110">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-color-hard {
  color: #ff0000;
}

.sound-color-hard {
  color: #f0ffff;
}

.background-color-hard {
  background: linear-gradient(104deg,
      #6e07f0 8.15%,
      rgba(64, 22, 131, 0.44) 68.84%,
      rgba(29, 34, 45, 0) 89.63%);
}

.bg-color-hard-box {
  border-radius: 31px;
  border: 1px solid #fff;
  background: #590ebb;
}

.btn-bg-hard {
  background: linear-gradient(104deg,
      #590ebb 6.68%,
      rgba(0, 0, 0, 0.74) 92.15%);
}

.text-color-veryhard {
  color: #590ebb;
}

.sound-color-veryhard {
  color: #fff;
}

.background-color-veryhard {
  background: linear-gradient(90deg,
      rgba(238, 78, 9, 1) 0%,
      rgba(121, 46, 9, 1) 30%,
      rgba(0, 0, 0, 1) 100%);
}

.bg-color-veryhard-box {
  border-radius: 31px;
  border: 1px solid #fff;
  background: #e36409;
}

.background-color-veryhard {
  background: linear-gradient(90deg,
      rgba(238, 78, 9, 1) 0%,
      rgba(121, 46, 9, 1) 30%,
      rgba(0, 0, 0, 1) 100%);
}

.bg-color-veryhard-box {
  border-radius: 31px;
  border: 1px solid #fff;
  background: #ff6f00;
}

.btn-bg-veryHard {
  background: linear-gradient(104deg,
      #f06907 8.15%,
      rgba(169, 57, 21, 0.53) 68.84%,
      rgba(60, 23, 8, 0.68) 89.63%);
}

.text-color-hardest {
  color: #ffffff;
}

.sound-color-hardest {
  color: #c4cfd1;
}

.background-color-hardest {
  background: linear-gradient(90deg,
      rgba(238, 9, 9, 1) 0%,
      rgba(121, 9, 9, 1) 30%,
      rgba(0, 0, 0, 1) 100%);
}

.bg-color-hardest-box {
  border-radius: 31px;
  border: 1px solid #fff;
  background: #cb0809;
}

.btn-bg-hardest {
  background: linear-gradient(104deg,
      #f00707 8.15%,
      rgba(96, 22, 22, 0.83) 68.6%,
      rgba(29, 34, 45, 0.94) 89.63%);
}
</style>
