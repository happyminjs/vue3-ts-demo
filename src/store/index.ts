import { createStore } from 'vuex'
import home from './modules/home';
import { CATEGORY_TYPES, IHomeState } from '@/typings/home';

export interface IGlobalState {
  home: IHomeState, // 某个页面，某个模块可以在这里增加
}

const store = createStore<IGlobalState>({
  // state: {
  //   home: {
  //     currentCategory: CATEGORY_TYPES.ALL,
  //     sliders: [],
  //     lessons: {}
  //   }
  // },
  mutations: {
    // aa(a: IHomeState) {
    //   a.currentCategory
    // }
  },
  actions: {
  },
  modules: {
    home
  }
})
// store.state.home.lessons
export default store