<template>
	<div>
    <HeaderTop :title="title"></HeaderTop>
    <XunjianTopBox></XunjianTopBox>
    <XunjianFindTool></XunjianFindTool>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="4000">
      </el-pagination>
    </div>
	</div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import XunjianFindTool from '../components/xunjianFindTool.vue'
	export default {
  	data(){
  		return{
  			title:'全面巡检 > 全面巡检',
        currentPage: 1,

      }
    },
    components: {
      HeaderTop,
      XunjianTopBox,
      XunjianFindTool
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
