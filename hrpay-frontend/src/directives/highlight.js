// directives/highlight.js
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css'

export default {
  mounted(el) {
    el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block)
    })
  },
  updated(el) {
    el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block)
    })
  }
}
