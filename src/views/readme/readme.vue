<template>
  <AppPage>

    <n-card rounded-10>
      <div flex style='flex-direction: column'>
        <span mb-15 style='font-size: 25px; font-weight: bold'>
          说明
        </span>
        <span style='font-size: 18px'>
            <ul>
            <li><strong><h1>📦 MedSego平台是基于百度的paddlepaddles深度学习框架开发的智慧医疗数据解析平台</h1></strong></li>
            <br>
            <li><strong>🤹功能：</strong>帮助医生快速进行医疗影像数据的导入、阅片、分割、处理等，实现全流程的处理方案帮助医生快速阅片。</li>
            <br>
            <li><strong>🍏 分割目标</strong>：腹腔内的11个器官，包括脾脏、右肾、左肾、胆囊、食道、肝、胃、主动脉、下腔静脉、胰腺、膀胱</li>
            <br>
            <li><strong>🍋 算法</strong>：基于经典的unet医疗分割模型改进的nnunet模型，能高精度的识别腹腔内的11个器官</li>
            <br>
            <li><strong>🍎前端</strong>：Vue3.0+Cornerstonejs+Three.js集成化开发</li>
            <br>
            <li><strong>🍉 后端</strong>：Falsk+Postgresql+MVC架构</li>
          </ul>
        </span>
      </div>
    </n-card>


    <n-card rounded-10 mt-10>
      <span style='font-size: 18px; font-weight: bold'>生产环境依赖</span>
      <n-table :bordered='false' :single-line='false' striped>
        <tbody>
        <tr>
          <td>@commitlint/cli</td>
          <td>^17.4.4</td>
          <td>@commitlint/config-conventional</td>
          <td>^17.4.4</td>
        </tr>
        <tr>
          <td>@iconify/json</td>
          <td>^2.2.31</td>
          <td>@iconify/vue</td>
          <td>^4.1.0</td>
        </tr>
        <tr>
          <td>@vitejs/plugin-vue</td>
          <td>^4.0.0</td>
          <td>@vitejs/plugin-vue-jsx</td>
          <td>^3.0.1</td>
        </tr>
        <tr>
          <td>@vue/compiler-sfc</td>
          <td>^3.2.47</td>
          <td>@zclzone/eslint-config</td>
          <td>^0.0.4</td>
        </tr>
        <tr>
          <td>chalk</td>
          <td>^5.2.0</td>
          <td>commitizen</td>
          <td>^4.3.0</td>
        </tr>
        <tr>
          <td>cz-conventional-changelog</td>
          <td>^3.3.0</td>
          <td>cz-customizable</td>
          <td>^7.0.0</td>
        </tr>
        <tr>
          <td>dotenv</td>
          <td>^16.0.3</td>
          <td>esno</td>
          <td>^0.16.3</td>
        </tr>
        <tr>
          <td>fs-extra</td>
          <td>^11.1.0</td>
          <td>husky</td>
          <td>^8.0.3</td>
        </tr>
        <tr>
          <td>lint-staged</td>
          <td>^13.1.2</td>
          <td>rollup-plugin-visualizer</td>
          <td>^5.9.0</td>
        </tr>
        <tr>
          <td>sass</td>
          <td>^1.58.3</td>
          <td>unocss</td>
          <td>0.46.5</td>
        </tr>
        <tr>
          <td>unplugin-auto-import</td>
          <td>^0.15.1</td>
          <td>unplugin-icons</td>
          <td>^0.15.3</td>
        </tr>
        <tr>
          <td>unplugin-vue-components</td>
          <td>^0.24.1</td>
          <td>vite-plugin-compression</td>
          <td>^0.5.1</td>
        </tr>
        <tr>
          <td>vite-plugin-html</td>
          <td>^3.2.0</td>
          <td>vite-plugin-mock</td>
          <td>^2.9.6</td>
        </tr>
        <tr>
          <td>vite-plugin-svg-icons</td>
          <td>^2.0.1</td>
        </tr>
        </tbody>
      </n-table>
    </n-card>

    <n-card rounded-10 mt-10>
      <span style='font-size: 18px; font-weight: bold'>开发环境依赖</span>
      <n-table :bordered='false' :single-line='false' striped>
        <tbody>
        <tr>
          <td>@mdi/js</td>
          <td>^7.2.96</td>
          <td>@unocss/eslint-config</td>
          <td>^0.51.12</td>
        </tr>
        <tr>
          <td>@vicons/ionicons5</td>
          <td>^0.12.0</td>
          <td>@vueuse/core</td>
          <td>^9.13.0</td>
        </tr>
        <tr>
          <td>@wangeditor/editor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>^5.1.23</td>
          <td>@wangeditor/editor-for-vue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td>^5.1.12</td>
        </tr>
        <tr>
          <td>@zclzone/utils</td>
          <td>^0.0.8</td>
          <td>axios</td>
          <td>^1.3.4</td>
        </tr>
        <tr>
          <td>dayjs</td>
          <td>^1.11.7</td>
          <td>echarts</td>
          <td>^5.4.2</td>
        </tr>
        <tr>
          <td>lodash</td>
          <td>^4.17.21</td>
          <td>lodash-es</td>
          <td>^4.17.21</td>
        </tr>
        <tr>
          <td>md-editor-v3</td>
          <td>^2.9.0</td>
          <td>mockjs</td>
          <td>^1.1.0</td>
        </tr>
        <tr>
          <td>naive-ui</td>
          <td>^2.34.4</td>
          <td>pinia</td>
          <td>^2.0.33</td>
        </tr>
        <tr>
          <td>swiper</td>
          <td>^9.4.1</td>
          <td>vite</td>
          <td>^4.3.5</td>
        </tr>
        <tr>
          <td>vue</td>
          <td>3.3.4</td>
          <td>vue-router</td>
          <td>^4.1.6</td>
        </tr>
        <tr>
          <td>vue3-lottie</td>
          <td>^2.7.1</td>
          <td>xlsx</td>
          <td>^0.18.5</td>
        </tr>
        </tbody>
      </n-table>
    </n-card>
  </AppPage>
</template>

<script setup>
import AppPage from '@/components/page/AppPage.vue'
</script>
