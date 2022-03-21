
export interface ISlider {
  url: string
}
export interface ILesson {
  title: string,
  video: string,
  poster: string,
  price: number,
  category: string,
}
export interface ILessons {
  hasMore: boolean, // 是否有更多
  loading: boolean, // 默认没有加载中
  offset: number,
  limit: number, 
  list: ILesson[] // 当前已显示到页面的课程有哪些
}

export interface IHomeState {
  currentCategory: CATEGORY_TYPES,
  sliders: ISlider[],
  lessons: ILessons
}


export enum CATEGORY_TYPES {
  ALL,
  REACT,
  VUE,
  NODE
}