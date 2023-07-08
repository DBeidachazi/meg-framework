<template>
  <div f-c-c>
    <n-card title="我的额度" bordered mx-10 my-10 rounded-10>
      <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" align="center" />
    </n-card>
  </div>
</template>

<script setup>
import { h } from "vue";
import { NButton, useMessage, NProgress } from "naive-ui";



const createColumns = ({
  play
}) => {
  return [
    {
      title: "工作日期",
      key: "type"
    },
    {
      title: "今日的分割量",
      key: "title",
      render(row) {
        return h(
          NProgress,
          {
            type: "line",
            percentage: row.callVolumes,
            showText: true,
          }
        )
      }
    },
    {
      title: "今日分割次数",
      key: "callNumbers"
    },
    {
      title: "每日分割额度(次/天)",
      key: "DailyCallLimit",
    },
    {
      title: "申请增加分割次数",
      key: "申请增加分割次数",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row)
          },
          { default: () => "申请" }
        );
      }
    },
    {
      title: "活动",
      key: "活动",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row)
          },
          { default: () => "去阅片" }
        );
      }
    },
  ];
};

const data = [
  { type: "周一", callNumbers:  "25", DailyCallLimit: 100, callVolumes: 25 },
  { type: "周二", callNumbers:  "35", DailyCallLimit: 100, callVolumes: 35 },
  { type: "周三", callNumbers:  "50", DailyCallLimit: 100, callVolumes: 50 },
  { type: "周四", callNumbers: "60", DailyCallLimit: 100, callVolumes: 60 },
  { type: "周五", callNumbers: "75", DailyCallLimit: 100, callVolumes: 75 },
  { type: "周六", callNumbers: "33", DailyCallLimit: 100, callVolumes: 33 },
  { type: "周日", callNumbers: "22", DailyCallLimit: 100, callVolumes: 22 },
];

const message = useMessage();
let columns = createColumns({
  play(row) {
    message.info(`Play ${row.title}`);
  }
})
let pagination = false
</script>