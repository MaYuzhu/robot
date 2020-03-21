<template>
	<div class="xunjian_wrap">
    <div>
      <p><span>巡检任务名称：</span><span>111</span></p>
      <p><span></span><span></span></p>
      <p><span>任务状态：</span><span>222</span></p>
    </div>
    <div>
      <p><span>巡检点总数:</span><span>333</span></p>
      <p><span>异常巡检点数:</span><span>444</span></p>
      <p><span>当前巡检点:</span><span>555</span></p>
    </div>
    <div>
      <p><span>预计巡检时间:</span><span>666</span></p>
      <p><span>巡检进度:</span><span>777</span></p>
      <p><span>已巡检点数:</span><span>888</span></p>
    </div>
	</div>
</template>

<script>
	export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .xunjian_wrap
    >div
      display flex
      justify-content space-around
      background #e3f2ee
      padding 8px
      overflow hidden
      box-sizing border-box
    >:nth-child(1)
      >p
        float left
        width 33%
        margin 0px
        box-sizing border-box
    >:nth-child(2),:nth-child(3)
      >p
        float left
        width 33%
        margin 0px
        box-sizing border-box

</style>
