<template>
	<div>
    <HeaderTop :title="title"></HeaderTop>
    <div style="width: 65%;background: #e9e9e9;display: flex">
      <p style="line-height: 36px;margin: 0 18px;">机器人列表：</p>
      <el-select v-model="value" placeholder="请选择" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="width: 65%;background:lavender">
      <XunjianContent></XunjianContent>
    </div>

    <img src="../../static/aaa.jpg" style="width: 100%" alt="">
    <TabsBottom></TabsBottom>

	</div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import TabsBottom from '../components/tabsBottom.vue'
  import XunjianContent from '../components/xunjianContent.vue'
	export default {
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent
    },
    data() {
      return {
      	title:'机器人管理 > 机器人管理',
        options: [{
          value: '选项1',
          label: '机器人一号'
        }, {
          value: '选项2',
          label: '机器人二号'
        }],
        value: '选项1'
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
