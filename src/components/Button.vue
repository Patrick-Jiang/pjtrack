<template>
  <button class="Button"
          @click="$emit('click',$event)"
  ><slot></slot></button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Button extends Vue {

}

</script>

<style lang="scss" scoped>

.Button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
}
</style>