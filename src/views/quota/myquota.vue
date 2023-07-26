<template>
  <div f-c-c>
    <n-card title='我的额度' bordered mx-10 my-10 rounded-10>
      <n-data-table :columns='columns' :data='data.value' :pagination='pagination' :bordered='false' />
    </n-card>
  </div>
</template>

<script setup>
import { h, onMounted, reactive, ref } from 'vue'
import { NButton, useMessage, NProgress, NInputNumber } from 'naive-ui'
import { router } from '@/router'
import axios from 'axios'
import api from '@/views/api/index'
import { useStore } from '@/store/modules/store'

const { fetchData } = api
const store = useStore()
const username = localStorage.getItem('username')
// 创建一个数组，表示表格的列定义 createColumns
const inputValue = ref('')
const createColumns = ({
                         play,
                         goToReview
                       }) => {
  return [
    {
      title: '工作日期',
      key: 'type'
    },
    {
      title: '今日的分割量',
      key: 'title',
      render(row) {
        return h(
          NProgress,
          {
            type: 'line',
            percentage: row.callVolumes,
            showText: true
          }
        )
      }
    },
    {
      title: '今日分割次数',
      key: 'callNumbers'
    },
    {
      title: '每日分割额度(次/天)',
      key: 'DailyCallLimit'
    },
    {
      title: '申请增加分割次数',
      key: 'AddCallNumbers',
      render(row) {
        return [
          // 返回一个数字输入框组件，并绑定它的值到num变量
          h(
            NInputNumber,
            {
              size: 'medium',
              clearable: true,
              // value: ,
              modelValue: inputValue,
              placeholder: '',
              onChange: (value) => {
                inputValue.value = value
              },
              style: {
                width: '120px',
                float: 'left',
                padding: '0 20px 10px 0'
              }
            }
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => {
                play(row, inputValue.value)
              }
            },
            { default: () => '申请' }
          )
        ]
      }
    },
    {
      title: '活动',
      key: '活动',
      render() {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => goToReview()
          },
          { default: () => '去阅片' }
        )
      }
    }
  ]
}


const message = useMessage()

let columns = ref(createColumns({
  play(row, inputValue) {
        if (inputValue <= 0 || inputValue == null || inputValue.toString().includes('.')) {
          message.warning('申请失败，请输入正确的数字')
          return
        }
        message.success(`申请成功，你申请了${inputValue}次`)
        getData()
  },
  goToReview() {
    router.push('/review')
  }
}))
let pagination = false

let data = reactive([])

const getData = async () => {
  try {
    let response = await fetchData(username)
    data.value = response.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
})
</script>