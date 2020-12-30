<template>
  <Layout class-prefix="layout">
    <Tags  @update:value="onUpdateTags"/>
    <div class="form-wrapper">
      <FormItem field-name="Notes" place-holder="Please enter notes" @update:value="onUpdateNotes"/>
    </div>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';

import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import FormItem from '@/components/Money/FormItem.vue';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList
  created() {
    this.$store.commit('fetchRecords');
    this.$store.commit('fetchTags');
  }
  onUpdateTags(value: Tag[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.form-wrapper {
  order: 3;
  padding: 10px 0;
}
</style>
<style lang="scss" scoped>

</style>