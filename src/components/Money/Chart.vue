<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import * as echarts from 'echarts/dist/echarts.js';

@Component
export default class Chart extends Vue {
  @Prop() options: any;

  mounted() {
    // console.log(echarts);
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
}

</script>

<style lang="scss" scoped>
.wrapper{
  height: 400px;
}
</style>