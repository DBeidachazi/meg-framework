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
            <!-- 我们可以插入一些logo进行美化 -->
<!--            <n-statistic label="预计今日诊断" :value="4">-->
<!--              <template #suffix> / 10 </template>-->
<!--            </n-statistic>-->
          </div>
        </div>
      </n-card>

      <div flex mt-20>
        <n-card rounded-10 mr-5 h-100>23</n-card>
        <n-card rounded-10 mx-5 h-100>23</n-card>
        <n-card rounded-10 mx-5 h-100>23</n-card>
        <n-card rounded-10 ml-5 h-100>45</n-card>
      </div>

<!--      图表-->
      <div class="chart-container" ref="chartContainer"></div>
    </div>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store';
import * as echarts from 'echarts';
import { onMounted } from 'vue'

const userStore = useUserStore()
// 获取后端返回的患者数据
onMounted(() => {
  // 获取echarts图表的容器
  let dom = document.getElementsByClassName('chart-container')[0];
  // 初始化echarts图表
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });
  // 使用fetch()函数向后端发送GET请求
  fetch('http://localhost:8009/information')
    .then(response => response.json()) // 将响应转换为json格式
    .then(data => {
      console.log("data", data)
      // 使用data渲染echarts图表
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {}
        },
        legend: {
          data: ['男患者', '女患者'] // 获取data中的图例名称
        },
        xAxis: [
          {
            type: 'category',
            data: data.xAxis.data, // 获取data中的x轴数据
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '就诊人数',
            min: 0,
            max: data.max,
            interval: 2,
            axisLabel: {
              formatter: '{value} 人'
            }
          },
        ],
        series: data.series
      };
      // 设置echarts配置对象
      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }
       window.addEventListener('resize', myChart.resize);
    })
});


</script>
<style scoped>
.chart-container {
  margin-top: 10vh;
  height: 50vh;
}
</style>