<template>
  <div f-c-c>
    <n-card title="我的额度" bordered mx-10 my-10 rounded-10>
      <n-data-table :columns="columns" :data="data.value" :pagination="pagination" :bordered="false"/>
    </n-card>
  </div>
</template>

<script setup>
import { h, onMounted, reactive } from 'vue'
import { NButton, useMessage, NProgress } from "naive-ui";
import { router } from '@/router'
import axios from 'axios'
import api from '@/views/api/index'
import { useStore } from '@/store/modules/store'

const { fetchData } = api
const store = useStore()
const username = localStorage.getItem('username')
const createColumns = ({
                         play, goToReview
                       }) => {
  return [
    {
      title: "工作日期",
      key: "type"
    },
    {
      title: "今日的分割量",
      key: "title",
      render(row) {
        return h(
          NProgress,
          {
            type: "line",
            percentage: row.callVolumes,
            showText: true,
          }
        )
      }
    },
    {
      title: "今日分割次数",
      key: "callNumbers"
    },
    {
      title: "每日分割额度(次/天)",
      key: "DailyCallLimit",
    },
    {
      title: "申请增加分割次数",
      key: "申请增加分割次数",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row)
          },
          { default: () => "申请" }
        );
      }
    },
    {
      title: "活动",
      key: "活动",
      render() {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => goToReview()
          },
          { default: () => "去阅片" }
        );
      }
    },
  ];
};


const message = useMessage();
let columns = createColumns({
  play(row) {
    message.success(`申请成功`);
  },
  goToReview() {
    router.push("/review")
  }
})
let pagination = false

let data = reactive([])
// console.log(data)
const getData=async ()=>{
  try {
    let response = await fetchData(username)
    console.log(response)
    data.value  = response.data
  } catch (error) {
    // 处理错误
    console.log(error)
  }
}

onMounted(()=>{
  getData()
})
</script>