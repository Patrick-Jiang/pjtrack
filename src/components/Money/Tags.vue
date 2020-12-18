<template>
  <div class="tags">
    <div class="new">
      <button>Add new tag</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource"
          :key="tag"
          :class="selectedTags.indexOf(tag)>=0 && 'selected'"
          @click="toggle(tag)"
      > {{ tag }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const DataSource = Vue.extend({
  props: {
    tags: {
      type: Array
    }
  }
});

@Component
export default class Tags extends DataSource {
  selectedTags: string[] = []
  get dataSource(): string[] {
    return this.tags as [];
  }

  toggle(tag: string){
    if (this.selectedTags.indexOf(tag) >=0 ){
      this.selectedTags.splice(this.selectedTags.indexOf(tag),1)
    }else{this.selectedTags.push(tag)}

  }
}
</script>

<style lang="scss" scoped>

.tags {
  flex-grow: 1;
  //border: 1px solid red;
  order: 4;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    > li {
      height: 24px;
      line-height: 24px;
      background: #d9d9d9;
      -webkit-border-radius: (24px/2);
      -moz-border-radius: (24px/2);
      border-radius: (24px/2);
      padding: 0 8px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken(#d9d9d9,50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>