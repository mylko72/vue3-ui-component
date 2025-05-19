<template>
  <div class="accordion-item">
    <button
      aria-level="2"
      class="accordion-btn"
      :id="headerId"
      :aria-expanded="modelValue.toString()"
      :aria-controls="contentId"
      @click="handleClick">
        <span>{{ title }}</span>
        <AkChevronDown class="ic-arrow" :class="{ open: modelValue }" />
    </button>
    <!-- Android TalkBack 스크린리더 캐시 오류를 수정하기 위해 Dom에서 제거 -->
    <div
      v-if="visible"
      ref="content"
      class="ui-accordion-contents"
      :id="contentId"
      role="region"
      :aria-labelledby="headerId"
      @transitionend="onTransitionEnd"
    >
      <div class="inner-accordion-contents">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import { AkChevronDown } from '@kalimahapps/vue-icons';
  export default {
    name: 'AccordionItem',
    components: {
      AkChevronDown
    },
    props: {
      title: String,
      modelValue: Boolean,
      index: Number,
    },
    emits: ['toggle'],
    data() {
      return {
        transitioning: false,
        visible: this.modelValue,
        headerId: `accordion-head-${this.$.uid}`,
        contentId: `accordion-content-${this.$.uid}`,
      };
    },
    watch: {
      modelValue(newVal) {
        if (newVal) {
          this.visible = true;
          this.$nextTick(() => {
            this.open();
          });
        } else {
          this.close();
        }
      },
    },
    mounted() {
      if (this.modelValue) {
        this.visible = true;
      }
    },
    methods: {
      handleClick() {
        this.$emit('toggle', this.index);
      },
      open() {
        const el = this.$refs.content;
        this.visible = true;
        this.transitioning = true;

        requestAnimationFrame(() => {
          el.style.height = '0px';
          el.style.transition = 'height 0.3s ease';
          el.style.height = el.scrollHeight + 'px';
        });

        // this.setFocusable(true);
      },
      close() {
        const el = this.$refs.content;
        if (!el) return;
        this.transitioning = true;

        el.style.height = el.scrollHeight + 'px';

        requestAnimationFrame(() => {
          el.style.transition = 'height 0.3s ease';
          el.style.height = '0px';
        });

        // this.setFocusable(false);
      },
      onTransitionEnd() {
        const el = this.$refs.content;

        el.style.transition = '';
        el.style.height = '';
        this.transitioning = false;

        if (!this.modelValue) {
          this.visible = false; // 여기서 DOM 제거됨
        }

      },
      setFocusable(enabled) {
        const content = this.$refs.content;
        if (!content) return;

        // 포커스 가능한 요소들만 선택
        const focusables = content.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]'
        );

        focusables.forEach(el => {
          if (enabled) {
            if (el.__savedTabindex !== undefined) {
              el.setAttribute('tabindex', el.__savedTabindex);
            } else {
              el.removeAttribute('tabindex');
            }
          } else {
            const current = el.getAttribute('tabindex');
            if (current !== null) {
              el.__savedTabindex = current;
            }
            el.setAttribute('tabindex', '-1');
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>