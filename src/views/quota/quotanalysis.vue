<template>
  <div f-c-c>
    <n-card title="额度分析" bordered mx-10 my-10 rounded-10>
      <div f-c-c>
        <WorkbenchCard title="title" value="123321" />
        <WorkbenchCard title="title" />
        <WorkbenchCard />
        <WorkbenchCard />
      </div>

      <div my-20>
        <div class="chart-container" ref="chartContainer"></div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import WorkbenchCard from '~/src/components/card/WorkbenchCard.vue';

</script>
