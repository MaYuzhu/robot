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
        title:'点位设置 > 巡检点位设置'
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
