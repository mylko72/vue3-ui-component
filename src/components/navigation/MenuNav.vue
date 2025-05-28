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
          ref="buttonRefs"
          role="menuitem"
          :aria-haspopup="menu.items?.length ? true : null"
          :aria-expanded="menu.items?.length ?openIndex === index : null"
          :id="`menu-${index}`"
          :aria-controls="menu.items?.length ? `submenu-${index}` : null"
          @keydown="handleMainKeydown($event, index)"
        >
          {{ menu.label }}
        </button>
        <!-- 서브 메뉴 -->
        <ul
          ref="submenuRefs"
          v-if="menu.items?.length"
          v-show="openIndex === index"
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
import { nextTick, ref } from 'vue';


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
const submenuRefs = ref([]);
const isHorizontal = props.direction === 'horizontal'
const forwardKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'
const backwardKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'

console.log('forwardKey', forwardKey);

const showMenu = (index) => {
  openIndex.value = index;
}

const closeAllMenus = () => {
  openIndex.value = null;
}

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
      submenuRefs.value[index]?.querySelector('a')?.focus();
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
      submenuRefs.value[index]?.querySelector('a')?.focus();
      break;
    case 'Escape':
      closeAllMenus();
      currentButton.focus();
      break;
  }
}

const handleSubKeydown = (e, menuIndex, subIndex) => {
  const key = e.key
  const items = submenuRefs.value[menuIndex]?.querySelectorAll('a')
  const currentItem = items[subIndex]

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