<template>
  <n-space vertical :size="12">
    <n-space>
    </n-space>
    <n-space>
      <n-button type='primary' @click="insertPatientInformation">插入病人信息</n-button>
      <n-button type='success' @click="searchPatients">查询病人信息</n-button>
      <n-button type='error' @click="clearFilters">Clear Filters</n-button>
      <n-button type='warning' @click="clearSorter">Clear Sorter</n-button>
    </n-space>
    <n-data-table :columns='columns' :data='dataArr' :pagination='paginationReactive' />
  </n-space>

  <input type="file" ref="fileInput" style="display: none" @change="uploadFile">

  <!-- <n-model v-model:show="showModel"> -->
    <!-- 123 -->
  <!-- </n-model> -->
</template>


<script setup>
import { h, ref, onMounted, reactive } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { lStorage } from '@/utils'

const router = useRouter()
const paginationReactive = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 15],
  onChange: (page) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  }
});

onMounted(() => {
  axios.get('http://localhost:8009/getall')
    .then(({ data }) => {
      dataArr.value = data
      console.log(dataArr.value)
    })
    .catch(error => {
      console.error(error)
    })
})

const did = lStorage.get('loginInfo')
console.log(did)
const insertPatientInformation = async () => {
  await axios.get(`http://localhost:8009/insert?did=${did}`)
}

const createColumns = ({
  play, playtwo
}) => {
  return [
    { title: '患者id', key: 'id' },
    { title: '姓名', key: 'name' },
    { title: '性别', key: 'sex' },
    { title: '年龄', key: 'age' },
    { title: '上传时间', key: 'upload_time' },
    { title: '医疗码', key: 'code' },
    {
      title: '上传医疗影相',
      key: 'upload',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => play(row)
          },
          { default: () => 'upload' }
        )
      }
    },
    {
      title: '查看医疗影相',
      key: 'upload',
      render(row) {
        return h(
          NButton,
          {
            disabled: row.id === 1, // todo 默认是不可点击的 数据库中有预测好的文件时可点击
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => playtwo(row)
          },
          { default: () => 'looklook' }
        )
      }
    },
  ]
}

// 模态框
let showModel = ref(false)


const fileInput = ref(null)
let dataArr = ref([])
let res = ref([])
let onedata = ref([])
const message = useMessage()
const columns = createColumns({
  async play(row) {
    fileInput.value.click()
  },
  async playtwo(row) {
    console.log(row)
    showModel.value = !showModel.value


    // let response = await axios.get(`http://localhost:8009/findFile?code=${row.code}`)
    // res.value = response
    // console.log(res.value.data.code)
    // if (res.value.data.code !== 0) {
    //   // todo gai cheng tan chuang
    //   // 如果返回的状态码不等于0则跳转路由
    //   await router.push('/upload')
    // }
  }
})
// 上传文件点击事件触发后执行
const uploadFile = async (event) => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('myFile', file)
  try {
    $message.loading('上传中...')
    const response = await axios.post('http://localhost:8009/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response.data)
    $message.success('上传成功')
  } catch (error) {
    console.error(error)
    $message.error('上传失败')
  }
}
const queryFile = async (code) => {
  let response = await axios.get(`http://localhost:8009/findFile?code=${code}`)
  res.value = response
  console.log(res.value.data.code)
}

</script>
