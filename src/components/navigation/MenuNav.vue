<template>
  <nav role="navigation" aria-label="Main menu">
    <ul role="menubar" :class="className">
      <li
        role="none"
        v-for="(menu, index) in menus"
        :key="menu.label"
        @mouseover="showMenu(index)"
        @mouseleave="hideMenu($event)"
      >
        <button
          class="md:px-4 lg:px-8 px-6 py-4"
          ref="buttonRefs"
          role="menuitem"
          :aria-haspopup="menu.items?.length ? true : null"
          :aria-expanded="menu.items?.length ? isExpanded(index) : null"
          :id="`menu-${index}`"
          :aria-controls="menu.items?.length ? `submenu-${index}` : null"
          @keydown="handleMainKeydown($event, index)"
        >
          {{ menu.label }}
        </button>
        <!-- 서브 메뉴 -->
        <ul
          ref="submenuRef"
          v-if="menu.items?.length && isExpanded(index)"
          role="menu"
          :id="`submenu-${index}`"
          :class="`sub-${direction}`"
          :aria-labelledby="`menu-${index}`"
        >
          <li v-for="(item, subIndex) in menu.items" role="none" :key="item.label">
            <a
              ref="submenuItems"
              role="menuitem"
              :href="item.url"
              @keydown="handleSubKeydown($event, index, subIndex)"
            >
                {{ item.label }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';


const props = defineProps({
  menus: Object,
  direction: {
    type: String,
    default: 'horizontal'
  },
  className: String,
})

const openIndex = ref(null);
const buttonRefs = ref([]);
const submenuRef = ref([])
const isHorizontal = props.direction === 'horizontal'
const forwardKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'
const backwardKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'

const showMenu = (index) => {
  openIndex.value = index;
}

const closeAllMenus = () => {
  openIndex.value = null;
}

const isExpanded = computed(() => {
  return (index) => {
    return openIndex.value === index;
  }
})

const hideMenu = (e) => {
  if(!e.currentTarget.contains(e.relatedTarget)){
    closeAllMenus();
  }
}

const handleMainKeydown = async (e, index) => {
  const currentButton = buttonRefs.value[index]

  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      showMenu(index);
      await nextTick();
      submenuRef.value[0]?.querySelector('a')?.focus();
      break;
    case 'ArrowRight':
      e.preventDefault();
      const nextItem = buttonRefs.value[index + 1] || buttonRefs.value[0];
      nextItem?.focus();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      const prevItem = buttonRefs.value[index - 1] || buttonRefs.value[buttonRefs.value.length -1];
      prevItem?.focus();
      break;
    case 'ArrowDown':
      e.preventDefault();
      showMenu(index);
      await nextTick();
      submenuRef.value[0]?.querySelector('a')?.focus();
      break;
    case 'Escape':
      closeAllMenus();
      currentButton.focus();
      break;
  }
}

const handleSubKeydown = (e, menuIndex, subIndex) => {
  const key = e.key
  const items = submenuRef.value[0]?.querySelectorAll('a')

  switch (key) {
    case forwardKey:
      e.preventDefault()
      const next = items[subIndex + 1] || items[0]
      next?.focus()
      break;
    case backwardKey:
      e.preventDefault()
      const prev = items[subIndex - 1] || items[items.length - 1]
      prev?.focus()
      break;
    case 'Escape':
      e.preventDefault()
      closeAllMenus()
      buttonRefs.value[menuIndex]?.focus()
      break;
    case 'Tab':
      if (subIndex === items.length - 1 && !e.shiftKey) {
        e.preventDefault()
        closeAllMenus()
        const nextBtn = buttonRefs.value[menuIndex + 1]
        nextBtn?.focus()
      }
      if (subIndex === 0 && e.shiftKey) {
        e.preventDefault()
        closeAllMenus()
        const currentButton = buttonRefs.value[menuIndex]
        currentButton?.focus()
      }
      break
  }
}
</script>

<style lang="scss" scoped>

</style>