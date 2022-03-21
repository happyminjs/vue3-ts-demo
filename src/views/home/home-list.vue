<template>
  <div class="home-list">
    <van-card v-for="ll in lessonList" :key="ll.id" :price="ll.price" :title="ll.title" :thumb="ll.poster">
      <template #tags>
        <van-tag plain type="danger">{{formateCategory(ll.category)}}</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script lang="ts">
import { ILessons } from '@/typings/home'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    lessonList: {
      type: Array as PropType<ILessons[]>
    }
  },
  setup(props, context){
    function formateCategory(type: number){
      switch (type){
        case 1:
          return 'react课程';
        case 2: return 'vue课程';
        case 3: return 'node课程'
      }
    }
    return {
      formateCategory
    }
  }
})
</script>