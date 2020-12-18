<template>
  <div class="type-div">
    <ul class="types">
      <li :class="type === '-' && 'selected'"
      @click="selectedType('-')">Expense</li>
      <li :class="type === '+' && 'selected'"
      @click="selectedType('+')">Earn</li>
    </ul>
  </div>
</template>

<script lang="js">
export default {
  name: 'Types',
  data() {
    return {
      type: '-' // '-- for expense, '+' for earn
    };
  },
  methods:{
    selectedType(type) { //'type' can only be '- or +'
      if (type !== '-' && type !=='+'){
        throw new Error( ' type is unknown')
      }
      this.type = type
    }
  }

};
</script>

<style lang="scss" scoped>
.type-div {
  order: 2;

  > .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected {
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #333;
        }
      }
    }
  }
}
</style>