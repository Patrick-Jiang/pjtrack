<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`"><span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click="createNewTag">Add new tag</Button>
    </div>
  </Layout>
</template>

<script lang="ts">


import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper.ts';

@Component({
      components: {Button},
      // computed: {
      //   tags() {
      //     return this.$store.state.tagList;
      //   }
      // }
    }
)
export default class Labels extends mixins(TagHelper) {
  beforeCreate() {
    this.$store.commit('fetchTags');
  }
  get tags() {
    return this.$store.state.tagList;
  }


  // createTag() {
  //   constants name = window.prompt('Please enter new tag name');
  //   if (name) {
  //     this.$store.commit('createTag', name);
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      width: 18px;
      height: 18px;
      color: #333;
      margin-right: 16px;
    }
  }
}

.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>