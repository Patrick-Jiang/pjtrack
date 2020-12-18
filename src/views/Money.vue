<template>
  <Layout>
    <div class="tags">
      <ul class="current">
        <li>Food</li>
        <li>Cloth</li>
        <li>Rent</li>
        <li>Transportation</li>
      </ul>
      <div class="new">
        <button>Add new tag</button>
      </div>
    </div>
    <div>
      <label class="notes">
        <span class="name">Note</span>
        <input type="text">
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">Expense</li>
        <li>Earn</li>
      </ul>
    </div>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>Delete</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>Clear</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>ok</button>
        <button>0</button>
        <button>.</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
  name: 'money',

};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>