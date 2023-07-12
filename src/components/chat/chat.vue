<template>
  <n-space>

    <n-popover trigger="manual" :show="showPopover" placement='right-end'>
      <template #trigger>
        <n-button w-100 h-100  circle @click="showPopover = !showPopover"  type='primary' dashed>
<!--          <n-button w-100 h-100  circle @click="showPopover = !showPopover" style='background: #316C72' type='primary' dashed>-->
          <template #icon>
            <n-icon size='40' :component='Chatbubble'></n-icon>
          </template>
        </n-button>
      </template>
      <iframe :src='url' frameborder='0' style='height: 180rem; width: 110rem'></iframe>
    </n-popover>
  </n-space>
</template>

<script setup>
import { defineComponent, ref, watch } from 'vue'
import { Chatbubble } from "@vicons/ionicons5"
import {getProxyConfig} from '~/settings'

const url = getProxyConfig().target + "/static/ai"

let showPopover =  ref(false)
let color = ref('background: white')

watch(showPopover, (val) => {
  if(val) {
    color.value = 'background: #316C72'
  } else {
    color.value = 'background: white'
  }
})
</script>