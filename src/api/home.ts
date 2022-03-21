import { ISlider, CATEGORY_TYPES } from '@/typings/home';
import axios from "./index";

// 获取轮播图的api
export function getSliders<T>() {
  return axios.get<T, T>('/slider/list')
}

export function getLesson<T>(category: CATEGORY_TYPES, offset:number=0, limit:number=5){
  return axios.get<T,T>(`/lesson/list?category=${category}&offset=${offset}&limit=${limit}`)
}