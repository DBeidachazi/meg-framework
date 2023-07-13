<template>
  <CommonPage>
    <div h-60 flex items-center bg-white pl-20 pr-20 >
<!--      <div h-60 flex items-center bg-white pl-20 pr-20 dark:bg-dark>-->
      <input
        v-model="post.title"
        class="mr-20 flex-1 pb-15 pt-15 text-20 font-bold color-primary"
        type="text"
        placeholder="输入文章标题..."
      />
      <n-button type="primary" style="width: 80px" :loading="btnLoading" @click="handleSavePost">
        <TheIcon v-if="!btnLoading" icon="line-md:confirm-circle" class="mr-5" :size="18" /> 保存
      </n-button>
    </div>
    <MdEditor v-model="post.content" style="height: calc(100vh - 305px)" dark:bg-dark />
  </CommonPage>
</template>

<script setup>
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { onBeforeMount, watch } from 'vue'
import api from "@/views/api/index"

const { queryCase, insertCase } = api

const props = defineProps({
  code: String,
  name: String,
  sex:  String,
  age:  String,
})

defineOptions({ name: 'MDEditor' })

let data = reactive({})

// onBeforeMount(async() => {
//   data = await queryCase(props.code)
//   data.head ??= "诊断意见:&nbsp 肝脏弥漫性低密度灶，考虑肿瘤可能性较大"
//   data.body ??= `
// - 影像类型：腹腔X光片
// - 影像结果：肝脏增大，见弥漫性大小不等类圆形低密度影。
// - 诊断：肝脏肿瘤与肝钙化灶
// - 处理意见：
//   - 住院隔离治疗，给予抗病毒、抗感染、抗炎、支持等药物治疗。
//   - 定期复查血常规、尿常规、肝肾功能、心电图等指标。
//   - 注意休息，多饮水，保持良好的心态。`
//   data.date ??= "&nbsp 2023年7月7日"
//   data.sign ??= "李四"
// })

onMounted(async() => {
  data = await queryCase(props.code) // cid
  console.log(data.data)
  data.data.cid = props.code
  data.data.head ??= "诊断意见:&nbsp 肝脏弥漫性低密度灶，考虑肿瘤可能性较大"
  data.data.body ??= `
- 影像类型：腹腔X光片
- 影像结果：肝脏增大，见弥漫性大小不等类圆形低密度影。
- 诊断：肝脏肿瘤与肝钙化灶
- 处理意见：
  - 住院隔离治疗，给予抗病毒、抗感染、抗炎、支持等药物治疗。
  - 定期复查血常规、尿常规、肝肾功能、心电图等指标。
  - 注意休息，多饮水，保持良好的心态。`
  data.data.date ??= "&nbsp 2023年7月7日"
  data.data.sign ??= "李四"



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
<strong>` + data.data.head + `</strong>
<hr style="border: 1px solid green; width: 100%;">
<!--请输入诊断书的主题内容-->
` + data.data.body + `
<!--  <div>-->


<div style="margin-top: auto;">
  <table>
<tr >
<td style="border: none;" width="20%"><strong>医生签名:</strong>`+ data.data.sign + `</td>
<td style="border: none;" width="20%"><strong>日期:</strong>`+ data.data.date +`</td>
</tr>
</table>
</div>
</div>
`)
})


// refs
let post = ref({})
let btnLoading = ref(false)

const handleSavePost = async () =>{
  btnLoading.value = true
  $message.loading('正在保存...')
  console.log("data.data: ", data.data)
  console.log("post.value.content: ", post.value.content)
  let resp = await insertCase(data.data)
  console.log(resp)
  setTimeout(() => {
    $message.success('保存成功')
    btnLoading.value = false
  }, 2000)
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
