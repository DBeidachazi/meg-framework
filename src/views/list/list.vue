<template>
  <n-space vertical :size="12" my-14 mx-10>
    <n-space mx-20>
      <n-button type='primary' @click="insertPatientInformation">新增病人信息</n-button>
      <n-input  placeholder="搜索" v-model:value='search' passively-activated @keyup.enter='handleSearchKeyUpEnter' clearable>
        <template #suffix>
          <n-icon :component="FlashOutline" />
        </template>
      </n-input>

<!--      <n-button type='success' @click="searchPatients">查询病人信息</n-button>-->
<!--      <n-button type='error' @click="clearFilters">Clear Filters</n-button>-->
<!--      <n-button type='warning' @click="clearSorter">Clear Sorter</n-button>-->
    </n-space>
    <n-data-table :columns='columns' :data='dataArr' :pagination='paginationReactive'/>
  </n-space>

  <input type="file" ref="fileInput" style="display: none" @change="uploadFile">
</template>


<script setup>
import { h, onMounted, reactive, ref } from 'vue'
import { NButton, useMessage, useDialog, NCheckbox, NEllipsis, NGradientText } from 'naive-ui'
import { useRouter } from 'vue-router'
import PatientForm from '@/components/button/PatientForm.vue'
import { useStore } from '@/store/modules/store'
import { FlashOutline } from "@vicons/ionicons5";
import _ from 'lodash'
import api from '@/views/api/index'
import MdEditor from './MdEditor.vue'

const dialog = useDialog()

const { getall, sendpid, insertPatient, upload, predict } = api


const store = useStore()
const username = localStorage.getItem('username')

const search = ref('')
watch(
  search,
  _.debounce((val) => {
    searchPatients(val)
  }, 500)
)

const handleSearchKeyUpEnter = () => {
  searchPatients()
}
const searchPatients = () => {
  getAll(search.value)
}

const insertPatientInformation = () =>{
  console.log(username)
  window.$dialog.create({
    title: '插入病人信息',
    content: ()=> h(PatientForm),
    positiveText: '提交',
    onPositiveClick:async ()=>{
      let res = await insertPatient(store.getInformation())
      console.log(res)
      await getAll()
    }
  })
}

const router = useRouter()
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

const getAll = async (isFilter)=>{
  if (typeof isFilter === 'undefined') {
    getall(username).then( ({data}) => {
      // 倒序排列
      // dataArr.value = data.sort((a,b)=>b.id-a.id)
      dataArr.value = data
      // lodash 去重
      dataArr.value = _.uniqBy(dataArr.value, 'code')
      // console.log(dataArr.value)
    })
    .catch(error => {
      console.error(error)
    })
  } else {
    getall(username).then( ({data}) => {
      // dataArr.value = _.reverse(data)
      dataArr.value = data
      dataArr.value = _.uniqBy(dataArr.value, 'code')
      // console.log(dataArr.value)
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
  upload, looklook, fillin, selectOneOrTwo
}) => {
  return [
    // { title: '患者id', key: 'id' },
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
          { default: () => '上传' }
        )
      }
    },
    {
      title: '查看医疗影相',
      key: 'upload',
      // render渲染函数
      // row数据
      render(row) {
        // console.log(row.file_path)
        return h(
          NButton,
          {
            disabled: row.file_path === 'null',
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => selectOneOrTwo(row)
          },
          { default: () => '查看' }
        )
      }
    },
    {
      title: '填写诊断书',
      key: 'upload',
      render(row) {
        // console.log(row.file_path)
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => fillin(row)
          },
          { default: () => '填写' }
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

const getVNode = (row) => {
  return h(
    MdEditor, {
      code: row.code,
      name: row.name,
      sex:  row.sex,
      age:  row.age,

    }
  )
}
// 渲染函数，点击返回两个按钮
const getVNodeButton = (row) => {
  return [
      h(NButton, {
        strong: true,
        tertiary: true,
        size: 'small',
        onClick: () => looklook(row, "one"),
        style: {
          backgroundColor: '#4CAF50',
          color: 'white',
          marginRight: '10.25rem',
          marginLeft: '32rem'
        },

      }, '原始'),
      h(NButton, {
        strong: true,
        tertiary: true,
        size: 'small',
        style: {
          marginTop: "2rem",
          marginLeft: 'auto'
        },
      onClick: () => looklook(row, "two")
      }, '对比'),
    ]
}
// 添加一个model确认的复选框,添加一个确认模型，上传文件的按钮CheckModelButton
const CheckModelButton = (row) => {
  return [
    // createElementBlock('p', null, '当前的分割模型为nnunet模型'),
    h(NGradientText,
      {
        type: 'success',
      }, "当前的分割模型为nnunet模型"
    ),
    h(NButton, {
      strong: true,
      tertiary: true,
      size: 'small',
      onClick: () => dialog.destroyAll(),
      style: {
        backgroundColor: '#4CAF50',
        color: 'white',
        marginRight: '10.25rem',
        marginLeft: '32rem'
      },

    }, '取消'),
    h(NButton, {
      strong: true,
      tertiary: true,
      size: 'small',
      style: {
        marginTop: "2rem",
        marginLeft: 'auto'
      },
      onClick: () => {
        dialog.destroyAll()
        dialog.info({
          title: "确认上传",
          content: CheckfileButton.bind(null, row),
        })
      }
    }, '确认'),
  ]
}
const CheckfileButton = (row) =>{
  return [
    h(NButton, {
      strong: true,
      tertiary: true,
      size: 'small',
      onClick: () => dialog.destroyAll(),
      style: {
        backgroundColor: '#4CAF50',
        color: 'white',
        marginRight: '10.25rem',
        marginLeft: '32rem'
      },

    }, '取消'),
    h(NButton, {
      strong: true,
      tertiary: true,
      size: 'small',
      style: {
        marginTop: "2rem",
        marginLeft: 'auto'
      },
          onClick: () => {
            dialog.destroyAll()
            fileInput.value.click()
            sendPid.value = row.code
          },
    }, '确认'),
  ]
}

// looklook函数是一个跳转函数
const looklook = async(row, type) => {
    console.log(row)
    let response = await sendpid({"current_pid":row.code})
    message.success('jumping')
    setTimeout(() => {
      store.setReviewType(type)
      router.push('review')
    }, 200)
    dialog.destroyAll()
  }

const columns = createColumns({

// 方法：selectOneOrTwo(row) => 选择一个或者两个；调用 dialog.info 方法弹出一个对话框；将getVNodeButton方法；绑定到content上
  async selectOneOrTwo(row) {
    console.log(row)
    // dialog.info弹出退画框
    dialog.info({
      title: "选择查看类型",
      content: getVNodeButton.bind(null, row),
      icon: () => ""
    })
  },

  async fillin(row) {
    console.log(row)
    dialog.info({
      title: "  填写诊断书",
      style: { width: "80%", height: "100%" },
      content: getVNode.bind(null, row),
      // content: (code) => getVNode(code), 
      icon: () => "✍",
      // positiveText: "提交",
      // onPositiveClick: () => {
      //   message.success(row.age)
      // }

    })
  },
// upload函数是上传医疗影像函数，我们在上传前开一个dialog,
// 通过fileInput.value.click()触发文件选择器的点击事件，弹出文件选择框。
// 将sendPid.value设置为row.code，将row对象中的code属性赋值给sendPid。
  async upload(row) {
    console.log(row)
    dialog.info({
      title: '请确认分割模型',
      style: { },
      content: CheckModelButton.bind(null, row),
    })
  },

  async looklook(row) {
    console.log(row)
    let response = await sendpid({"current_pid":row.code})
    message.success('jumping')
    setTimeout(() => {
      router.push('review')
    }, 200)
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
    console.log(sendPid.value)
    const response = await upload(sendPid.value, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response.data)
    if (response.data.code === 500) {
      $message.error('上传失败')
      return
    }
    $message.success('上传成功')
    // $message.loading('预测中,请耐心等待...')
    store.turnOnShadow('预测中,请耐心等待...')
    let { data } = await predict(sendPid.value)
    console.log(data)
    if (data.code === 500) {
      // $message.error('预测失败')
      store.turnOffAndFailed('预测失败')
      return
    }
    // $message.success('预测成功')
    store.turnOffAndSuccess('预测成功')
    await getAll()
  } catch (error) {
    console.error(error)
    $message.error(error.toString())
  }
}

// drop
// const queryFile = async (code) => {
  // res.value = await axios.get(`http://localhost:8009/findFile?code=${code}`)
  // console.log(res.value.data.code)
// }
</script>
