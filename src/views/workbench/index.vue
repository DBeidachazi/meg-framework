<template>
  <AppPage :show-footer='true'>
    <div flex-1>
      <n-card rounded-10>
        <div flex items-center>
          <img rounded-full width='60' :src='doctorAvatar' alt='' />
          <div ml-20>
            <!-- 用户提示语 -->
            <p text-16>Hello, {{ userStore.name.split('(')[1].split(')')[0] }}</p>
            <p mt-5 text-12 op-60>今天又是元气满满的一天</p>
          </div>
          <div ml-auto flex items-center>
            <!-- 待诊断病人 -->
            <n-statistic label='今日申请的人数' value='10'>
              <template #suffix> / 10</template>
            </n-statistic>
            <!-- 待分割的图像数量 -->
            <n-statistic label='通过申请的人数' ml-100 mr-100 w-120 value='4'>
              <template #suffix> / 10</template>
            </n-statistic>
          </div>
        </div>


        <div flex mt-20>
          <workbench-card :value='data[0].cardValue' :lottie='aply' :title='data[0].name' />
          <workbench-card :value='data[1].cardValue' :lottie='aply' :title='data[1].name' />
          <workbench-card :value='data[2].cardValue' :lottie='aply' :title='data[2].name' />
          <workbench-card :value='data[3].cardValue' :lottie='aply' :title='data[3].name' />
        </div>

      </n-card>


      <!--      图表-->
      <div flex justify-center>
        <n-card rounded-10 class='chart-container' style='flex-basis: 70%;' mr-10 px-10 pb-5>
          <div ref='chartContainer'></div>
        </n-card>
        <n-card rounded-10 class='chart-container2' style='flex-basis: 30%;'>
          <div ref='chartContainer'></div>
        </n-card>
      </div>

    </div>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import api from '@/views/api/index'
import WorkbenchCard from '@/components/card/WorkbenchCard.vue'
import gear from '@/assets/lottie/gear-loader.json'
import doctor from '@/assets/lottie/register_doctor_lottie.json'
import doctor_patient from '@/assets/lottie/admin/number_doctor_patient.json'
import aply from '@/assets/lottie/admin/number_aply.json'
import fenge from '@/assets/lottie/doctor/number_fenge.json'
import load from '@/assets/lottie/doctor/model_load.json'

import doctorAvatar from "@/assets/images/doctor.png"


const { information, getAllData } = api

const testUrl = () => require('@/assets/svg/patient.svg')

const userStore = useUserStore()

// bing图数据
let data = ref([{name:'',cardValue:''},{name:'',cardValue:''},{name:'',cardValue:''},{name:'',cardValue:''}])


// 获取后端返回的患者数据
onMounted(async () => {
  let dom = document.getElementsByClassName('chart-container')[0]
  let dom2 = document.getElementsByClassName('chart-container2')[0]
  let myBorderRaius = echarts.init(dom2, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })


  const resp = await getAllData()
  console.log(resp.value)
  data.value = resp.data


  // 饼形图
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        // Acess From=来源
        name: '来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.value
      }
    ]
  }


  information().then(({ data }) => {
    console.log('data', data)
    // 使用data渲染echarts图表
    var option = {
      title: {
        text: '男女性就诊人数统计和对比',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      legend: {
        data: ['男', '女'],
        left: 10
      },
      toolbox: {
        feature: {
          // dataZoom: {
          //   yAxisIndex: 'none'
          // },
          restore: {},
          saveAsImage: {}
        }
      },
      axisPointer: {
        link: [
          {
            xAxisIndex: 'all'
          }
        ]
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1]
        },
        {
          type: 'inside',
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1]
        }
      ],
      grid: [
        {
          left: 60,
          right: 50,
          height: '35%'
        },
        {
          left: 60,
          right: 50,
          top: '55%',
          height: '35%'
        }
      ],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: true },
          data: data.xAxis.data
        },
        {
          gridIndex: 1,
          type: 'category',
          boundaryGap: false,
          axisLine: { onZero: true },
          data: data.xAxis.data,
          position: 'top'
        }
      ],
      yAxis: [
        {
          name: '男性',
          type: 'value',
          max: data.max
        },
        {
          gridIndex: 1,
          name: '女性',
          type: 'value',
          inverse: true
        }
      ],
      series: [
        {
          name: '男',
          type: 'line',
          symbolSize: 8,
          // prettier-ignore
          data: data.series[0].data
        },
        {
          name: '女',
          type: 'line',
          xAxisIndex: 1,
          yAxisIndex: 1,
          symbolSize: 8,
          // prettier-ignore
          data: data.series[1].data
        }
      ]
    }
    // 设置echarts配置对象
    if (option && typeof option === 'object') {
      myChart.setOption(option)
    }
    window.addEventListener('resize', myChart.resize)
  })

  option && myBorderRaius.setOption(option)
  window.addEventListener('resize', myBorderRaius.resize)
})


</script>


<style scoped>
.chart-container {
  margin-top: 1vh;
  padding-top: 2vh;
  height: 56vh;

}

.chart-container2 {
  margin-top: 1vh;
  padding-top: 2vh;
  height: 56vh;

}
</style>