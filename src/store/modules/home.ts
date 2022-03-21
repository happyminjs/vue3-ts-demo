import { CATEGORY_TYPES, IHomeState, ILesson, ILessons, ISlider } from "@/typings/home";
import { Module } from "vuex";
import { IGlobalState } from '../index'
import * as Types from '../action-types'
import { getSliders, getLesson } from '../../api/home';

// 首页里应该存的数据
const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true, // 是否有更多
    loading: false, // 默认没有加载中
    offset: 0, // 默认展示开始
    limit: 5, // 当前已经显示到页面的课程有哪些
    list: [], 
  },
}

// Module 里的参数： <自己状态，全局状态>
const home:Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_CATEGORY](state, payload:CATEGORY_TYPES){
      state.currentCategory = payload
    },
    [Types.SET_SLIDER_LIST](state, payload:ISlider[]){
      state.sliders = payload
    },
    [Types.SET_LOADING](state, payload:boolean){
      state.lessons.loading = payload;
    },
    [Types.SET_LESSON_LIST](state, payload: ILessons) {
      state.lessons.list = [...state.lessons.list, ...payload.list]
      state.lessons.hasMore = payload.hasMore;
      state.lessons.offset += payload.offset;
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({commit}){
      let slides = await getSliders<ISlider>();
      commit(Types.SET_SLIDER_LIST, slides)
    },
    async [Types.SET_LESSON_LIST]({commit}){
      if(state.lessons.loading) {
        return;
      }
      if(!state.lessons.hasMore){
        return;
      }
      commit(Types.SET_LOADING, true); // 开始加载数据
      let lessons = await getLesson<ILessons>(state.currentCategory, state.lessons.offset, state.lessons.limit);
      commit(Types.SET_LESSON_LIST, lessons);
      commit(Types.SET_LOADING, false)
    }
  }
}

export default home;