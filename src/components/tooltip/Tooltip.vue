<template>
  <div>
    <span ref="tooltipRef" v-bind="attrs" :class="tooltipClass" tabindex="0" :aria-describedby="tooltipId">
      <slot name="tooltipView" />
    </span>
    <div :id="tooltipId" class="tooltip" role="tooltip">
      <slot name="tooltipContent" />
    </div>
  </div>
</template>

<script>
// 추가 옵션 선언
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script setup>
import { onMounted, ref } from 'vue';
import { useSlots, useAttrs } from 'vue'

const tooltipRef = ref(null);
const attrs = useAttrs();

const props = defineProps({
  tooltipClass: {
    type: String
  },
  tooltipId: {
    type: String,
  },
  direction: {
    type: String,
    default: 'bottom'
  }
})

const positionTooltip = (trigger, tooltip) => {
  const rect = trigger.getBoundingClientRect();
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  tooltip.style.display = 'block';

  const tooltipRect = tooltip.getBoundingClientRect();
  tooltip.style.top = props.direction === 'top' ? (rect.top + scrollTop - tooltipRect.height - 3) + "px" : (rect.bottom + scrollTop + 3) + "px";
  tooltip.style.left = (rect.left + scrollLeft) + "px";
}

const hideTooltip = (tooltip) => {
  tooltip.style.removeProperty('display')
}


onMounted(() => {
  const trigger = tooltipRef.value;
  const tooltipId = trigger.getAttribute('aria-describedby');
  const tooltip = document.getElementById(tooltipId);

  trigger.addEventListener('mouseenter', () => positionTooltip(trigger, tooltip));
  trigger.addEventListener('focus', () => positionTooltip(trigger, tooltip));
  trigger.addEventListener('mouseleave', () => hideTooltip(tooltip));
  trigger.addEventListener('blur', () => hideTooltip(tooltip));

  // 툴팁 ESC 키로 닫기 (접근성 강화)
  trigger.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      hideTooltip(tooltip);
    }
  });

  window.addEventListener('resize', () => {
    if(trigger === document.activeElement){
      positionTooltip(trigger, tooltip)
    }
  });
})

</script>

<style lang="scss" scoped>

</style>