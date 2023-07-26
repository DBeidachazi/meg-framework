<template>
  <n-space vertical :size="12" my-14 mx-10 rounded-10>
    <n-space>
        <template #suffix>
          <n-icon :component="FlashOutline" />
        </template>
    </n-space>
    <n-data-table :columns='columns' :data='dataArr' :pagination='paginationReactive'/>
  </n-space>

</template>


<script setup>
import { h, onMounted, reactive, ref } from 'vue'
import { NButton, useMessage, useDialog, NCheckbox, NEllipsis, NGradientText } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/modules/store'
import { FlashOutline } from "@vicons/ionicons5";
import _ from 'lodash'
import api from '@/views/api/index'

const { } = api
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
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  }
});

// const getAll = async (isFilter)=>{
//   if (typeof isFilter === 'undefined') {
//     getall(username).then( ({data}) => {
//       // 倒序排列
//       // dataArr.value = data.sort((a,b)=>b.id-a.id)
//       dataArr.value = data
//       // lodash 去重
//       dataArr.value = _.uniqBy(dataArr.value, 'code')
//       // console.log(dataArr.value)
//     })
//       .catch(error => {
//         console.error(error)
//       })
//   } else {
//     getall(username).then( ({data}) => {
//       // dataArr.value = _.reverse(data)
//       dataArr.value = data
//       dataArr.value = _.uniqBy(dataArr.value, 'code')
//       // console.log(dataArr.value)
//       dataArr.value = _.filter(dataArr.value, (item) => {
//         return _.some(item, (value) => {
//           if (typeof value === 'string') {
//             return value.toLowerCase().includes(isFilter)
//           }
//           if (typeof value === 'number') {
//             return value.toString().includes(isFilter)
//           }
//         })
//       })
//     }) .catch(error => {
//       console.error(error)
//     })
//   }
// }
//
// onMounted(() => {
//   getAll()
// })


const createColumns = ({

                       }) => {
  return [
    { title: '医生', key: 'username' },
    { title: '当前数量', key: 'current_amount' },
    { title: '申请数量', key: 'apply_amount' },
    { title: '申请时间', key: 'time' },
    {
      title: '是否同意',
      key: 'is_accept',
      render(row) {
        return  [
          h(NButton, {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => {
              console.log("accept", row)
            },
            style: {
              backgroundColor: '#4CAF50',
              color: 'white',
              marginRight: '7rem',
            },
          }, '同意'),
          h(NButton, {
            strong: true,
            tertiary: true,
            size: 'small',
            style: {
              marginTop: "2rem",
              marginLeft: 'auto'
            },
            onClick: () => {
              console.log("拒绝", row)
            }
          }, '拒绝'),
        ]
      }
    },
  ]
}

let dataArr = ref([
  {
    username: "123",
    current_amount: "122",
    apply_amount: "123",
    time: "1929.1.2",
  },
  {
    username: "1234",
    current_amount: "122",
    apply_amount: "123",
    time: "1929.1.2",
  }
])


const columns = createColumns({
  async selectOneOrTwo(row) {
    console.log(row)
    // dialog.info弹出退画框
    dialog.info({
      title: "选择查看类型",
      icon: () => ""
    })
  },

})

</script>
