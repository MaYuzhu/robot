<template>
  <div class="systems_display_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="systems_content">
      <div class="left">
        <div class="left_top">机器人状态</div>
        <div class="left_content">
          <p>运行状态信息</p>
          <div class="yunxing_info">
            <div><p>机身温度: <span>0</span></p></div>
            <div><p>云台水平位置: <span>0</span></p></div>
            <div><p>运行速度: <span>0</span></p></div>
            <div><p>云台垂直位置: <span>0</span></p></div>
            <div><p>相机倍数: <span>0</span></p></div>
          </div>
          <p>通讯状态信息</p>
          <div class="tong_info">
            <div><p>无线基站: <span>0</span></p></div>
            <div><p>控制系统: <span>0</span></p></div>
            <div><p>可见光摄像: <span>0</span></p></div>
            <div><p>充电系统: <span>0</span></p></div>
            <div><p>红外摄像: <span>0</span></p></div>
          </div>
          <p>电池状态信息</p>
          <div class="dian_info">
            <div><p>当前电池电量: <span>0</span></p></div>
          </div>
          <p>机器人自身模块信息</p>
          <div class="mokuai_info">
            <div class="mokuai_info_li">
              <p>驱动模块</p>
              <div>
                <div><p>左轮: <span>0</span></p></div>
                <div><p>右轮: <span>0</span></p></div>
              </div>
            </div>
            <div class="mokuai_info_li">
              <p>电源模块</p>
              <div>
                <div><p>外供电源: <span>0</span></p></div>
                <div><p>充电状态: <span>0</span></p></div>
                <div><p>充电: <span>0</span></p></div>
              </div>
            </div>
            <div class="mokuai_info_li">
              <p>系统模块</p>
              <div>
                <div><p>运行行程: <span>0</span></p></div>
                <div><p>运行时间: <span>0</span></p></div>
                <div><p>巡检设备数量: <span>0</span></p></div>
                <div><p>发现缺陷数量: <span>0</span></p></div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="right">
        <div class="right_top">机器人控制</div>
        <div class="right_content">
          <p>运行状态信息</p>
          <div>
            <div><p>温度: <span>0</span></p></div>
            <div><p>湿度: <span>0</span></p></div>
            <div><p>风速: <span>0</span></p></div>
          </div>
          <p>控制状态信息</p>
          <div class="right_content_bottom">
            <div>
              <p>红外功能：</p>
              <el-switch disabled
                v-model="value_switch1"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>可见光功能：</p>
              <el-switch disabled
                v-model="value_switch2"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>雨刷：</p>
              <el-switch disabled
                v-model="value_switch3"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>避障功能：</p>
              <el-switch disabled
                v-model="value_switch4"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>车灯状态：</p>
              <el-switch disabled
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
              <el-switch disabled
                v-model="value_switch6"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>充电房(后门)：</p>
              <el-switch disabled
                v-model="value_switch7"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>机器人状态：</p>
              <el-switch disabled
                v-model="value_switch8"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
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
        title:'机器人信息查询 > 机器人状态显示',
        value_switch1:true,
        value_switch2:true,
        value_switch3:true,
        value_switch4:true,
        value_switch5:true,
        value_switch6:true,
        value_switch7:true,
        value_switch8:true,
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
      }
    },
    components: {
      HeaderTop,

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .systems_display_wrap
    background white
    .systems_content
      display flex
      height 100%
      .left,.right
        border 1px solid #cbeeca
        width 50%
        .left_top,.right_top
          height: 39px;
          font-size: 17px;
          line-height: 39px;
          text-align: center;
          background-color: #109cb4;
        .left_content
          height calc(100% - 39px)
          color #109cb4
          background white
          >p
            width: 100%;
            height: 31px;
            line-height: 31px;
            text-align: center;
            font-size: 15px;
            color: red;
            margin 10px auto 4px
          >div
            width 86%
            margin 0 auto
            padding: 6px 18px;
            border: 1px solid #109cb4;
            display flex
            flex-wrap wrap
          .yunxing_info,.dian_info
            >div
              width 50%
              margin 10px 0
          .tong_info
            >div
              width 33%
              margin 10px 0
          .mokuai_info
            display block
            .mokuai_info_li
              border-bottom 1px dashed #109cb4;
              >p
                color red
                text-align center
                margin 8px auto 4px
              >div
                display flex
                flex-wrap wrap
                >div
                  width 50%
                  margin 6px 0
        .right_content
          height calc(100% - 39px)
          color #109cb4
          background white
          >p
            width: 100%;
            height: 31px;
            line-height: 31px;
            text-align: center;
            font-size: 15px;
            color: red;
            margin 10px auto 4px
          >div
            width 86%
            margin 0 auto
            padding: 6px 18px;
            border: 1px solid #109cb4;
            >div
              margin 15px 0
          .right_content_bottom
            >div
              display flex
              align-items center
              margin 28px
              >p
                width 200px
                text-align right
          div>>>.el-switch__core
            width 80px!important
            height 20px
          div>>>.el-switch__core::after
            height 16px
            width 16px

</style>
