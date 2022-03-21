<template>
  <div class="home">
    <!-- 首页头部 start -->
    <div style="{position:fixed;top:0;z-index:1000}">{{isLoading}}</div>
    <home-header :category="category" @setCurrentCategory="setCurrentCategory"></home-header>
    <div class="home-container" ref="refreshElm">
      <!-- 轮播图 --> <!-- Suspense 异步渲染模块 -->
      <Suspense>
        <template #default>
          <home-swiper></home-swiper>
        </template>
        <template #fallback>
          <div>loading</div>
        </template>
      </Suspense>
      <!-- 课程列表 -->
      <home-list :lessonList="lessonList"></home-list>
      <div v-if="isLoading">loading...</div>
      <div v-if="(!isLoading) && (!hasMore)">没有更多了</div>
    </div>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from '@/store'
import { CATEGORY_TYPES } from '@/typings/home'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Store, useStore } from 'vuex'
import HomeHeader from './home-header.vue'
import HomeList from './home-list.vue'
import HomeSwiper from './home-swiper.vue'
import * as Types from '@/store/action-types'
import { useLoadMore } from '../../hooks/useLoadMore';
// 专门为修改分类使用的 optionsApi
function useCategory(store: Store<IGlobalState>){
  let category = computed(()=>store.state.home.currentCategory); // vuex 中的状态
  function setCurrentCategory(category: CATEGORY_TYPES){
    store.commit(`home/${Types.SET_CATEGORY}`, category)
  }
  return {
    category, // 当前分类
    setCurrentCategory, // 设置分类的方法
  }
}
function useLessonList(store: Store<IGlobalState>){
  const lessonList = computed(() => store.state.home.lessons.list);
  onMounted(() => {
    if(lessonList.value.length === 0) { // 初始化加载
      store.dispatch(`home/${Types.SET_LESSON_LIST}`)
    }
  })
  return lessonList
}
export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  mounted(){
    console.log('bbbb', this.$refs.testt)
  },
  setup(props, content){
    onMounted(()=>{
      console.log('ccccc', content)
    })
    // 1.获取 vuex 中的分类状态，有个更改状态的功能
    let store = useStore<IGlobalState>();
    let { category, setCurrentCategory } =  useCategory(store);
    let lessonList = useLessonList(store);

    // 获取真实 DOM
    const refreshElm = ref<null | HTMLElement>(null);
    console.log('aaaaa', refreshElm)
    const { isLoading, hasMore } = useLoadMore(refreshElm, store, `home/${Types.SET_LESSON_LIST}`)
    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading, hasMore
    }
    
  }
})
</script>

<style lang="scss" scoped>
.home-container{
  position: absolute;
  top: 48px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
}
</style>