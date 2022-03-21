#### vue2 与 vue3 的对比
* 2 使用的flow进行编写， 3.0全部采用ts
* 体积优化，移除部分api，支持 tree-shaking
* 数据劫持优化，采用proxy，性能大大提升
* 编译优化，使用了静态模板分享，重新 diff 算法
* CompositionAPI：整合业务代码逻辑，提取公共逻辑； 2中使用的mixin --- 有命名冲突，数据来源不清等问题
* 自定义渲染器。改写vue底层渲染逻辑
* 新增Fragment，Teleport，Suspense组件

vue3 template 可以有多个根标签
