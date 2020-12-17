<template>
  <div class="nav">
    <router-link to="/money">
      <svg >
        <use xlink:href="#money"></use>
      </svg>
      Tags</router-link>
    |
    <router-link to="/labels">Track</router-link>
    |
    <router-link to="/statistics">Statistics</router-link>
  </div>
</template>

<script lang="ts">
const  importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try{
  importAll(require.context('../assets/icons',true, /\.svg$/ ));
}
catch(error){
  console.log(error);
}


export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
  .nav {border: 1px solid red}
</style>