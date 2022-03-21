import { IGlobalState } from "@/store";
import { Ref, onMounted, computed } from 'vue';
import { Store } from "vuex";
import _ from 'lodash'

export function useLoadMore(refreshElm:Ref<null|HTMLElement>, store:Store<IGlobalState>, type:string ){
  // 防抖
  let element:HTMLElement;
  function _loadMore(){
    // 获取可视区域高度  卷曲的高度， 文档高度
    let containerHeight = element.clientHeight;
    let scrollTop = element.scrollTop;
    let scrollHeight = element.scrollHeight;
    if(containerHeight + scrollTop + 20 >= scrollHeight) {
      store.dispatch(type)
    }
  }
  onMounted(()=>{
    element = refreshElm.value as HTMLElement;
    element.addEventListener('scroll', _.debounce(_loadMore, 200))
  })

  const isLoading = computed(() =>{
    return store.state.home.lessons.loading
  })
  const hasMore = computed(() =>{
    return store.state.home.lessons.hasMore
  })

  return {
    isLoading,
    hasMore
  }
}