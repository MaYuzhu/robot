<template>
  <div>
    <HeaderTop :title="title"></HeaderTop>

  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'

  export default {
    data(){
      return{
        title:'生成报表 > 生成报表'
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
