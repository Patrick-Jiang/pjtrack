<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import * as echarts from 'echarts';


@Component
export default class Chart extends Vue {
  /* eslint-disable */
  @Prop() options: any;
  chart?: any
  mounted() {
    // console.log(echarts);
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChange(newValue: any){
    this.chart!.setOption(newValue)
  }
}

</script>

<style lang="scss" scoped>
.wrapper{
  height: 400px;
}
</style>