<template>
  <n-space vertical :size="12">


    <n-space>
      <n-button type='primary' @click="insertPatientInformation">插入病人信息</n-button>
      <n-button type='success' @click="searchPatients">查询病人信息</n-button>
      <n-button type='error' @click="clearFilters">Clear Filters</n-button>
      <n-button type='warning' @click="clearSorter">Clear Sorter</n-button>
    </n-space>
    <n-data-table :columns='columns' :data='dataArr' :pagination='paginationReactive'/>
  </n-space>

  <input type="file" ref="fileInput" style="display: none" @change="uploadFile">
</template>


<script setup>
import { h, onMounted, reactive, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import axios from 'axios'
import { useRouter } from 'vue-router'
import PatientForm from '@/components/button/PatientForm.vue'
import { useStore } from '@/store/modules/store'

const store = useStore()
const username = localStorage.getItem('username')

const insertPatientInformation = () =>{
  console.log(username)
  window.$dialog.create({
    title: '插入病人信息',
    content: ()=> h(PatientForm),
    positiveText: '提交',
    onPositiveClick:async ()=>{
      let res = await axios.post("http://localhost:8009/insert_patient", store.getInformation())
      console.log(res.data)
      await getAll()
    }
  })
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

const getAll = async ()=>{
  axios.get(`http://localhost:8009/getall?did=${username}`)
    .then( ({data}) => {
      // 倒序排列
      dataArr.value = data.sort((a,b)=>b.id-a.id)
      // console.log(dataArr.value)
    })
    .catch(error => {
      console.error(error)
    })
}

onMounted(() => {
  getAll()
})


const createColumns = ({
  upload, looklook
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
            onClick: () => upload(row)
          },
          { default: () => 'upload' }
        )
      }
    },
    {
      title: '查看医疗影相',
      key: 'upload',
      render(row) {
        // console.log(row.file_path)
        return h(
          NButton,
          {
            disabled: row.file_path === null,
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => looklook(row)
          },
          { default: () => 'looklook' }
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

  async upload(row) {
    fileInput.value.click()
    sendPid.value = row.code
  },

  async looklook(row) {
    console.log(row)
    let response = await axios.post(`http://localhost:8009/sendpid`, {"current_pid":row.code})
    if (response.data.data.code === 500) {
      message.error('queue is full')
    } else {
      message.success('jumping')
      setTimeout(() => {
        router.push('review')
      }, 1000)
    }
  }
})

// 上传文件点击事件触发后执行
const uploadFile = async (event) => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('myFile', file)
  try {
    $message.loading('上传中...')
    // todo get row
    const response = await axios.post(`http://localhost:8009/upload?code=${sendPid.value}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response.data)
    if (response.data.data.code === 500) {
      $message.error('上传失败')
      return
    }
    $message.success('上传成功')
    $message.loading('预测中,请耐心等待...')
    const predict = await axios.get(`http://localhost:8009/predict?code=${sendPid.value}`)
    console.log(predict.data)
    if (predict.data.data.code === 500) {
      $message.error('预测失败')
      return
    }
    $message.success('预测成功')
    await getAll()
  } catch (error) {
    console.error(error)
    $message.error('上传失败')
  }
}

const queryFile = async (code) => {
  res.value = await axios.get(`http://localhost:8009/findFile?code=${code}`)
  console.log(res.value.data.code)
}
</script>
