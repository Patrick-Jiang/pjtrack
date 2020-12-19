<template>
  <div class="note-div">
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeHolder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
 value =''
  @Prop({required:true})
  fieldName!: string
  @Prop()
  placeHolder?: string
  @Watch('value')
  onValueChanged(val: string) {
   this.$emit('update:value',val)
  }
}
</script>

<style lang="scss" scoped>
.note-div {
  //order: 3;

  > .formItem {
    font-size: 14px;
    display: flex;
    //background: #f5f5f5;
    padding-left: 16px;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 44px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
}

</style>