<template>
  <Layout class-prefix="layout">
    {{record}}
    <Tags :tags.sync="tags" @update:value="onUpdateTags"/>
    <Notes @update:value="onUpdateNotes"/>
    <Types :value.sync="record.type" />
    <!--    <Types :value="record.type" @update:value="onUpdateType"/> the same as above-->

    <NumberPad @update:value="onUpdateAmount"/>
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import Component from 'vue-class-component';
import Vue from 'vue';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;

}
@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  tags = ['Food', 'Cloth', 'Rent', 'Transportation'];
  record: Record = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  // Use .sync do not need this event to update the value
  // onUpdateType(value: string) {
  //   this.record.type = value;
  // }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
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