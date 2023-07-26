<template>
  <n-space vertical :size='12' my-14 mx-10 rounded-10>
    <n-space>
      <template #suffix>
        <n-icon :component='FlashOutline' />
      </template>
    </n-space>
    <n-data-table :columns='columns' :data='dataArr' :pagination='paginationReactive' />
  </n-space>

</template>


<script setup>
import { h, onMounted, reactive, ref } from 'vue'
import { NButton, useMessage, useDialog, NCheckbox, NEllipsis, NGradientText } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/modules/store'
import { FlashOutline } from '@vicons/ionicons5'
import _ from 'lodash'
import api from '@/views/api/index'

const { addQuota, quotaApplyRemove, quotaApplyInquery } = api
const dialog = useDialog()
const store = useStore()
const username = localStorage.getItem('username')
const router = useRouter()
const message = useMessage()
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [5, 10],
  onChange: (page) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  }
})

const getQuotaApplyInquery = async () => {
  quotaApplyInquery().then(({ data }) => {
    console.log(data)
    dataArr.value = data.data
  })
}

onMounted(() => {
  getQuotaApplyInquery()
})

const createColumns = ({}) => {
  return [
    { title: '医生', key: 'username' },
    { title: '当前数量', key: 'quota' },
    { title: '申请数量', key: 'amount' },
    { title: '申请时间', key: 'created_at' },
    {
      title: '是否同意',
      key: 'is_accept',
      render(row) {
        return [
          h(NButton, {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: async () => {
              const addQuotaParma = {
                username: row.username,
                amount: Number(row.amount)
              }
              await addQuota(addQuotaParma).then(({ data }) => {
                console.log(data)
              })
              await quotaApplyRemove({
                id: Number(row.id)
              }).then(({ data }) => {
                getQuotaApplyInquery()
                $message.success("申请通过")
                console.log(data)
              })
            },
            style: {
              backgroundColor: '#4CAF50',
              color: 'white',
              marginRight: '7rem'
            }
          }, '同意'),
          h(NButton, {
            strong: true,
            tertiary: true,
            size: 'small',
            style: {
              marginTop: '2rem',
              marginLeft: 'auto'
            },
            onClick: async () => {
              await quotaApplyRemove({
                id: Number(row.id)
              }).then(({ data }) => {
                getQuotaApplyInquery()
                $message.success("申请拒绝")
                console.log(data)
              })
            }
          }, '拒绝')
        ]
      }
    }
  ]
}

let dataArr = ref([])


const columns = createColumns({
  async selectOneOrTwo(row) {
    console.log(row)
    // dialog.info弹出退画框
    dialog.info({
      title: '选择查看类型',
      icon: () => ''
    })
  }

})

</script>
