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
      title: "请求类别",
      key: "type"
    },
    {
      title: "本月调用量",
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
      title: "今日调用次数",
      key: "callNumbers"
    },
    {
      title: "每日调用额度(次/天)",
      key: "DailyCallLimit",
    },
    {
      title: "actions",
      key: "actions",
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row)
          },
          { default: () => "Play" }
        );
      }
    }
  ];
};

const data = [
  { type: "什么种类", callNumbers: "Wonderwall", DailyCallLimit: 23, callVolumes: 23 },
  { type: 4, callNumbers: "Don't Look Back in Anger", DailyCallLimit: 123, callVolumes: 44 },
  { type: 12, callNumbers: "Champagne Supernova", DailyCallLimit: 333, callVolumes: 55 }
];

const message = useMessage();
let columns = createColumns({
  play(row) {
    message.info(`Play ${row.title}`);
  }
})
let pagination = false
</script>