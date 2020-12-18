<template>
  <div class="tags">
    <div class="new">
      <button>Add new tag</button>
    </div>
    <ul class="current">
      <li>Food</li>
      <li>Cloth</li>
      <li>Rent</li>
      <li>Transportation</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>

.tags {
  flex-grow: 1;
  border: 1px solid red;
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