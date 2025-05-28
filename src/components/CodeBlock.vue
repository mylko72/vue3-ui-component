<template>
  <pre><code ref="codeRef"></code></pre>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('vue', xml)

const props = defineProps({
  code: { type: String, required: true },
  lang: { type: String, default: 'javascript' }
})

const codeRef = ref(null)

const applyHighlight = () => {
  if (codeRef.value) {
    codeRef.value.className = `language-${props.lang}`
    codeRef.value.textContent = props.code // ✅ HTML escape 없이 넣기
    hljs.highlightElement(codeRef.value)   // ✅ 직접 하이라이트 실행
  }
}

onMounted(applyHighlight)
watch(() => props.code, applyHighlight)
</script>

<style scoped>
  pre {
    display: grid;
    font-size: 14px;
  }

  pre code.hljs {
    width: 100%;
  }
</style>
