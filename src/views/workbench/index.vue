<template>
  <AppPage :show-footer="true">
    <div flex-1 >
      <n-card rounded-10>
        <div flex items-center>
          <img rounded-full width="60" :src="userStore.avatar" alt="" />
          <div ml-20>
            <!-- 用户提示语 -->
            <p text-16>Hello, {{ userStore.name.split('(')[1].split(')')[0] }}</p>
            <p mt-5 text-12 op-60>今天又是元气满满的一天</p>
          </div>
          <div ml-auto flex items-center>
            <!-- 待诊断病人 -->
            <n-statistic label="今日已预测数量" :value="4">
              <template #suffix> / 10 </template>
            </n-statistic>
            <!-- 待分割的图像数量 -->
            <n-statistic label="总预测数量" ml-100 mr-100 w-120 :value="4">
              <template #suffix> / 10 </template>
            </n-statistic>
          </div>
        </div>


        <div flex mt-20>
          <workbench-card value='hello134' title='📖 title' imgurl="http://tva1.sinaimg.cn/mw690/006Hj19Tly1hf4ppw4i52j30oe0mxn5d.jpg"/>
          <workbench-card value='hello134' title='📖 title' imgurl="http://tva1.sinaimg.cn/large/006Hj19Tly1hfprwhsxhgj30d60d6gm2.jpg"/>
          <workbench-card value='2' title='title' imgurl="http://tva1.sinaimg.cn/large/006Hj19Tly1hfprwvjg3qj301c01cglg.jpg"/>
          <workbench-card value='3' title='title'/>
        </div>

      </n-card>



<!--      图表-->
        <div flex justify-center>
          <n-card rounded-10 class="chart-container" style="flex-basis: 70%;" mr-10 px-10 pb-5>
            <div  ref="chartContainer"></div>
          </n-card>
          <n-card rounded-10 class="chart-container2" style="flex-basis: 30%;">
            <div ref="chartContainer"></div>
          </n-card>
        </div>
        
    </div>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store';
import * as echarts from 'echarts';
import { onMounted } from 'vue'
import api from '@/views/api/index'
import WorkbenchCard from '@/components/card/WorkbenchCard.vue'
const { information } = api

const testUrl = () => require('@/assets/svg/patient.svg')

const userStore = useUserStore()
// 获取后端返回的患者数据
onMounted(() => {
  let dom = document.getElementsByClassName('chart-container')[0];
  let dom2 = document.getElementsByClassName('chart-container2')[0];
  let myBorderRaius = echarts.init(dom2, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });


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
        name: 'Access From',
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
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          // { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };




    information().then(({data}) => {
      console.log("data", data)
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
          data: ['male', 'female'],
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
            name: 'male',
            type: 'value',
            max: data.max
          },
          {
            gridIndex: 1,
            name: 'female',
            type: 'value',
            inverse: true
          }
        ],
        series: [
          {
            name: 'male',
            type: 'line',
            symbolSize: 8,
            // prettier-ignore
            data: data.series[0].data
          },
          {
            name: 'female',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            // prettier-ignore
            data: data.series[1].data
          }
        ],
      };
      // 设置echarts配置对象
      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
       window.addEventListener('resize', myChart.resize);
    })

    option && myBorderRaius.setOption(option);
    window.addEventListener('resize', myBorderRaius.resize);
});


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