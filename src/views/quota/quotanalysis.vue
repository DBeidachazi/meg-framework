<template>
  <div f-c-c>
    <n-card title="额度分析" bordered mx-10 my-10 rounded-10>
      <div f-c-c>
        <WorkbenchCard title="title" value="123321" />
        <WorkbenchCard title="title" />
        <WorkbenchCard />
        <WorkbenchCard />
      </div>
    </n-card>
  </div>
  <n-card rounded-10 class="chart-container" style="flex-basis: 70%;" mr-10 px-10 pb-5>
    <div ref="chartContainer"></div>
  </n-card>
</template>

<script setup>
import WorkbenchCard from '~/src/components/card/WorkbenchCard.vue';
import * as echarts from 'echarts';

onMounted(() => {
  let dom = document.getElementsByClassName('chart-container')[0];
  let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
  });


  // todo 不生效
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

  myChart.setOption(option);
  window.addEventListener('resize', myChart.resize);
})
</script>
