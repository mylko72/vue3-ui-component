<template>
  <pre><code ref="codeRef"></code></pre>
</template>

<script setup>
import { useHighlight } from '@/composables/useHighlight'
import { onMounted, ref } from 'vue'

const props = defineProps({
  code: String,
  lang: {
    type: String,
    default: 'vue'
  }
})

const codeRef = ref(null)

onMounted(() => {
  const { codeRef2 } = useHighlight(codeRef, props.code, props.lang)
  console.log('codeRef', codeRef2)
})
</script>
