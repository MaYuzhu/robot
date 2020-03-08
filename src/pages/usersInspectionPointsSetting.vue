<template>
  <div class="point_setting_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <XunjianTopBox></XunjianTopBox>
    <div class="point_setting_disable">
      <p>启用状态：</p>
      <el-select v-model="value" placeholder="请选择" size="mini">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="point_setting_tools">
      <el-input v-model="input" placeholder="请输入内容" style="width: 180px" size="mini"></el-input>
      <ul>
        <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li><img src="../../static/images/add.png" alt=""><span>添加</span></li>
        <li><img src="../../static/images/modify.png" alt=""><span>修改</span></li>
        <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
        <li><img src="../../static/images/enable.png" alt=""><span>启用</span></li>
        <li><img src="../../static/images/disable.png" alt=""><span>禁用</span></li>
        <li><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'

  export default {
    data(){
      return{
        title:'点位设置 > 巡检点位设置',
        options: [{
          value: '选项1',
          label: '启用'
        }, {
          value: '选项2',
          label: '禁用'
        }],
        value: '',
        input:''

      }
    },
    components: {
      HeaderTop,
      XunjianTopBox

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .point_setting_wrap
    .point_setting_disable
      height 30px
      display flex
      align-items center
      padding 0 0 0 70px
      p
        font-weight 600
        font-size 14px
    .point_setting_tools
      width 100%
      height 30px
      display flex
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      padding-left 10px
      box-sizing border-box
      ul
        display flex
        padding-left 5px
        li
          margin 0 15px
          display flex
          align-items center
          cursor pointer
          img
            width 16px
            height 16px
            margin-right 4px

</style>
