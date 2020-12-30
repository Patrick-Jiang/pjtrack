<template>
  <Layout>

    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>

    <ol>
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">{{ formatDate(group.title) }} <span>${{ group.total}}</span></h3>
        <ol>
          <li class="record" v-for="(item) in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>${{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>

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

@Component({
  components: {Tabs}
})

export default class Statistics extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
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
    if (tags.length === 0) {
      return 'None';
    } else {
      let result = '';
      for (let j = tags.length - 1; j >= 0; j--) {
        if (j !== 0) {
          result += tags[j].name + ',';
        } else {
          result += tags[j].name + '';
        }
      }
      return result;
    }
  }

  get groupList() {
    const {recordList} = this;
    if (recordList.length === 0) {
      return [];
    }
    type Result = {title: string; total?: number; items: RecordItem[]}[]
    const newList = clone(recordList).filter(r=>r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
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
    result.forEach(group=>{
      group.total = group.items.reduce((sum,item)=>sum + item.amount,0)
    })
    return result;
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
</style>