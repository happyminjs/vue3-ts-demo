<template>
  <div class="home-header">
    <img src="@/assets/logo.png" alt="">
    <!-- 以前的 v-mode 等价于input事件加 value props -->
    <van-dropdown-menu>
      <!-- <van-dropdown-item v-model="category" :options="options" @change="change"/> -->
      <van-dropdown-item modelValue="category" :options="options" @change="change"/>
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from '@/typings/home'
import { defineComponent, PropType, reactive, toRef, toRefs } from 'vue'
export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>,
      default(){
        return 0
      }
    }
  },
  emits:['setCurrentCategory'], // 非必须，只是为了写代码时有提示
  setup(props, context){
    // props.category
    let state = reactive({
      options: [
        { text: '全部课程', value: CATEGORY_TYPES.ALL },
        { text: 'REACT课程', value: CATEGORY_TYPES.REACT },
        { text: 'VUE课程', value: CATEGORY_TYPES.VUE },
        { text: 'NODE课程', value: CATEGORY_TYPES.NODE },
      ]
    });
    function change(value: CATEGORY_TYPES){
      context.emit('setCurrentCategory', value)
    }
    return {
      ...toRefs(state),
      change
    }
  }
})
</script>

<style lang="scss">
.home-header{
  z-index: 100;
  height: 48px;
  background-color: #228bd1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  img{
    height: 30px;

  }
  .van-dropdown-menu {
    margin-right: 10px;
  }
  .van-dropdown-menu__item{
    background-color: #228bd1;
  }
  .van-dropdown-menu__title{
    color: #fff;
  }
}
</style>