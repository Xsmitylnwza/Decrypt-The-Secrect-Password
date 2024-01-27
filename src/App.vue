<script setup>
// mockup data
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
</script>

<template>
  <div
    class="flex w-full min-h-screen items-center justify-center bg-rose-100 border-2 border-solid"
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
          <p class="text-xl">Rule {{ rule.ruleNumber }}</p>
        </div>
        <div :class="rule.correct ? 'bg-green-100' : 'bg-red-100'" class="p-4">
          <p class="text-xl">{{ rule.message }}.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
