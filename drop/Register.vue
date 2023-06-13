<template>
  <span @click='showModal = true' cursor-pointer style="font-size: 13px; vertical-align: top">
    注册
  </span>


  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="注册"
    content="content"

    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  >
    <div>
      <n-form
        ref="formRef"
        inline
        :label-width="80"
        :model="formValue"
        :rules="rules"
        style="display: flex; flex-direction: column;"
      >

        <n-form-item label="电话号码" path="mobile">
          <n-input :maxlength="11" v-model:value="formValue.mobile" placeholder="电话号码" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input type='password' show-password-on="mousedown" :maxlength="20" v-model:value="formValue.password" placeholder="密码" />
        </n-form-item>
        <n-form-item>
          <n-button type='primary' attr-type="button" @click="handleValidateClick">
            注册
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </n-modal>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useMessage } from "naive-ui";
import axios from 'axios'



const message = useMessage();
const showModal = ref(false);


function onNegativeClick() {
  message.success("Cancel");
  showModal.value = false;
}
function onPositiveClick() {
  message.success("注册成功");
  showModal.value = false;
}



const formRef = ref(null)
let formValue = reactive({
  mobile: "",
  password: ""
})
let rules = reactive({
  mobile: {
    required: true,
    // message: "请输入电话号码",
    trigger: ["input", "blur"],
    validator(rule, value) {
      if (!value) {
        return new Error("请输入电话号码");
      } else if (!/^\d*$/.test(value)) {
        return new Error("电话号码应该为整数");
      }
      return true;
    },
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"]
  }
})

const handleValidateClick = (e) => {
  e.preventDefault();
  formRef.value?.validate(async(errors) => {
    if (!errors && formValue.mobile.length === 11) {
      const timeOut = setTimeout(() => message.error("注册失败"), 2000)
      await axios.post('http://127.0.0.1:8009/register', { "mobile": formValue.mobile, "password": formValue.password }).
        then( ({data}) => {
        console.log(data)
        message.success("注册成功");
        clearTimeout(timeOut)

        showModal.value = false;
        formValue.mobile = ""
        formValue.password = ""
      })
    } else {
      console.log(errors);
      message.error("验证失败");
    }
  })
}


</script>