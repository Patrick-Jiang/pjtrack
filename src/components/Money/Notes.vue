<template>
  <div class="note-div">
    {{value}}
    <label class="notes">
      <span class="name">Note</span>
      <input type="text"
             :value="value"
             @input="value = $event.target.value"
             placeholder="Please enter note here">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Notes extends Vue{
 value =''
}
</script>

<style lang="scss" scoped>
.note-div {
  order: 3;

  > .notes {
    font-size: 14px;
    display: flex;
    background: #f5f5f5;
    padding-left: 16px;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
}

</style>