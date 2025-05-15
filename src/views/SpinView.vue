<template>
  <section aria-labelledby="title2">
    <div class="border-b pb-4">
      <h2 id="title2" class="text-5xl font-medium" tabindex="0">Spin Button</h2>
    </div>
    <div class="my-6">
      <p class="py-2">소량의 상품의 수량을 조정하기에 가장 쉽고 편리한 스핀 버튼은 쇼핑몰에서 흔하게 사용한다. </p>
      <p class="py-2">스핀 버튼을 사용하는데 제대로 구현하지 않으면 스크린리더 사용자는 현재 상태를 알 수 없어 사용하기가 아주 어렵게 된다.</p>
    </div>
    <div class="comp-view">
      <h3 class="text-xl">탑승자수 선택</h3>
      <div class="my-6">
        <SpinCounter
          :counter-title="counterTitle"
          :counter-label="counterLabel"
          :counter-id="counterId"
          :model-value="counterValue.now"
          :min="counterValue.min"
          :max="counterValue.max"
          @decrease="handleDecrease"
          @increase="handleIncrease"
        >
          <template #decreaseBtn="{ onClick }">
            <button
              type="button"
              aria-label="성인 탑승자 한 명 줄이기"
              :aria-controls="counterId"
              id="decreaseBtn"
              @click="onClick"
            >
              <SuButtonMinus class="text-3xl" />
            </button>
          </template>
          <template #counterInput="{ onKeyDown }">
            <div
              tabindex="0"
              role="spinbutton"
              class="w-12 px-1 py-1 border border-slate-900 rounded-lg text-center"
              :id="counterId"
              :aria-labelledby="`${labelId} ${counterDescId}`"
              :aria-valuemin="counterValue.min"
              :aria-valuemax="counterValue.max"
              :aria-valuenow="counterValue.now"
              @keydown="onKeyDown"
            >
              {{ counterValue.now }}
            </div>
          </template>
          <template #increaseBtn="{ onClick }">
            <button
              type="button"
              aria-label="성인 탑승자 한 명 늘리기"
              :aria-controls="counterId"
              id="increaseBtn"
              @click="onClick"
            >
              <SuButtonAdd class="text-3xl" />
            </button>
          </template>
        </SpinCounter>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import SpinCounter from '@/components/spinbutton/SpinCounter.vue';
import { SuButtonAdd } from '@kalimahapps/vue-icons';
import { SuButtonMinus } from '@kalimahapps/vue-icons';

const counterTitle = ref('성인');
const counterLabel = ref('성인 탑승자 수')
const counterId = ref('adultCount')
const count = ref(1);
const counterValue = ref({
  min: 0,
  max: 9,
  now: computed(() => {
    return count.value
  })
})
const labelId = computed(() => `${counterId.value}-title`)
const counterDescId = computed(() => `${counterId.value}-desc`)

const handleDecrease = () => {
  console.log('decrease...')
  count.value--;
}

const handleIncrease = () => {
  console.log('increase...')
  count.value++;
}


</script>

<style lang="scss" scoped>

</style>