<template>
  <n-space vertical :size="12" mb-14 mx-10>


    <n-space mx-20>
      <n-input  placeholder="搜索" v-model:value='search' passively-activated @keyup.enter='handleSearchKeyUpEnter' clearable>
        <template #suffix>
          <n-icon :component="FlashOutline" />
        </template>
      </n-input>

      <n-button type='success' @click="searchPatients">查询病人信息</n-button>
    </n-space>
    <n-data-table :columns='columns' :data='dataArr' :pagination='paginationReactive'/>
  </n-space>
</template>


<script setup>
import { h, handleError, onMounted, onUpdated, reactive, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/modules/store'
import { FlashOutline } from "@vicons/ionicons5";
import _ from 'lodash'

const store = useStore()
const username = store.username


const search = ref('')

const handleSearchKeyUpEnter = () => {
  searchPatients()
}
const searchPatients = () => {
  getAll(search.value)
}

const router = useRouter()
const paginationReactive = reactive({
  page: 1,
  pageSize: 7,
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

const getAll = async (isFilter)=>{
  if (typeof isFilter === 'undefined') {
    axios.get(`http://localhost:8009/getall?did=${username}`)
      .then( ({data}) => {
        dataArr.value = data
        // lodash 去重
        dataArr.value = _.uniqBy(dataArr.value, 'code')
        // lodash 排序
        dataArr.value = _.sortBy(dataArr.value, 'id').reverse()
        console.log(dataArr.value)
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    axios.get(`http://localhost:8009/getall?did=${username}`)
      .then( ({data}) => {
        dataArr.value = data
        dataArr.value = _.uniqBy(dataArr.value, 'code')
        dataArr.value = _.sortBy(dataArr.value, 'id').reverse()
        console.log(dataArr.value)
        dataArr.value = _.filter(dataArr.value, (item) => {
          return _.some(item, (value) => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(isFilter)
            }
            if (typeof value === 'number') {
              return value.toString().includes(isFilter)
            }
          })
        })
      }) .catch(error => {
      console.error(error)
    })
  }
}

onMounted(() => {
  getAll()
})


const createColumns = ({
                         remove
                       }) => {
  return [
    { title: '患者id', key: 'id' },
    { title: '姓名', key: 'name' },
    { title: '性别', key: 'sex' },
    { title: '年龄', key: 'age' },
    { title: '上传时间', key: 'upload_time' },
    { title: '医疗码', key: 'code' },
    {
      title: '查看医疗影相',
      key: 'remove',
      render(row) {
        // console.log(row.file_path)
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => remove(row)
          },
          { default: () => 'delete' }
        )
      }
    },
  ]
}

const fileInput = ref(null)
let dataArr = ref([])
let res = ref([])
const message = useMessage()
let sendPid = ref(null)
const columns = createColumns({

  // todo row.did替换成从锤子界面拿到doctor.username
  async remove(row){
    let res = await axios.post('http://localhost:8009/remove', {"code": row.code, "username": row.did})
    console.log(res)
    message.success("删除成功")
    setTimeout(()=>{
      getAll()
    }, 500)
  }
})


</script>
