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
                <el-select v-model="alarm_after" placeholder="请选择" size="mini">
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
                <el-select v-model="interrupt_after" placeholder="请选择" size="mini">
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
                <!--oninput="if(value > 1 || value < 0 ){alert('请输入0~1之间的数值！')}"-->
                <p>机器人最高速度: </p>
                <el-input placeholder="请输入0~1之间的数值"
                    onblur="if(value > 1.0 || value < 0.0 ){alert('请输入0~1之间的数值！');value=0.5}"
                    type="number" v-model="body_speed" size="mini"></el-input>
                <span>m/s</span>
              </div>
              <div>
                <p>雷达报警距离: </p>
                <el-input v-model="alarm_distance" size="mini" type="number"
                          onblur="if(value > 5 || value < 0 ){alert('请输入0~5之间的数值！');value=3}"
                ></el-input>
                <span>m</span>
              </div>
              <div>
                <p>电池容量报警: </p>
                <el-input v-model="battery_capacity" size="mini" type="number"
                          onblur="if(value > 100 || value < 0 ){alert('请输入0~100之间的数值！');value=30}"
                ></el-input>
                <span>%</span>
              </div>
            </div>
            <div style="display: flex;justify-content: space-around;padding: 16px 10px;">
              <el-button @click="init" type="primary" icon="el-icon-refresh" size="mini">重置</el-button>
              <el-button @click="setOne" type="primary" icon="el-icon-success" size="mini">确定</el-button>
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
              <el-input v-model="x_x" size="mini" type="number"
                        onblur="if(value > 360 || value < 0 ){alert('请输入0~360之间的数值！');value=0}"></el-input>
              <p>Y:</p>
              <el-input v-model="y_y" size="mini"type="number"
                        onblur="if(value > 360 || value < 0 ){alert('请输入0~360之间的数值！');value=0}"></el-input>
            </div>
            <div style="border:1px dashed;border-left: none;border-right: none">
              <div>
                <p>云台水平偏移量: </p>
                <el-input v-model="yun_x" size="mini" type="number"
                          onblur="if(value > 360 || value < 0 ){alert('请输入0~360之间的数值！');value=0}"
                ></el-input>
                <p>轮子直径: </p>
                <el-input v-model="zhijing" size="mini" style="width:50px"
                          type="number"
                          onblur="if(value > 25 || value < 15 ){alert('请输入15~25之间的数值！')};value=20"></el-input>
                <span>cm</span>
              </div>
              <div>
                <p>云台垂直偏移量: </p>
                <el-input v-model="yun_y" size="mini"type="number"
                          onblur="if(value > 360 || value < 0 ){alert('请输入0~360之间的数值！');value=0}"></el-input>
                <p>轮子距中心距离: </p>
                <el-input v-model="zhongxin" size="mini" style="width:50px" type="number"
                          onblur="if(value > 30 || value < 20 ){alert('请输入20~30之间的数值！');value=25}"></el-input>
                <span>cm</span>
              </div>
            </div>
            <div style="display: flex;justify-content: space-around;padding: 16px 10px;">
              <el-button @click="init2" type="primary" icon="el-icon-refresh" size="mini">重置</el-button>
              <el-button @click="setTwo" type="primary" icon="el-icon-success" size="mini">确定</el-button>
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
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'机器人设置 > 机器人设置',
        options1: [
        	{
          value: '1',
          label: '自动返航'
        }, {
          value: '2',
          label: '待选1'
        }, {
          value: '3',
          label: '待选2'
        }],
        options2: [
          {
            value: '1',
            label: '自动返航'
          }, {
            value: '2',
            label: '待选1'
          }, {
            value: '3',
            label: '待选2'
          }],
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

        alarm_after: '1',
        interrupt_after: '1',
        body_speed:'',
        alarm_distance:'',
        battery_capacity:'',
        x_x:'',
        y_y:'',
        yun_x:'',
        yun_y:'',
        zhijing:'',
        zhongxin:'',
      }
    },
    mounted(){
      this.init()
      this.init2()
    },
    inject:['reload'],
    methods:{
      init(){
        let _this = this
        _this.ajax_api('get',url_api + '/robot-param' + '?&_t=' + new Date().getTime(),
          {irBaseRobotId:1,size:200,page:1,},
          true, function (res) {
            //console.log(res.data)
            let alarm_after = res.data.items.filter(item => {
              return item.name == 'alarm-after-execute'
            })
            let interrupt_after = res.data.items.filter(item => {
              return item.name == 'interrupt-after-execute'
            })
            let speed = res.data.items.filter(item => {
              return item.name == 'speed'
            })
            let alarm_distance = res.data.items.filter(item => {
              return item.name == 'alarm_distance'
            })
            let battery_capacity = res.data.items.filter(item => {
              return item.name == 'battery_capacity'
            })
            _this.alarm_after = alarm_after[0].value
            _this.interrupt_after = interrupt_after[0].value
            _this.body_speed = speed[0].value
            _this.alarm_distance = alarm_distance[0].value
            _this.battery_capacity = battery_capacity[0].value

          })
      },
      init2(){
        let _this = this
        _this.ajax_api('get',url_api + '/robot-param' + '?&_t=' + new Date().getTime(),
          {irBaseRobotId:1,size:200,page:1,},
          true, function (res) {
            //console.log(res.data)
            let x_x = res.data.items.filter(item => {
              return item.name == 'x-value'
            })
            let y_y = res.data.items.filter(item => {
              return item.name == 'y-value'
            })
            let yun_x = res.data.items.filter(item => {
              return item.name == 'Horizonta-offset'
            })
            let yun_y = res.data.items.filter(item => {
              return item.name == 'Vertical-offset'
            })
            let zhijing = res.data.items.filter(item => {
              return item.name == 'diameter'
            })
            let zhongxin = res.data.items.filter(item => {
              return item.name == 'center-distance'
            })

            _this.x_x = x_x[0].value
            _this.y_y = y_y[0].value
            _this.yun_x = yun_x[0].value
            _this.yun_y = yun_y[0].value
            _this.zhijing = zhijing[0].value
            _this.zhongxin = zhongxin[0].value

          })
      },
      setOne(){
        let _this = this
        /*{
          "irBaseRobotId": 0,
          "robotParamRequests": [
          {
            "displayName": "string",
            "name": "string",
            "value": "string"
          }
        ],
          "type": "string"
        }*/
        let setData = {
          irBaseRobotId:1,
          robotParamRequests:[],
          type: 2
        }
        setData.robotParamRequests.push({
          name:'alarm-after-execute',
          displayName: "告警后执行机制",
          value: _this.alarm_after
        })
        setData.robotParamRequests.push({
          name:'interrupt-after-execute',
          displayName: "中断后执行机制",
          value: _this.interrupt_after
        })
        setData.robotParamRequests.push({
          name:'speed',
          displayName: "机器人行进速度",
          value: _this.body_speed
        })
        setData.robotParamRequests.push({
          name:'alarm_distance',
          displayName: "雷达报警距离",
          value: _this.alarm_distance
        })
        setData.robotParamRequests.push({
          name:'battery_capacity',
          displayName: "电池容量报警",
          value: _this.battery_capacity
        })

        setData.robotParamRequests.push({
          name:'x-value',
          displayName: "x",
          value: _this.x_x
        })
        setData.robotParamRequests.push({
          name:'y-value',
          displayName: "y",
          value: _this.y_y
        })
        setData.robotParamRequests.push({
          name:'Horizonta-offset',
          displayName: "云台水平偏移量",
          value: _this.yun_x
        })
        setData.robotParamRequests.push({
          name:'Vertical-offset',
          displayName: "云台垂直偏移量",
          value: _this.yun_y
        })
        //console.log(setData)
        _this.ajax_api('put',url_api + '/robot-param/batch',
          setData,
          true, function (res) {
        	  if(res.code == 200){
              _this.$message({
                message: '设置成功',
                type: 'success',
              });
              _this.reload();
            }else {
              _this.$message({
                message: '设置失败，请稍后重试',
              });
            }
            //console.log(res.data)
          })
      },
      setTwo(){
        let _this = this
        let setData = {
          irBaseRobotId:1,
          robotParamRequests:[],
          type: '1'
        }
        setData.robotParamRequests.push({
          name:'x-value',
          displayName: "x",
          value: _this.x_x
        })
        setData.robotParamRequests.push({
          name:'y-value',
          displayName: "y",
          value: _this.y_y
        })
        setData.robotParamRequests.push({
          name:'Horizonta-offset',
          displayName: "云台水平偏移量",
          value: _this.yun_x
        })
        setData.robotParamRequests.push({
          name:'Vertical-offset',
          displayName: "云台垂直偏移量",
          value: _this.yun_y
        })

        setData.robotParamRequests.push({
          name:'diameter',
          displayName: "轮子直径",
          value: _this.zhijing
        })
        setData.robotParamRequests.push({
          name:'center-distance',
          displayName: "轮子中心距离",
          value: _this.zhongxin
        })
        _this.ajax_api('put',url_api + '/robot-param/batch',
          setData,
          true, function (res) {
            if(res.code == 200){
              _this.$message({
                message: '设置成功',
                type: 'success',
              });
            }else {
              _this.$message({
                message: '设置失败，请稍后重试',
              });
            }
            //console.log(res.data)
          })
      },
    },
    components: {
      HeaderTop,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .robot_setup_wrap
    height 100%
    min-height 820px
    background #f9f9f9
    .robot_setup_content
      display flex
      height calc(100% - 90px)
      min-height 720px
      .left ,.right
        float left
        width 50%
        height 700px
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
                height 30px
                display flex
                align-items center
                margin 14px auto 14px 40px
                >p
                  float left
                  width 120px
                  text-align right
                .el-input
                  float left
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
              height 50px
              >p
                margin-left 10px
                float left
                text-align right
              >div
                float left
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
              float left
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

  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /deep/ input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
