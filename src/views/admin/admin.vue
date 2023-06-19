<template>
<!-- 面包屑 -->
  <div mt-10 mb-4 mx-30>
    <n-breadcrumb separator=">">
      <n-breadcrumb-item @click="hidePatient"><img src="@/assets/svg/doctor.svg" alt="doctor" h-20 w-20 style="position: absolute; bottom: 4px"><span ml-20>医生</span></n-breadcrumb-item>
      <n-breadcrumb-item v-if="whetherToShowThePatient"><img src="@/assets/svg/patient.svg" alt="patient" h-20 w-20 style="position: absolute; bottom: 4px"><span ml-20>病人</span></n-breadcrumb-item>
    </n-breadcrumb>
  </div>

<!-- 医生界面 -->
  <div v-show='whetherToShowTheDoctor'>
    <n-space vertical :size="12" mb-14 mx-10>


      <n-space mx-20>
        <n-input  placeholder="搜索" v-model:value='search' passively-activated @keyup.enter='handleSearchKeyUpEnter' clearable>
          <template #suffix>
            <n-icon :component="FlashOutline" />
          </template>
        </n-input>

        <n-button type='success' @click="searchPatients">查询医生信息</n-button>
      </n-space>
      <n-data-table :columns='columns' :data='dataArr' :pagination='paginationReactive'/>
    </n-space>
  </div>
<!-- 病人界面 -->
  <div v-if="whetherToShowThePatient">
    <patient></patient>
  </div>
</template>


<script setup>
import { h, handleError, onMounted, onUpdated, reactive, ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import axios from 'axios'
import { useRouter } from 'vue-router'
import PatientForm from '@/components/button/PatientForm.vue'
import { useStore } from '@/store/modules/store'
import { FlashOutline } from "@vicons/ionicons5";
import _ from 'lodash'
import patient from "@/views/admin/patient.vue";

const store = useStore()

const search = ref('')

const handleSearchKeyUpEnter = () => {
  searchPatients()
}

const searchPatients = () => {
  getAll(search.value)
}

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
  },
  // onUpdated:(page)=>{
  //   console.log(page)
  //   onchange(page)
  // }
});

const getAll = async (isFilter)=>{
  if (typeof isFilter === 'undefined') {
    axios.get(`http://localhost:8009/admingetalldoctor`)
      .then( ({data}) => {
        dataArr.value = data
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    axios.get(`http://localhost:8009/admingetalldoctor`)
      .then( ({data}) => {
        dataArr.value = data
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
                         looklook
                       }) => {
  return [
    { title: '医生id', key: 'id' },
    { title: '用户名', key: 'username' },
    {title: '姓名', key: 'name'},
    {title: '手机号', key: 'telephone'},
    {title: '注册时间', key: 'registerTime'},
    {
      title: '查看病人信息',
      key: 'looklook',
      render(row) {
        return h(
          NButton,
          {
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
const message = useMessage()

const columns = createColumns({
  async looklook(row) {
    store.setUserName(row.username)
    showPatient()
  }
})

// 是否显示病人列表
let whetherToShowThePatient = ref(false)
// 是否显示医生列表
let whetherToShowTheDoctor = ref(true)

// 点击面包屑隐藏病人列表, 显示医生列表
const hidePatient = () => {
  whetherToShowThePatient.value = false
  whetherToShowTheDoctor.value = true
}

// 点击医生查看医生的病人列表
const showPatient = () => {
  whetherToShowThePatient.value = true
  whetherToShowTheDoctor.value = false
}

</script>
