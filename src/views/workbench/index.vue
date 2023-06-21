<template>
  <AppPage :show-footer="true">
    <div flex-1 style='height: 20%'>
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
    </div>

<!--    <n-card title="项目" size="small" :segmented="true" mt-15 rounded-10>-->
<!--      <template #header-extra>-->
<!--        <n-button text type="primary">更多</n-button>-->
<!--      </template>-->
<!--      &lt;!&ndash; 设置一个div用于存放模板并渲染视图 &ndash;&gt;-->
<!--      &lt;!&ndash; 容器-staring &ndash;&gt;-->

<!--      &lt;!&ndash; 容器-ending  &ndash;&gt;-->
<!--    </n-card>-->

    <div class="chart-container" ref="chartContainer" ></div>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '@/store';
import * as echarts from 'echarts';
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  let dom = document.getElementsByClassName('chart-container')[0];
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });

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
      feature: {
        // dataView: { show: true, readOnly: false },dataview的页面不够美化，且用处不大，后无法修改，可以进行删除
        // magicType: { show: true, type: ['line', 'bar'] },
        // restore: { show: true },
        // saveAsImage: { show: true }
      }
    },
    // todo get data from backend
    legend: {
      data: ['男患者', '女患者', '医生']
    },
    xAxis: [
      {
        type: 'category',
        data: ['星期1', '星期2', '星期3', '星期4', '星期5', '星期6', '星期7'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '访问次数',
        min: 0,
        max: 30,
        interval: 2,
        axisLabel: {
          formatter: '{value} 次'
        }
      },
    ],
    series: [
      {
        name: '男患者',
        type: 'bar',
        data: [
          2.0, 5.0, 7.0, 16.0, 20.0, 6.0, 3.0,
        ]
      },
      {
        name: '女患者',
        type: 'bar',
        data: [
          3.0, 4.0, 9.0, 10.0, 15.0, 2.0, 3.0,
        ]
      },
      {
        name: '医生',
        type: 'line',
        data: [4.0, 6.0, 15.0, 20.0, 23.0, 8.0, 6.0,]
      }
    ]
  };


  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }

  window.addEventListener('resize', myChart.resize);
})
</script>
<style scoped>
.chart-container {
  height: 500px;
}
</style>