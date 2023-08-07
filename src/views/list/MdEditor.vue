<template>
  <CommonPage>
    <div h-60 flex items-center bg-white pl-20 pr-20 >
<!--      <div h-60 flex items-center bg-white pl-20 pr-20 dark:bg-dark>-->
      <input
        v-model="post.title"
        class="mr-20 flex-1 pb-15 pt-15 text-20 font-bold color-primary"
        type="text"
        style='pointer-events: none'
      />
      <n-button type="primary" style="width: 80px" :loading="btnLoading" @click="handleSavePost">
        <TheIcon v-if="!btnLoading" icon="line-md:confirm-circle" class="mr-5" :size="18" /> 保存
      </n-button>
    </div>
    <MdEditor v-model="post.content" style="height: calc(100vh - 305px)" dark:bg-dark :toolbars='toolbars' :on-save='onSave'>
<!--      <template #defToolbars>-->
<!--        <NormalToolbar-->
<!--          title='语音朗读'-->
<!--          @onClick='onSave'-->
<!--        >-->
<!--          <svg class="md-editor-icon" aria-hidden="true">-->
<!--            <use xlink:href="#icon-mark"></use>-->
<!--          </svg>-->
<!--          <img :src='DoctorSvg' alt=''>-->
<!--        </NormalToolbar>-->
<!--      </template>-->
    </MdEditor>
  </CommonPage>
</template>

<script setup>
import MdEditor from 'md-editor-v3'
const NormalToolbar = MdEditor.NormalToolbar
import 'md-editor-v3/lib/style.css'
import api from "@/views/api/index"
import _ from 'lodash'
import Speech from 'speak-tts'
import { onBeforeMount, onUnmounted } from 'vue'
const speech = new Speech()



onBeforeMount(() => {
  speech.init().then((data) => {
    console.log("Speech is ready, voices are available", data)
  }).catch(e => {
    console.error("An error occured while initializing : ", e)
  })
})

onUnmounted(() => {
  speech.cancel()
})



const onSave = () => {
  console.log(123)
  speech.speak({
    text: readStr.value
  })
}

const toolbars = [ 'bold', 'underline', 'italic', '-', 'title', 'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-', 'codeRow', 'code', 'link', 'image', 'table', '-', 'revoke', 'next', 'save', 0,  '=', 'pageFullscreen', 'fullscreen', ];
const { queryCase, insertCase } = api

const props = defineProps({ code: String, name: String, sex:  String, age:  String, })

defineOptions({ name: 'MDEditor' })

let data = reactive({})
let post = ref({})


const removeTags = (str) => {
  return _.replace(str, /<[^>]*>|&nbsp/g, '');
}

const readStr = ref('')

onMounted(async() => {
  data = await queryCase(props.code) // cid
  console.log("data", data)
  if (typeof data.data.body != "string") {
    console.log("数据库没数据")
    post.value.content = ref(`
<center><h1>MedSego医疗数据解析平台</h1></center>
<!--<div style="border: 2px solid green; padding: 10px;height: 80vh;">-->
<div style="border: 2px solid green; padding: 10px; display: flex; flex-direction: column;">
<center><strong>医疗影像诊断书</strong></center>
<hr style="border: 1px solid green; width: 100%;">
<table>
<tr >
<td style="border: none;" width="20%"><strong>姓名:&nbsp ${props.name}</strong></td>
<td style="border: none;" width="20%"><strong>性别:&nbsp ${props.sex}</strong></td>
<td style="border: none;" width="20%"><strong>年龄:&nbsp ${props.age}</strong></td>
</tr>
</table>
<hr style="border: 1px solid green; width: 100%;">
<!--请输入诊断意见-->
<strong>诊断意见:&nbsp 肝脏弥漫性低密度灶，考虑肿瘤可能性较大</strong>
<hr style="border: 1px solid green; width: 100%;">
<!--请输入诊断书的主题内容-->

- 影像类型：腹腔X光片
- 影像结果：肝脏增大，见弥漫性大小不等类圆形低密度影。
- 诊断：肝脏肿瘤与肝钙化灶
- 处理意见：
  - 住院隔离治疗，给予抗病毒、抗感染、抗炎、支持等药物治疗。
  - 定期复查血常规、尿常规、肝肾功能、心电图等指标。
  - 注意休息，多饮水，保持良好的心态。
<!--  <div>-->


<div style="margin-top: auto;">
  <table>
<tr >
<td style="border: none;" width="20%"><strong>医生签名:</strong>李四</td>
<td style="border: none;" width="20%"><strong>日期:</strong>&nbsp 2023年7月7日</td>
</tr>
</table>
</div>
</div>
`)
  } else {
    console.log("数据库有数据")
    post.value.content = data.data.body
  }
  readStr.value = removeTags(post.value.content)
})


// refs

let btnLoading = ref(false)

const handleSavePost = async () =>{
  btnLoading.value = true
  $message.loading('正在保存...')
  console.log("data.data: ", data.data)
  console.log("post.value.content: ", post.value.content)
  let resp = await insertCase(post.value.content, props.code)
  console.log("resp: ", resp)
  $message.success("保存成功")
  btnLoading.value = false
}
</script>

<style lang="scss">
.md-preview {
  ul,
  ol {
    list-style: revert;
  }
}
</style>
