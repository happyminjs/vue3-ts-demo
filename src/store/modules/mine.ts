import { CATEGORY_TYPES, IHomeState } from "@/typings/home";
import { Module } from "vuex";
import { IGlobalState } from '../index'

// 首页里应该存的数据
const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true, // 是否有更多
    loading: false, // 默认没有加载中
    offset: 0,
    limit: 5, // 当前已经显示到页面的课程有哪些
    list: [], 
  }
}

// Module 里的参数： 自己状态，  全局状态
const home:Module<IHomeState, IGlobalState> = {
  // namespace: true,
  state,
}

export default home;