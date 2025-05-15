<template>
  <div class="counter-wrapper" role="group" :aria-labelledby="labelId">
    <!-- 타이틀 -->
    <span :id="labelId" class="mr-3">{{ counterTitle }}</span>

    <!-- 감소 버튼 -->
    <slot name="decreaseBtn" :onClick="onDecreaseClick">
      <button
        type="button"
        aria-label="값을 줄이기"
        :aria-controls="counterId"
        id="decreaseBtn"
        @click="onDecreaseClick"
      >
        -
      </button>
    </slot>

    <!-- 숨겨진 접근성용 레이블 (aria-labelledby 연결용) -->
    <span :id="counterDescId" class="offscreen">{{ counterLabel }}</span>

    <!-- 값 표시 및 키보드 조작 가능한 스핀 버튼 -->
    <slot name="counterInput" :onKeyDown="onKeyDown">
      <div
        tabindex="0"
        role="spinbutton"
        class="counter-input"
        :id="counterId"
        :aria-labelledby="`${labelId} ${counterDescId}`"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        @keydown="onKeyDown"
      >
        {{ modelValue }}
      </div>
    </slot>

    <!-- 라이브 리전 (스크린 리더 실시간 읽기용) -->
    <div
      id="liveRegion"
      class="offscreen"
      aria-live="assertive"
      aria-atomic="true"
    >
      {{ modelValue }}명
    </div>

    <!-- 증가 버튼 -->
    <slot name="increaseBtn" :onClick="onIncreaseClick">
      <button
        type="button"
        aria-label="값을 늘리기"
        :aria-controls="counterId"
        id="increaseBtn"
        @click="onIncreaseClick"
      >
        +
      </button>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  counterTitle: String,
  counterLabel: String,
  counterId: String,
  modelValue: Number,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 9
  }
})

const emit = defineEmits(['decrease', 'increase']);

const labelId = computed(() => `${props.counterId}-title`)
const counterDescId = computed(() => `${props.counterId}-desc`)

const onDecreaseClick = () => {
  if (props.modelValue > props.min) {
    emit('decrease')
  }
}

const onIncreaseClick = () => {
  if(props.modelValue < props.max){
    emit('increase');
  }
}

const onKeyDown = (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'PageUp':
      onIncreaseClick()
      event.preventDefault()
      break
    case 'ArrowDown':
    case 'PageDown':
      onDecreaseClick()
      event.preventDefault()
      break
    case 'Home':
      while (props.modelValue > props.min) onDecreaseClick()
      event.preventDefault()
      break
    case 'End':
      while (props.modelValue < props.max) onIncreaseClick()
      event.preventDefault()
      break
  }
}
</script>


<style lang="scss" scoped>

</style>