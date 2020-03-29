<template>
  <div class="task_show_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div style="display: flex">
      <div class="task_show_wrap_left">
        <div class="task_show_top">
          <p style="float: left">任务执行时间：</p>
          <el-date-picker size="mini" :picker-options="pickerOptions" style="float: left"
            v-model="value_month"
            type="month"
            placeholder="选择月">
          </el-date-picker>
          <div class="task_show_find"><img src="../../static/images/query.png" alt=""><span>查询</span></div>
        </div>
        <div>
          <el-calendar v-model="value">
          </el-calendar>
        </div>
        <div style="background: #ecf6fa;padding: 5px">
          <span style="margin-right: 22px;">备注：</span>
          <span style="margin-right: 22px;color:rgb(60, 179, 113)">执行完成：绿色</span>
          <span style="margin-right: 22px;color: rgb(210, 105, 30);">中途终止：棕色</span>
          <span style="margin-right: 22px;color: rgb(0, 255, 255);">中途暂停：青色</span>
          <span style="margin-right: 22px;color: rgb(255, 69, 0);">正在执行：红色</span>
          <span style="margin-right: 22px;color: rgb(65, 105, 225);">等待执行：蓝色</span>
          <span style="margin-right: 22px;color: rgb(255, 215, 0);">超期：黄色</span>
          <span style="margin-right: 22px;color: rgb(218, 112, 214);">超时：紫色</span>
        </div>
      </div>
      <div class="task_show_wrap_right">
        <div style="display: flex;padding:10px 14px 4px">
          <p style="width: 90px;font-weight: 600;float: left">任务状态：</p>
          <div class="task_show_right_zhuangtai">
            <el-checkbox v-model="checked1">已执行</el-checkbox>
            <el-checkbox v-model="checked2">终止</el-checkbox>
            <el-checkbox v-model="checked3">暂停</el-checkbox>
            <el-checkbox v-model="checked4">正在执行</el-checkbox>
            <el-checkbox v-model="checked5">未执行</el-checkbox>
            <el-checkbox v-model="checked6">超期</el-checkbox>
            <el-checkbox v-model="checked7">超时</el-checkbox>
          </div>
        </div>
        <div style="display: flex;align-items: center;padding:2px 14px 4px;overflow: hidden">
          <p style="width: 90px;font-weight: 600;float: left">开始时间：</p>
          <el-date-picker style="float: left"
            v-model="value1" size="mini"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <p style="width: 90px;font-weight: 600;margin-left: 20px;float: left">结束时间：</p>
          <el-date-picker style="float: left"
            v-model="value1" size="mini"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div style="display: flex;align-items: center;padding:2px 14px 14px;border-bottom:2px solid #90e8c6;overflow: hidden">
          <p style="width: 90px;font-weight: 600;float: left">任务名称：</p>
          <el-input v-model="input" size="mini" placeholder="请输入内容" style="float: left"></el-input>
        </div>
        <div>
          <ul>
            <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
            <li><img src="../../static/images/add.png" alt=""><span>添加</span></li>
            <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
          </ul>
        </div>
        <div>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            size="mini">
            <el-table-column
              prop="date"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              prop="address"
              label="任务名称"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="执行时间"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="任务状态"
              >
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              width="50">
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import XunjianTopBox from '../components/xunjianTopBox.vue'
  import XunjianFindTool from '../components/xunjianFindTool.vue'
  import menuBottom from '../components/menuBottom.vue'
  export default {
    data(){
      return{
        title:'任务展示 > 任务展示',
        value_month:'',
        pickerOptions: {
          disabledDate: (time) => {
            return this.dealDisabledDate(time);
          }
        },
        value: new Date(),
        checked1:false,
        checked2:false,
        checked3:false,
        checked4:false,
        checked5:false,
        checked6:false,
        checked7:false,
        value1:'',
        input:'',
        tableData: [{
          date: '1',
          name: '2',
          address: '3',
          q:'1231',
          w:'123',
          e:'123'
        }]
      }
    },
    components: {
      HeaderTop,
      menuBottom
    },
    methods:{
      dealDisabledDate(time) {
        var times = Date.now()
        return time.getTime() > times;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .task_show_wrap
    .task_show_wrap_left
      width 60%
      float left
      .task_show_top
        height 30px
        background #cae7ee\0
        background: linear-gradient(#e3f2ee,#cae7ee);
        border-top: 1px solid #cae7ee;
        padding-left: 5px;
        display flex
        align-items center
        .el-date-editor
          float left
          width 150px
          margin 0 20px
        .task_show_find
          float left
          display flex
          align-items center
          img
            width 16px
            height 16px
            margin-right 4px
    .task_show_wrap_right
      width 40%
      border 2px solid #90e8c6
      float left
      box-sizing border-box
      .el-date-editor
        width 130px
      >div
        .task_show_right_zhuangtai
          width calc(100% - 90px)
        .el-checkbox
          margin-bottom 8px
        .el-input
          width 130px
        ul
          display flex
          padding 6px 14px
          li
            float left
            margin-right 30px
            display flex
            align-items center
            cursor pointer
            img
              width 16px
              height 16px
              margin-right 4px

</style>
