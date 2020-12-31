<template>
  <Layout>

    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>
    <ol v-if="groupList.length > 0">
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">{{ formatDate(group.title) }} <span>${{ group.total }}</span></h3>
        <ol>
          <li class="record" v-for="(item) in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>${{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="no-res">
      No records
    </div>
  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/assets/lib/clone';
import Chart from '@/components/Money/Chart.vue';
import _ from 'lodash';

@Component({
  components: {Chart, Tabs,}
})

export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  formatDate(string: string) {
    const now = new Date();
    if (dayjs(string).isSame(now, 'day')) {
      return 'Today';
    } else if (dayjs(string).isSame(now.valueOf() - 86400 * 1000, 'day')) {
      return 'Yesterday';
    } else {
      return dayjs(string).format('YYYY-MM-DD');
    }
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? 'None' : tags.map(t => t.name).join(',');
  }

  get groupList() {
    const {recordList} = this;
    if (recordList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[]
    const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }
 get keyValueList(){
   const today = new Date();
   const array = [];
   for (let i = 0; i <= 29; i++) {
     const date = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
     array.push(
         {
           key: date, value: _.find(this.recordList, {
             createdAt: date
           })?.amount
         }
     );
   }
   array.sort((a, b) => {
     if (a.key > b.key) {
       return 1;
     } else if (a.key === b.key) {
       return 0;
     } else {
       return -1;
     }
   });

   return array
 }
  get chartOptions() {

    const keys = this.keyValueList.map(item => item.key);
    const value = this.keyValueList.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          /* eslint-disable */
          formatter: function(value: string){
            return value.substring(5)
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 12,
        itemStyle: {color: '#666'},
        data: value,
        type: 'line'
      }],
      tooltip: {show: true}
    };
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>

.echarts {

  max-width: 100%;
  min-height: 50vh;
}

::v-deep {
  .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item
}

.record {
  @extend %item;
  background: white;
}

.notes {
  margin-right: auto;
  margin-left: 14px;
  color: #999;
}

.no-res {
  padding: 16px;
  text-align: center;
}

.chart-wrapper {
  overflow: auto;
}

.chart {
  width: 430%;
}
</style>