<template>
  <Layout class-prefix="layout">

    <Tags :tags.sync="tags" @update:value="onUpdateTags"/>
    <div class="form-wrapper">
      <FormItem field-name="Notes" place-holder="Please enter notes" @update:value="onUpdateNotes"/>
    </div>

    <Types :value.sync="record.type"/>
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';

import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import {recordListModel} from '@/models/recordListModel';
import {tagListModel} from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';

const recordList = recordListModel.fetch();


@Component({
  components: {Tags, FormItem, Types, NumberPad},
})
export default class Money extends Vue {

  tags = tagListModel.data;

  recordList: RecordItem[] = recordList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }


  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    const deepCloneRecord: RecordItem = recordListModel.clone(this.record);
    deepCloneRecord.createdAt = new Date();
    this.recordList.push(deepCloneRecord);

  }

  @Watch('recordList')
  onRecordListChanged() {
    recordListModel.save(this.recordList);
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