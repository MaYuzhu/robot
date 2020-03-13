<template>
  <div class="robot_setup_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="robot_setup_content">
      <div class="left">
        <p class="left_title">机器人参数设置</p>
        <div class="left_content">
          <p>机器人通信中断及告警设置</p>
          <div>
            <div>
              <div>
                <p>告警后执行机制: </p>
                <el-select v-model="value1" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <p>中断后执行机制: </p>
                <el-select v-model="value2" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>

            </div>
            <div style="border:1px dashed;border-left: none;border-right: none">
              <div>
                <p>机器人行进速度: </p>
                <el-input size="mini"></el-input>
                <span>m/s</span>
              </div>
              <div>
                <p>雷达报警距离: </p>
                <el-input size="mini"></el-input>
                <span>m</span>
              </div>
              <div>
                <p>电池容量报警: </p>
                <el-input size="mini"></el-input>
                <span>%</span>
              </div>
            </div>
            <div style="display: flex;justify-content: space-around;padding: 16px 10px;">
              <el-button type="primary" icon="el-icon-refresh" size="mini">重置</el-button>
              <el-button type="primary" icon="el-icon-success" size="mini">确定</el-button>
            </div>
          </div>
          <p>云控制台</p>
          <div>
            <p style="height:44px;
              line-height:44px;
              text-align: center;
              font-size: 16px;
              color: #f00">云台初始化位置</p>
            <div class="yun_item">
              <p>X:</p>
              <el-input size="mini"></el-input>
              <p>Y:</p>
              <el-input size="mini"></el-input>
            </div>
            <div style="border:1px dashed;border-left: none;border-right: none">
              <div>
                <p>云台水平偏移量: </p>
                <el-input size="mini"></el-input>
              </div>
              <div>
                <p>云台垂直偏移量: </p>
                <el-input size="mini"></el-input>
              </div>
            </div>
            <div style="display: flex;justify-content: space-around;padding: 16px 10px;">
              <el-button type="primary" icon="el-icon-refresh" size="mini">重置</el-button>
              <el-button type="primary" icon="el-icon-success" size="mini">确定</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <p class="right_title">机器人控制</p>
        <div class="right_content">
          <div>
            <p>模式控制：</p>
            <el-select v-model="value3" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <p>红外功能：</p>
            <el-switch
              v-model="value_switch1"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
          <div>
            <p>可见光功能：</p>
            <el-switch
              v-model="value_switch2"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
          <div>
            <p>雨刷功能：</p>
            <el-switch
              v-model="value_switch3"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
          <div>
            <p>避障功能：</p>
            <el-switch
              v-model="value_switch4"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
          <div>
            <p>车灯状态：</p>
            <el-switch
              v-model="value_switch5"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
          <div>
            <p>
              <el-select v-model="value5" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </p>
            <el-switch
              v-model="value_switch6"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
          <div>
            <p>充电房：</p>
            <el-switch
              v-model="value_switch7"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
          <div>
            <p>机器人状态：</p>
            <el-switch
              v-model="value_switch8"
              active-text="开"
              inactive-text="关">
            </el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'

  export default {
    data(){
      return{
        title:'机器人设置 > 机器人设置',
        options1: [
        	{
          value: '选项1',
          label: '自动返航'
        }, {
          value: '选项2',
          label: '待选1'
        }, {
          value: '选项3',
          label: '待选2'
        }],
        value1: '',
        options2: [
        	{
          value: '选项1',
          label: '自动返航'
        }, {
          value: '选项2',
          label: '待选1'
        }, {
          value: '选项3',
          label: '待选2'
        }],
        value2: '',
        options3: [
        	{
          value: '选项1',
          label: '任务模式'
        }, {
          value: '选项2',
          label: '待定2'
        }, {
          value: '选项3',
          label: '待定3'
        }],
        value3: '',
        options4: [
        	{
          value: '选项1',
          label: '自动返航'
        }, {
          value: '选项2',
          label: '待选1'
        }, {
          value: '选项3',
          label: '待选2'
        }],
        value4: '',
        options5: [
          {
            value: '选项1',
            label: '充电室前门'
          }, {
            value: '选项2',
            label: '待选1'
          }, {
            value: '选项3',
            label: '待选2'
          }],
        value5: '',
        value_switch1:true,
        value_switch2:true,
        value_switch3:true,
        value_switch4:true,
        value_switch5:true,
        value_switch6:true,
        value_switch7:true,
        value_switch8:true,

      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .robot_setup_wrap
    min-height 100%
    background #f9f9f9
    .robot_setup_content
      display flex
      min-height 100%
      .left ,.right
        width 50%
        .left_title ,.right_title
          height 50px
          font-size 20px
          font-weight 500
          background #109cb4
          text-align center
          line-height 50px
        .left_content
          border 1px solid silver
          height 100%
          background #f9f9f9
          >p
            height 44px
            line-height 44px
            text-align center
            font-size 18px
            color #f00
          >div
            border 1px solid #109cb4
            width 90%
            margin 0 auto
            font-size 14px
            color #109cb4
            >div
              >div
                display flex
                align-items center
                margin 14px auto 14px 40px
                >p
                  width 120px
                  text-align right
                .el-input
                  width 200px
                div>>>
                  .el-input__inner
                    background transparent
                    margin-left 3px
                >span
                  margin-left 4px
            .yun_item
              display flex
              align-items center
              justify-content center
              >p
                text-align right
              >div
                width 180px
                margin 10px 20px 10px
              div>>>
                .el-input__inner
                  background transparent
                  margin-left 3px
        .right_content
          border 1px solid silver
          min-height 100%
          background #f9f9f9
          >div
            display flex
            align-items center
            margin 44px auto
            >p
              font-size 14px
              color #109cb4
              width 120px
              margin-left 150px
              text-align right
            div>>>.el-switch__core
              width 80px!important
              height 20px
            div>>>.el-switch__core::after
              height 16px
              width 16px

</style>
