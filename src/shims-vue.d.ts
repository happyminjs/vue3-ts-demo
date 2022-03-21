/* eslint-disable */
declare module '*.vue' { // 如果引用了一个 a.vue， 就是一个组件类型
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
