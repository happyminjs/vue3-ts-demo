<template>
  <div class="home-swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-if="sliderList.length">
      <van-swipe-item v-for="l in sliderList" :key="l.url">
        <img :src="l.url" alt="" style="width:100%">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from '@/store'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import * as Types from '@/store/action-types'
export default defineComponent({
  async setup(){
    // 页面一加载就要获取数据
    let store = useStore<IGlobalState>();
    let sliderList = computed(()=>{
      return store.state.home.sliders
    })
    if(sliderList.value.length == 0) {  // 缓存数据，没有的时候才需要接口获取；  可和 2 中的 keep-alive 缓存组件类似
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
    }
    return {
      sliderList
    }
  }
})
</script>