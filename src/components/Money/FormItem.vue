<template>
  <div class="note-div">
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <template v-if="type === 'date'">
        <input :type="type|| 'text' "
               :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeHolder">

      </template>
      <template v-else>
        <input :type="type|| 'text' "
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeHolder">

      </template>

    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''})
  readonly value!: string;
  @Prop({required: true})
  fieldName!: string;
  @Prop()
  placeHolder?: string;
  @Prop()
  type?: string
 x(ISOstring: string){
    return dayjs(ISOstring).format('YYYY-MM-DD');
 }

  onValueChanged(val: string) {
    this.$emit('update:value', val);

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