<template>
  <Layout class-prefix="layout">
    {{ recordList }}
    <Tags :tags.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type"/>
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import {recordListModel} from '@/models/recordListModel';
import {tagListModel} from '@/models/tagListModel';

const recordList = recordListModel.fetch();


@Component({
  components: {Tags, Notes, Types, NumberPad},
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
</style>
<style lang="scss" scoped>

</style>