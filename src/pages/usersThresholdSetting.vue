<template>
  <div class="threshold_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="threshold_top">
      <div class="top_left">
        <el-input v-model="input" placeholder="请输入内容" style="width: 130px;float: left" size="mini"></el-input>
        <ul>
          <li @click="queryTree"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
          <li @click="resetTree"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        </ul>
      </div>
      <div class="top_right">
        <p>设备名称：</p>
        <el-input v-model="input2" placeholder="请输入内容" style="width: 180px;float: left" size="mini"></el-input>
        <p>识别类型：</p>
        <el-input v-model="input3" placeholder="请输入内容" style="width: 180px;float: left" size="mini"></el-input>
        <ul>
          <li @click="saveAll"><img src="../../static/images/save.png" alt=""><span>保存</span></li>
          <li @click="resetAll"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        </ul>
      </div>
    </div>
    <div class="threshold_content">
      <div class="content_left">
        <devTreeNoCheck @childKey="childKey" :toTreeData="toTreeData"></devTreeNoCheck>
      </div>
      <div class="content_right">
        <div class="alarm_box">
          <p>
            <span class="title">超温报警</span>
            <span class="title_select">是否使能：</span>
            <el-select v-model="value_chao_neng" placeholder="请选择" size="mini" style="width: 60px">
              <el-option
                v-for="item in options_chao_neng"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">限值显示样式：</span>
            <el-select v-model="value_chao_num" placeholder="请选择" size="mini" style="width: 80px">
              <el-option
                v-for="item in options_chao_num"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">致热类型：</span><span></span>
          </p>
          <div class="tool">
            <ul>
              <li @click="addChao(1)"><img src="../../static/images/add.png" alt=""><span>新增</span></li>
              <li @click="delChao"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
              <li @click="resetItem(1)"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
            </ul>
            <el-table highlight-current-row ref="singleChao"  class="table_box"
                      :data="tableDataChao" @current-change="clickChangeChao"
                      border
                      style="width: 100%;">
              <el-table-column align="center"
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column align="center"
                prop="alarmName"
                label="报警名称">
              </el-table-column>
              <el-table-column align="center"
                prop="account" :formatter="up_down_show"
                label="上限/下限"
                width="150">
              </el-table-column>
              <el-table-column align="center"
                prop="limitValue"
                label="限值">
              </el-table-column>
              <el-table-column align="center"
                prop="name" :formatter="formatStatus"
                label="等级">
              </el-table-column>

            </el-table>
          </div>
          <p>
            <span class="title">温升报警</span>
            <span class="title_select">是否使能：</span>
            <el-select v-model="value_wen_neng" placeholder="请选择" size="mini" style="width: 60px">
              <el-option
                v-for="item in options_chao_neng"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">限值显示样式：</span>
            <el-select v-model="value_wen_num" placeholder="请选择" size="mini" style="width: 80px">
              <el-option
                v-for="item in options_chao_num"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </p>
          <div class="tool">
            <ul>
              <li @click="addChao(2)"><img src="../../static/images/add.png" alt=""><span>新增</span></li>
              <li @click="delWen"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
              <li @click="resetItem(2)"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
            </ul>
            <el-table highlight-current-row ref="singleChao" class="table_box"
                      :data="tableDataWen" @current-change="clickChangeWen"
                      border
                      style="width: 100%">
              <el-table-column align="center"
                               type="index"
                               label="序号"
                               width="50">
              </el-table-column>
              <el-table-column align="center"
                               prop="alarmName"
                               label="报警名称">
              </el-table-column>
              <el-table-column align="center"
                               prop="account" :formatter="up_down_show"
                               label="上限/下限"
                               width="150">
              </el-table-column>
              <el-table-column align="center"
                               prop="limitValue"
                               label="限值">
              </el-table-column>
              <el-table-column align="center"
                               prop="name" :formatter="formatStatus"
                               label="等级">
              </el-table-column>

            </el-table>
          </div>
          <p>
            <span class="title">三相对比报警</span>
            <span class="title_select">是否使能：</span>
            <el-select v-model="value_dui_neng" placeholder="请选择" size="mini" style="width: 60px">
              <el-option
                v-for="item in options_chao_neng"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">限值显示样式：</span>
            <el-select v-model="value_dui_num" placeholder="请选择" size="mini" style="width: 80px">
              <el-option
                v-for="item in options_chao_num"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">启用环境温度：</span>
            <el-select v-model="value_dui_wen" placeholder="请选择" size="mini" style="width: 60px">
              <el-option
                v-for="item in options_chao_neng"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span>单相最低温度</span>
            <el-input v-model="dui_input1" placeholder=""
                      style="display: inline-block;width: 60px" size="mini"></el-input>
            <span>单相最低温升</span>
            <el-input v-model="dui_input2" placeholder=""
                      style="display: inline-block;width: 60px"size="mini"></el-input>

          </p>
          <div class="tool">
            <ul>
              <li @click="addChao(3)"><img src="../../static/images/add.png" alt=""><span>新增</span></li>
              <li @click="delDui"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
              <li @click="resetItem(3)"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
            </ul>
            <el-table highlight-current-row ref="singleChao" class="table_box"
                      :data="tableDataDui" @current-change="clickChangeDui"
                      border
                      style="width: 100%">
              <el-table-column align="center"
                               type="index"
                               label="序号"
                               width="50">
              </el-table-column>
              <el-table-column align="center"
                               prop="alarmName"
                               label="报警名称">
              </el-table-column>
              <el-table-column align="center"
                               prop="account" :formatter="up_down_show"
                               label="上限/下限"
                               width="150">
              </el-table-column>
              <el-table-column align="center"
                               prop="limitValue"
                               label="限值">
              </el-table-column>
              <el-table-column align="center"
                               prop="name" :formatter="formatStatus"
                               label="等级">
              </el-table-column>

            </el-table>
          </div>
          <p>
            <span class="title">三相温差报警</span>
            <span class="title_select">是否使能：</span>
            <el-select v-model="value_cha_neng" placeholder="请选择" size="mini" style="width: 80px">
              <el-option
                v-for="item in options_chao_neng"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">限值显示样式：</span>
            <el-select v-model="value_cha_num" placeholder="请选择" size="mini" style="width: 100px">
              <el-option
                v-for="item in options_chao_num"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">启用环境温度：</span>
            <el-select v-model="value_cha_wen" placeholder="请选择" size="mini" style="width: 60px">
              <el-option
                v-for="item in options_chao_neng"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="title_select">设备温度参考体：</span>
            <el-select v-model="value_cha_ti" placeholder="请选择" size="mini" style="width: 130px">
              <el-option
                v-for="item in options_cha_ti"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <div class="tool">
            <ul>
              <li @click="addChao(4)"><img src="../../static/images/add.png" alt=""><span>新增</span></li>
              <li @click="delCha"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
              <li @click="resetItem(4)"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
            </ul>
            <el-table highlight-current-row ref="singleChao" class="table_box"
                      :data="tableDataCha" @current-change="clickChangeCha"
                      border
                      style="width: 100%">
              <el-table-column align="center"
                               type="index"
                               label="序号"
                               width="50">
              </el-table-column>
              <el-table-column align="center"
                               prop="alarmName"
                               label="报警名称">
              </el-table-column>
              <el-table-column align="center"
                               prop="account" :formatter="up_down_show"
                               label="上限/下限"
                               width="150">
              </el-table-column>
              <el-table-column align="center"
                               prop="limitValue"
                               label="限值">
              </el-table-column>
              <el-table-column align="center"
                               prop="name" :formatter="formatStatus"
                               label="等级">
              </el-table-column>

            </el-table>
          </div>

        </div>
      </div>
    </div>
    <el-dialog title="新增告警设置" :visible.sync="dialogVisibleAddAlarm">
      <div class="dialog_content">
        <div class="input_wrap">
          <p>报警名称：</p>
          <el-input size="mini" v-model="nameChao"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>限制类型：</p>
          <el-select v-model="typeChao" placeholder="请选择" size="mini" style="width: 80px">
            <el-option
              v-for="item in options_chao_type"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>限制数值：</p>
          <el-input size="mini" v-model="valueChao"></el-input>
          <span class="must-mark"></span>
        </div>
        <div class="input_wrap">
          <p>告警等级：</p>
          <el-select v-model="levelChao" placeholder="请选择" size="mini" style="width: 80px">
            <el-option
              v-for="item in options_chao_level"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span class="must-mark"></span>
        </div>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAddAlarm = false">取 消</el-button>
        <el-button type="primary" @click="addAlarmChaoList">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisibleDelSave" class="del_user">
      <div class="dialog_content" style="height: 144px;font-weight: 600;font-size: 16px;line-height: 30px">
        <p>{{message1}}</p>
        <p>{{message2}}</p>
        <p>{{message3}}</p>
        <p>{{message4}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleDelSave = false">确  定</el-button>
      </span>
    </el-dialog>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import devTreeNoCheck from '../components/devTreeNoCheck.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'告警设置 > 告警阈值设置',
        input:'',
        input2:'',
        input3:'',
        options_chao_neng: [
        	{
            value: '1',
            label: '是'
          }, {
            value: '0',
            label: '否'
          }
        ],
        options_chao_num: [
          {
            value: '1',
            label: '数值'
          }, {
            value: '2',
            label: '百分比'
          }
        ],
        options_cha_ti: [
          {
            value: '1',
            label: '三相最低温度'
          }, {
            value: '2',
            label: '三相最低温度2'
          }
        ],
        options_chao_type:[
          {
            value: '1',
            label: '上限'
          }, {
            value: '2',
            label: '下限'
          }
        ],
        options_chao_level:[
          {
            value: '1',
            label: '预警'
          }, {
            value: '2',
            label: '一般告警'
          },
          {
            value: '3',
            label: '严重告警'
          }, {
            value: '4',
            label: '危险告警'
          }
        ],

        value_chao_neng: '1',
        value_chao_num: '1',
        value_wen_neng:'0',
        value_wen_num: '2',
        value_dui_neng:'0',
        value_dui_num:'1',
        value_dui_wen:'1',
        dui_input1:'20',
        dui_input2:'10',
        value_cha_neng: '1',
        value_cha_num: '1',
        value_cha_wen:'1',
        value_cha_ti:'1',

        irProjPointId:'',
        irProjPointName:'',

        tableDataChao:[],
        tableDataWen:[],
        tableDataDui:[],
        tableDataCha:[],
        tableDataChaoOld:[],
        tableDataWenOld:[],
        tableDataDuiOld:[],
        tableDataChaOld:[],

        alarmData:{
          pageSize:1000
        },
        dialogVisibleAddAlarm:false,
        irBaseAlarmTypeId:'',

        nameChao:'',
        typeChao:'1',
        valueChao:'',
        levelChao:'1',

        myIdChao:0,
        chaoId :'',
        wenId:'',
        duiId:'',
        chaId:'',
        dialogVisibleDelSave:false,
        message1:'',
        message2:'',
        message3:'',
        message4:'',

        toTreeData:{},
      }
    },
    mounted(){
      //this.getAlarmData()
    },
    methods:{
      getAlarmDataOld(){
        let _this = this
        _this.alarmData.irProjPointId = _this.irProjPointId
        _this.ajax_api('get',url_api + '/point-alarm-setting',_this.alarmData,true,function (res) {
          console.log(res.data)
          if(!res.data.items.length<0){
            return
          }
          let result = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 1
          })
          //_this.tableDataChao = result
          _this.tableDataChaoOld = result

          let result2 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 2
          })
          //_this.tableDataWen = result2
          _this.tableDataWenOld = result2

          let result3 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 3
          })
          //_this.tableDataDui = result3
          _this.tableDataDuiOld = result3

          let result4 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 4
          })
          //_this.tableDataCha = result4
          _this.tableDataChaOld = result4
          //console.log(result)
        })
      },
    	getAlarmData(){
    		let _this = this
        _this.alarmData.irProjPointId = _this.irProjPointId
        _this.ajax_api('get',url_api + '/point-alarm-setting',_this.alarmData,true,function (res) {
          //console.log(res.data)
          if(!res.data.items.length<0){
            return
          }
          let result = res.data.items.filter(item => {
          	return item.irBaseAlarmTypeId == 1
          })
          _this.tableDataChao = result

          let result2 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 2
          })
          _this.tableDataWen = result2

          let result3 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 3
          })
          _this.tableDataDui = result3

          let result4 = res.data.items.filter(item => {
            return item.irBaseAlarmTypeId == 4
          })
          _this.tableDataCha = result4
          //console.log(result)
        })
      },
      formatStatus(row, column){
    		let alarm_level
        switch (row.alarmLevel) {
          case 1:
            alarm_level = "预警";
            break;
          case 2:
            alarm_level = "一般告警";
            break;
          case 3:
            alarm_level = "严重告警";
            break;
          case 4:
            alarm_level = "危险告警";
            break;
        }
        return alarm_level
      },
      up_down_show(row, column){
      	let up_down
      	if(row.upOrDown==1){
          up_down = '上限'
        }else {
          up_down = '下限'
        }
        return up_down
      },
      addChao(x){
        this.nameChao = ''
        this.typeChao = '1'
        this.valueChao = ''
        this.levelChao = '1'
      	this.irBaseAlarmTypeId = x
      	this.dialogVisibleAddAlarm = true
        this.myIdChao++
      },
      delChao(){
        let _this = this
        if(_this.chaoId){
          _this.tableDataChao = _this.tableDataChao.filter(item => {
            return item.id != _this.chaoId
          })
        }else {
          _this.$message({
            message: '请选择',
          });
          return
        }
      },
      delWen(){
        let _this = this
        if(_this.wenId){
          _this.tableDataWen = _this.tableDataWen.filter(item => {
            return item.id != _this.wenId
          })
        }else {
          _this.$message({
            message: '请选择',
          });
          return
        }
      },
      delDui(){
        let _this = this
        if(_this.duiId){
          _this.tableDataDui = _this.tableDataDui.filter(item => {
            return item.id != _this.duiId
          })
        }else {
          _this.$message({
            message: '请选择',
          });
          return
        }
      },
      delCha(){
        let _this = this
        if(_this.chaId){
          _this.tableDataCha = _this.tableDataCha.filter(item => {
            return item.id != _this.chaId
          })
        }else {
          _this.$message({
            message: '请选择',
          });
          return
        }
      },
      resetItem(x){
      	let _this = this
      	if(x==1){
          _this.tableDataChao = _this.tableDataChaoOld
        }else if(x==2){
          _this.tableDataWen = _this.tableDataWenOld
        }
        else if(x==3){
          _this.tableDataDui = _this.tableDataDuiOld
        }else if(x==4){
          _this.tableDataCha = _this.tableDataChaOld
        }
      },
      resetAll(){
        let _this = this
        _this.tableDataChao = _this.tableDataChaoOld
        _this.tableDataWen = _this.tableDataWenOld
        _this.tableDataDui = _this.tableDataDuiOld
        _this.tableDataCha = _this.tableDataChaOld
      },
      addAlarmChaoList(){
        /*{
          alarmLevel: "4",
          alarmName: "test_kaiguan4",
          irBaseAlarmTypeId: 2,
          isEffective: "1",
          isOpenEnvironmentTemp: "0",
          limitValue: 12.4,
          referenceTemp: 0,
          upOrDown: "1",
          valueType: "1"
        }*/
        let _this = this

        if(_this.irBaseAlarmTypeId==1){
          let item_chao = {
            alarmLevel: _this.levelChao*1,
            alarmName: _this.nameChao,
            irBaseAlarmTypeId: _this.irBaseAlarmTypeId,
            limitValue: _this.valueChao*1,
            upOrDown: _this.typeChao,

            isEffective: _this.value_chao_neng,
            //isOpenEnvironmentTemp: "0",
            //referenceTemp: 0,
            valueType: _this.value_chao_num,
            id:'my'+_this.myIdChao
          }
          _this.tableDataChao.push(item_chao)
        }else if(_this.irBaseAlarmTypeId==2){
          let item_chao = {
            alarmLevel: _this.levelChao*1,
            alarmName: _this.nameChao,
            irBaseAlarmTypeId: _this.irBaseAlarmTypeId,
            limitValue: _this.valueChao*1,
            upOrDown: _this.typeChao,

            isEffective: _this.value_wen_neng,
            //isOpenEnvironmentTemp: "0",
            //referenceTemp: 0,
            valueType: _this.value_wen_num,
            id:'my'+_this.myIdChao
          }
          _this.tableDataWen.push(item_chao)
        }else if(_this.irBaseAlarmTypeId==3){
          let item_chao = {
            alarmLevel: _this.levelChao*1,
            alarmName: _this.nameChao,
            irBaseAlarmTypeId: _this.irBaseAlarmTypeId,
            limitValue: _this.valueChao*1,
            upOrDown: _this.typeChao,

            isEffective: _this.value_dui_neng,
            isOpenEnvironmentTemp: _this.value_dui_wen,
            referenceTemp: _this.dui_input1,
            valueType: _this.value_dui_num,
            id:'my'+_this.myIdChao
          }
          _this.tableDataDui.push(item_chao)
        }else {
          let item_chao = {
            alarmLevel: _this.levelChao*1,
            alarmName: _this.nameChao,
            irBaseAlarmTypeId: _this.irBaseAlarmTypeId,
            limitValue: _this.valueChao*1,
            upOrDown: _this.typeChao,

            isEffective: _this.value_cha_neng,
            isOpenEnvironmentTemp: _this.value_cha_wen,
            //referenceTemp: 0,
            valueType: _this.value_cha_num,
            id:'my'+_this.myIdChao
          }
          _this.tableDataCha.push(item_chao)
        }

        this.dialogVisibleAddAlarm = false

      },
      clickChangeChao(raw) {
      	let _this = this
        if(raw){
          //console.log(raw.id);
          _this.chaoId = raw.id

        }else {
          _this.chaoId = null
        }
      },
      clickChangeWen(raw){
        let _this = this
        if(raw){
          //console.log(raw.id);
          _this.wenId = raw.id

        }else {
          _this.wenId = null
        }
      },
      clickChangeDui(raw){
        let _this = this
        if(raw){
          //console.log(raw.id);
          _this.duiId = raw.id

        }else {
          _this.duiId = null
        }
      },
      clickChangeCha(raw){
        let _this = this
        if(raw){
          //console.log(raw.id);
          _this.chaId = raw.id

        }else {
          _this.chaId = null
        }
      },
      saveAll(){
      	let _this = this
        if(!_this.irProjPointId){
          _this.$message({
            message: '请选择',
          });
          return
        }
        let saveData = {
          irProjPointId:_this.irProjPointId,
          pointAlarmSettingRequests:[]
        }
        for(let i=0;i<_this.tableDataChao.length;i++){
          saveData.pointAlarmSettingRequests.push({
            alarmLevel:_this.tableDataChao[i].alarmLevel,
            alarmName: _this.tableDataChao[i].alarmName,
            irBaseAlarmTypeId: _this.tableDataChao[i].irBaseAlarmTypeId,
            isEffective: _this.tableDataChao[i].isEffective,
            //isOpenEnvironmentTemp: "string",//启用环境温度
            limitValue: _this.tableDataChao[i].limitValue,
            //referenceTemp: 0,//参考温度
            upOrDown: _this.tableDataChao[i].upOrDown,
            valueType: _this.tableDataChao[i].valueType
          })
        }
        for(let i=0;i<_this.tableDataWen.length;i++){
          saveData.pointAlarmSettingRequests.push({
            alarmLevel:_this.tableDataWen[i].alarmLevel,
            alarmName: _this.tableDataWen[i].alarmName,
            irBaseAlarmTypeId: _this.tableDataWen[i].irBaseAlarmTypeId,
            isEffective: _this.tableDataWen[i].isEffective,
            //isOpenEnvironmentTemp: "string",//启用环境温度
            limitValue: _this.tableDataWen[i].limitValue,
            //referenceTemp: 0,//参考温度
            upOrDown: _this.tableDataWen[i].upOrDown,
            valueType: _this.tableDataWen[i].valueType
          })
        }
        for(let i=0;i<_this.tableDataDui.length;i++){
          saveData.pointAlarmSettingRequests.push({
            alarmLevel:_this.tableDataDui[i].alarmLevel,
            alarmName: _this.tableDataDui[i].alarmName,
            irBaseAlarmTypeId: _this.tableDataDui[i].irBaseAlarmTypeId,
            isEffective: _this.tableDataDui[i].isEffective,
            isOpenEnvironmentTemp: _this.tableDataDui[i].isOpenEnvironmentTemp,//启用环境温度
            limitValue: _this.tableDataDui[i].limitValue,
            referenceTemp: _this.tableDataDui[i].referenceTemp,//参考温度
            upOrDown: _this.tableDataDui[i].upOrDown,
            valueType: _this.tableDataDui[i].valueType
          })
        }
        for(let i=0;i<_this.tableDataCha.length;i++){
          saveData.pointAlarmSettingRequests.push({
            alarmLevel:_this.tableDataCha[i].alarmLevel,
            alarmName: _this.tableDataCha[i].alarmName,
            irBaseAlarmTypeId: _this.tableDataCha[i].irBaseAlarmTypeId,
            isEffective: _this.tableDataCha[i].isEffective,
            isOpenEnvironmentTemp: _this.tableDataCha[i].isOpenEnvironmentTemp,//启用环境温度
            limitValue: _this.tableDataCha[i].limitValue,
            referenceTemp: _this.tableDataCha[i].referenceTemp,//参考温度
            upOrDown: _this.tableDataCha[i].upOrDown,
            valueType: _this.tableDataCha[i].valueType
          })
        }
        //console.log(saveData)
        let chao = _this.arrSame(_this.tableDataChao,_this.tableDataChaoOld)
        let wen = _this.arrSame(_this.tableDataWen,_this.tableDataWenOld)
        let dui = _this.arrSame(_this.tableDataDui,_this.tableDataDuiOld)
        let cha = _this.arrSame(_this.tableDataCha,_this.tableDataChaOld)


        _this.ajax_api('put',url_api + '/point-alarm-setting/batch',saveData,
          true,
          function (res){
            //console.log(res)
            if(res.code==200){
              chao ? _this.message1='超温报警模块阈值无修改！':_this.message1='超温报警模块阈值保存成功！'
              wen ? _this.message2='温升报警模块阈值无修改！':_this.message2='温升报警模块阈值保存成功！'
              dui ? _this.message3='三相对比报警模块阈值无修改！':_this.message3='三相对比报警模块阈值保存成功！'
              cha ? _this.message4='三相温差报警模块阈值无修改！':_this.message4='三相温差报警模块阈值保存成功！'
              _this.dialogVisibleDelSave = true
            }else {
              _this.$message({
                message: '服务器繁忙，保存失败',
              });
            }

          })

      },
      childKey(childValue){
      	//console.log(childValue)
        this.irProjPointId = childValue.id
        this.irProjPointName = childValue.name
        this.getAlarmData()
        this.getAlarmDataOld()
      },
      arrSame (arr,newArr) {
      	let _this = this
        let bol = true;
        if (arr.length != newArr.length) {
          return false;
        }
        for (let i = 0, n = arr.length;i < n; i++) {
          if (arr[i] instanceof Array) {
            bol = _this.arrSame(arr[i],newArr[i])
            if (!bol) {
              break;
            }
          } else if (arr[i] instanceof Object) {
            bol = _this.objSame(arr[i],newArr[i])
            if (!bol) {
              break;
            }
          }else if (arr[i] != newArr[i]) {
            bol = false;
            break;
          }
        }
        return bol;
      },
      objSame (obj,newObj) {
        let bol = true;
        let _this = this;
        if (Object.keys(obj).length != Object.keys(newObj).length) {
          return false;
        }
        for(let key in obj) {
          if ( obj[key] instanceof Object) {
            bol = _this.objSame(obj[key],newObj[key]);
            if (!bol) {
              break;
            }
          } else if ( obj[key] instanceof Array) {
            bol = _this.arrSame(obj[key],newObj[key])
            if (!bol) {
              break;
            }
          } else if (obj[key] != newObj[key]) {
            bol =  false;
            break;
          }
        }
        return bol
      },
      queryTree(){
        let _this = this
        _this.toTreeData = _this.input
      },
      resetTree(){
        let _this = this
        _this.input = ''
        _this.toTreeData = ''
      },
    },
    components: {
      HeaderTop,
      devTreeNoCheck,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .threshold_wrap
    height 100%
    .threshold_top
      display flex
      height 30px
      background #cae7ee\0
      background linear-gradient(#e3f2ee,#cae7ee)
      align-items center
      .top_left
        width 300px
        display flex
        border-right 1px solid #cae7ee
        padding-left 10px
        box-sizing border-box
        float left
        ul
          float left
          display flex
          padding-left 5px
          li
            float left
            margin-right 10px
            display flex
            align-items center
            cursor pointer
            img
              width 16px
              height 16px
              margin-right 4px
              vertical-align middle

      .top_right
        width calc(100% - 300px)
        display flex
        align-items center
        border-right 1px solid #cae7ee
        padding-left 10px
        box-sizing border-box
        float left
        p
          float left
          margin-left 10px
          font-weight 600
        ul
          display flex
          padding-left 5px
          li
            margin 0 30px
            display flex
            align-items center
            cursor pointer
            float left
            img
              width 16px
              height 16px
              margin-right 4px

    .threshold_content
      height calc(100% - 120px)
      min-height 700px
      .content_left
        width 300px
        height calc(100% - 0px)
        float left
      .content_right
        width calc(100% - 300px)
        height calc(100% - 0px)
        float left
        .alarm_box
          height 100%
          p
            border 1px solid #a0fbd9
            background #cae7ee
            height 30px
            line-height 30px
            padding-left 10px
            box-sizing border-box
            .title
              color #2cbd78
              font-weight 600
              margin-right 20px
            .title_select
              margin-left 20px
          .tool
            border 1px solid #a0fbd9
            height 20.5%
            margin-bottom 5px
            background white
            ul
              li
                float left
                height 30px
                line-height 30px
                margin 0 10px
                cursor pointer
                img
                  width 16px
                  height 16px
                  margin-right 4px
                  vertical-align middle
                span
                  vertical-align middle

            .table_box
              height 82%
              overflow-y auto
    div>>>.el-table th
      padding 0
    div>>>.el-table td
      padding 0
    div>>>
      .el-dialog
        background #d7efec
        width: 38%;
        min-width: 260px;
        padding-bottom: 6px;
      .dialog_content
        background white
        padding 10px 20px
        border 1px solid #90e8c6
        .title
          height 40px
          line-height 40px
          border-bottom 1px solid #bababa
          span
            font-size 14px
            font-weight 600

        .input_wrap
          display flex
          align-items center
          margin 15px 0
          p
            width 110px
            margin-right 10px
            text-align right
            font-size 14px
            font-weight 600
            display inline-block
          .el-switch
            display inline-block
          .el-input
            width 230px
          .must-mark
            color red
            font-size 18px
            margin-left 5px
            display inline-block
    div>>>
      .el-dialog__header
        padding 10px 10px 5px
    div>>>
      .el-dialog__body
        padding 2px 5px 0px
    div>>>
      .el-dialog__footer
        border 1px solid #90e8c6
        border-top none
        padding 5px 10px
        margin 0 5px
        background white
        .el-button
          padding 6px 20px
    div>>>
      .el-dialog__headerbtn
        top 8px
        right 8px
    div>>>
      .el-table::before
        height 0
    div>>>.el-input__inner
      padding 0 6px

</style>
