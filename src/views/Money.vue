<template>
  <Layout class-prefix="layout">
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
    <div class="note-div">
      <label class="notes">
        <span class="name">Note</span>
        <input type="text" placeholder="Please enter note here">
      </label>
    </div>
    <div class="type-div">
      <ul class="types">
        <li class="selected">Expense</li>
        <li>Earn</li>
      </ul>
    </div>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons ">
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
        <button class="ok">Ok</button>
        <button class="zero">0</button>
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
<style lang="scss">
.layout-content {
  border: 3px solid red;
  display: flex;
  flex-direction: column-reverse;
}
</style>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

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

        //border-bottom: 4px solid #333;
      }
    }
  }
}


.numberPad {
  order: 1;

  .output {
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    @extend %innerShadow;
  }

  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 7.9vh;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 15.8vh;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }

      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>