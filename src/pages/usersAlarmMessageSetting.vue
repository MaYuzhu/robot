<template>
  <div class="message_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="message_content">
      <p>设置是否接收报警消息提示</p>
      <el-checkbox border size="medium" :indeterminate="isIndeterminate"
                   v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedAlarm" @change="handleCheckedAlarmChange">
        <el-checkbox size="medium" border v-for="item in alarmTypes"
                     :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>

      <el-button type="primary" @click="setAlarmList"
                 style="margin-top:24px;padding:10px 28px">保 存</el-button>
    </div>

    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  const cityOptions = [
    {id:'0',name:'遥控信号故障报警'},
    {id:'1',name:'低电量报警提示'},
    {id:'2',name:'驱动模块故障报警'},
    {id:'3',name:'检测设备异常报警'},
    {id:'4',name:'位置偏航报警'},
    {id:'5',name:'三项温差报警'},
    {id:'6',name:'热缺陷报警'},
    {id:'7',name:'敞开式仪表越限报警'},
    {id:'8',name:'油位计异常报警'},
  ];
  export default {
    inject:['reload'],
    data(){
      return{
        title:'告警设置 > 告警消息订阅设置',

        checkAll: false,
        checkedAlarm: [],
        alarmTypes: cityOptions,
        isIndeterminate: true
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        let _this = this

        _this.ajax_api('get',url_api + '/robot-param' + '?&_t=' + new Date().getTime(),
          {irBaseRobotId:1,size:200,page:1,},
          true, function (res) {
            let alarm_message = res.data.items.filter(item => {
              return item.name == 'alarm-message-setting'
            })
            console.log(res)
            let alarm_arr = alarm_message[0].value.split(',')
            _this.checkedAlarm = alarm_arr
            console.log(alarm_arr)
            _this.checkAll = _this.checkedAlarm.length === _this.alarmTypes.length;
            _this.isIndeterminate = _this.checkedAlarm.length > 0 && _this.checkedAlarm.length < _this.alarmTypes.length;
          })
      },
      handleCheckAllChange(val) {
        let _this = this
        let idArr = []
        if(val){
          for(let i=0;i<cityOptions.length;i++){
            idArr.push(cityOptions[i].id)
          }
        }
        _this.checkedAlarm = idArr;
        _this.isIndeterminate = false;
      },
      handleCheckedAlarmChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.alarmTypes.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.alarmTypes.length;
      },

      setAlarmList(){
        let _this = this
        let setData = {
          irBaseRobotId:1,
          robotParamRequests:[],
          type: 9
        }
        setData.robotParamRequests.push({
          name:'alarm-message-setting',
          displayName: "告警消息订阅设置",
          value: _this.checkedAlarm.toString()
        })

        console.log(setData)
        _this.ajax_api('put',url_api + '/robot-param/batch',
          setData,
          true, function (res) {
            //console.log(res)
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
  .message_wrap
    height 100%
    .message_content
      height calc(100% - 90px)
      padding 50px
      box-sizing border-box
      p
        margin 30px 0
        font-size 18px
      .el-checkbox-group
        padding 8px 0
        label
          width 20%
          margin 10px 20px 10px 0


</style>
