<template>
	<div class="task_control_wrap">
    <div v-if="false" @click="shp_to_json">json</div>
    <select id="selecttype" style="display: none">
      <option value="none" selected>None</option>
      <option value="pointSelect">点选</option>
      <option value="toggleSelect">多选</option>
      <option value="boxSelect">框选</option>
      <option value="pointmove">鼠标经过</option>
    </select>
    <div id="map" ref="rootmap">
      <div title="复位" class="map_fuwei" @click="resetView()"><img src="../../static/img/weizhi.png" alt=""></div>
      <ul>
        <li @click="taskStop">
          <el-button type="text" size="mini">{{taskStopText}}</el-button>
        </li>
        <li><el-button @click="clearTask" type="text" size="mini">任务终止</el-button></li>
        <li @click="addTask">
          <el-button type="text" size="mini" :disabled="addTaskDisabled">创建任务</el-button>
        </li>
        <li @click="backStartPoint">
          <el-button type="text" size="mini">一键返航</el-button>
        </li>
        <li @click="choosePoint">
          <el-button type="text" size="mini">{{choosePointText}}</el-button>
        </li>
        <li @click="removeChoosePoint" v-if="isShowStopPoint">
          <el-button type="text" size="mini">取消选择</el-button>
        </li>
        <li @click="addPlate">
          <el-button type="text" size="mini">{{addPlateText}}</el-button>
        </li>
        <li>
          <el-dropdown trigger="click" placement="bottom" :hide-on-click=false>
          <span class="el-dropdown-link">
            图层管理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">

              <el-dropdown-item>
                <el-checkbox v-model="checked1" @change="change11('geoJsonLayerPoint',checked1)">停靠点</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="checked2" @change="change11('geoJsonLayerPointTargets3',checked2)">检测点</el-checkbox>
              </el-dropdown-item>
              <!--<el-dropdown-item>
                <el-checkbox v-model="checked3">历史路径</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="checked4">任务路径</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="checked5">实时路径</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="checked6">任务起止点</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="checked7">当前点</el-checkbox>
              </el-dropdown-item>-->

            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!--<li @click="test(true)"><el-button type="text" size="mini">go</el-button></li>
        <li @click="test(false)"><el-button type="text" size="mini">stop</el-button></li>
        <li @click="plateShow"><el-button type="text" size="mini">区域</el-button></li>-->
        <li @click="editMapBtn"><el-button type="text" size="mini">{{editMap}}</el-button></li>
      </ul>
      <div class="map_edit_box">
        <p @click="closeEditMap()" class="map_edit_box_close"><i class="el-dialog__close el-icon el-icon-close"></i></p>
        <select class="select_box" id="type" @change="onAddOrDel">
          <option value="Point">新增点位</option>
          <option value="LineString">新增线路</option>
          <option value="delPoint">删除点位</option>
          <option value="delLine">删除线路</option>
          <!--<option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
          <option value="None">None</option>-->
        </select>
        <div class="del_point" @click="delNewPointLineY()">确认删除</div>
        <div class="clear_point" @click="clearPoint()">清除绘制</div>
        <div class="save_point" @click="savePoint()">保存点位</div>
        <div class="save_line" @click="saveLine()">保存线路</div>
      </div>
      <!--<img src="../../static/aaaa.jpg" style="width: 100%" alt="">-->
    </div>
    <div class="plate_dialog">
      <el-dialog title="挂牌" :visible.sync="dialogVisiblePlate" class="del_user" @close='closeDialog'>
        <div class="dialog_content">
          <p style="margin:10px">挂牌有效时间</p>
          <div style="margin:10px 20px">
            <span style="display:inline-block;width: 50px">起始</span>
            <el-date-picker size="mini" style="width: 200px;"
                            v-model="startTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div style="margin:10px 20px">
            <span style="display:inline-block;width: 50px">至</span>
            <el-date-picker size="mini" style="width: 200px;"
                            v-model="endTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <p style="margin:10px">确定要执行挂牌操作吗？</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblePlate = false">取 消</el-button>
          <el-button type="primary" @click="addPlateCommit">确 认</el-button>
        </span>
      </el-dialog>
    </div>
    <!--地图弹出框-->
    <div id="popup" class="ol-popup">
      <span style="cursor:pointer;" id="popup-closer" class="ol-popup-closer"></span>
      <div id="popup-content">
        <p>挂牌有效时间</p>
        <p><span>开始时间：</span><span>{{popupStartTime}}</span></p>
        <p><span>结束时间：</span><span>{{popupEndTime}}</span></p>
      </div>
    </div>
    <div style="width: 500px;height: 100px;background: #fffcf9;display: none;
    color:white;position:absolute;z-index:999;margin: -2px 0 0 5px" id="mouseposition"></div>
  </div>
</template>

<script>
  import '../../static/ol/css/ol.css'
  import ol from '../../static/ol/ol.js'

	export default {
    data() {
      return {
        checked11:true,
        checked22:false,
        checked33:false,
        checked1: true,
        checked2: true,
        checked3: true,
        checked4: true,
        checked5: true,
        checked6: true,
        checked7: true,
        map: null,
        geoJsonLayerRoute:null,
        geoJsonLayerPoint: null,
        geoJsonLayerPoint3: null,
        geoJsonLayerPointTargets3: null,
        addTaskDisabled:true,
        choosePointText:'地图选点',
        taskStopText:'任务暂停',
        addPlateText:'挂牌',
        editMap:'地图编辑',
        pointmove:null,
        isShowStopPoint:false,
        pointSelect:null,
        boxSelect: null,
        selectedFeatures: null,
        pointIds:'',
        dialogVisiblePlate: false,
        startTime:'',
        endTime:'',
        dragBoxPoint: null,
        dragBoxPlate: null,
        addPlateVector: null,
        allPlateVector: null,

        addPointVector: null,
        addLineVector:null,
        allNewPointVector:null,
        allNewLineVector:null,
        delPointArr:[],
        delLineArr:[],

        popupStartTime:'',
        popupEndTime:'',
        routeId:'',
        timeId:null,
        vehVector:null,
        passRouteLayer:null,
        url:robotUrl,
        planLinePoint:[],
        planLinePointVector:null,

        taskServer:null,
        taskServerClear:null,

        ros:null,

        mapCenter:null,
        mapZoom:null,
        mapRotate:null,
        aa:{"InspectId":"1","Tasks":[{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"355.04953;231.2143;86.165596","TLocType":"start","TLocWidth":5},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"355.04953;231.2143;86.165596","TLocType":"turn","TLocWidth":5,"TurnAngle":"-178"},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"355.062;230.642;86.714","TLocType":"turn","TLocWidth":5,"TurnAngle":"1"},{"Align":"middle","Id":"1","IsAnterograde":false,"Status":"0","TLoc":"356.451;230.577;121.917","TLocType":"turn","TLocWidth":5,"TurnAngle":"89"},{"Align":"middle","Id":"13","IsAnterograde":false,"Status":"0","TLoc":"370.268;230.618;121.624","TLocType":"turn","TLocWidth":5,"TurnAngle":"-85"},{"Align":"middle","CameraPose":"1:1/382.907,129.578,238.054,400.0,400.0,1,14,down,0.0,0.0,0.0,100.0,0,53.0/1/62","Id":"1001","IsAnterograde":false,"Status":"0","TLoc":"371.315;231.248;130.759","TLocType":"transfer","TLocWidth":5},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"371.315;231.248;130.759","TLocType":"turn","TLocWidth":5,"TurnAngle":"180"},{"Align":"middle","Id":"13","IsAnterograde":false,"Status":"0","TLoc":"370.268;230.618;121.624","TLocType":"turn","TLocWidth":5,"TurnAngle":"85"},{"Align":"middle","Id":"21","IsAnterograde":false,"Status":"0","TLoc":"332.62;230.635;123.015","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"13:1/336.946,148.144,234.817,50.0,50.0,1,7,down,0.0,0.0,0.0,60.0,0,35.0/1/62","Id":"1013","IsAnterograde":false,"Status":"0","TLoc":"332.987;231.418;132.665","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"41:1/329.457,138.994,240.221,800.0,800.0,2,1,down,0.0,0.0,0.0,0.0,0,0.0/1/62;42:1/336.027,138.837,240.262,800.0,800.0,2,1,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1036","IsAnterograde":false,"Status":"0","TLoc":"333.204;231.408;138.685","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"38:1/328.757,140.626,235.414,800.0,1000.0,2,2,down,0.0,0.0,0.0,0.0,0,0.0/1/62;39:1/336.188,140.728,235.374,800.0,1000.0,2,2,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1035","IsAnterograde":false,"Status":"0","TLoc":"333.276;231.405;140.692","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"9:1/329.831,148.763,235.049,100.0,100.0,1,3,down,-0.1,0.0,-0.1,0.9,0,0.6/1/62","Id":"1009","IsAnterograde":false,"Status":"0","TLoc":"333.566;231.392;148.718","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"8:1/322.35,148.985,235.029,100.0,100.0,1,3,down,-0.1,0.0,-0.1,0.9,0,0.6/1/62","Id":"1008","IsAnterograde":false,"Status":"0","TLoc":"333.675;231.387;151.728","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"70","IsAnterograde":false,"Status":"0","TLoc":"333.805;230.731;155.335","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"80:1/346.053,152.646,235.232,800.0,1000.0,2,2,down,0.0,0.0,0.0,0.0,0,0.0/1/62;81:1/346.171,159.992,235.322,800.0,1000.0,2,2,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1067","IsAnterograde":false,"Status":"0","TLoc":"346.224;231.513;154.878","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"84:1/347.69,160.249,239.99,800.0,800.0,2,1,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1070","IsAnterograde":false,"Status":"0","TLoc":"347.235;231.509;154.841","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"86:1/349.38,153.213,235.346,800.0,1000.0,2,2,down,0.0,0.0,0.0,0.0,0,0.0/1/62;87:1/349.405,160.605,235.323,800.0,1000.0,2,2,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1072","IsAnterograde":false,"Status":"0","TLoc":"349.255;231.501;154.766","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"19:1/355.195,145.447,234.209,100.0,100.0,1,15,down,0.0,0.0,0.0,1.0,0,10002.0/1/62","Id":"1019","IsAnterograde":false,"Status":"0","TLoc":"354.811;231.478;154.56","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"10:1/337.348,148.475,235.021,100.0,100.0,1,3,down,-0.1,0.0,-0.1,0.9,0,0.6/1/62","Id":"1010","IsAnterograde":false,"Status":"0","TLoc":"357.842;231.466;154.448","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"69","IsAnterograde":false,"Status":"0","TLoc":"362.779;230.796;154.267","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"15:1/360.468,152.405,232.845,100.0,100.0,1,5,down,0.0,0.0,0.0,6.0,0,1.4/1/62;89:1/360.442,152.399,232.9,100.0,100.0,1,8,down,0.0,0.0,0.0,3.0,0,0.0/1/62","Id":"1015","IsAnterograde":false,"Status":"0","TLoc":"362.71;231.441;152.268","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"16:1/360.198,144.918,232.865,100.0,100.0,1,5,down,0.0,0.0,0.0,6.0,0,1.5/1/62;88:1/360.176,144.916,232.94,100.0,100.0,1,8,down,0.0,0.0,0.0,3.0,0,0.0/1/62","Id":"1016","IsAnterograde":false,"Status":"0","TLoc":"362.453;231.42;144.702","TLocType":"transfer","TLocWidth":5},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"362.453;231.42;144.702","TLocType":"turn","TLocWidth":5,"TurnAngle":"180"},{"Align":"middle","CameraPose":"14:1/360.608,159.903,232.859,100.0,100.0,1,5,down,0.0,0.0,0.0,6.0,0,10002.0/1/62;90:1/360.703,159.903,232.835,100.0,100.0,1,8,down,0.0,0.0,0.0,3.0,0,0.0/1/62","Id":"1014","IsAnterograde":false,"Status":"0","TLoc":"362.968;231.462;159.833","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"18:1/355.496,152.92,234.226,100.0,100.0,1,14,down,0.0,0.0,0.0,1.0,0,10002.0/1/62","Id":"1018","IsAnterograde":false,"Status":"0","TLoc":"363.237;231.463;167.79","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"22:1/338.507,180.444,235.101,100.0,100.0,1,3,down,-0.1,0.0,-0.1,0.9,0,0.61/1/62","Id":"1022","IsAnterograde":false,"Status":"0","TLoc":"363.62;231.515;178.999","TLocType":"transfer","TLocWidth":5},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"363.62;231.515;178.999","TLocType":"turn","TLocWidth":5,"TurnAngle":"180"},{"Align":"middle","Id":"69","IsAnterograde":false,"Status":"0","TLoc":"362.779;230.796;154.267","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","Id":"70","IsAnterograde":false,"Status":"0","TLoc":"333.805;230.731;155.335","TLocType":"turn","TLocWidth":5,"TurnAngle":"-90"},{"Align":"middle","Id":"21","IsAnterograde":false,"Status":"0","TLoc":"332.62;230.635;123.015","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","Id":"31","IsAnterograde":false,"Status":"0","TLoc":"304.833;230.657;124.11","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"103:1/308.932,149.435,234.824,50.0,50.0,1,7,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1084","IsAnterograde":false,"Status":"0","TLoc":"305.471;231.399;141.936","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"113:1/301.848,149.986,235.066,100.0,100.0,1,3,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1094","IsAnterograde":false,"Status":"0","TLoc":"305.743;231.371;149.953","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"106:1/310.069,181.424,234.832,50.0,50.0,1,7,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1087","IsAnterograde":false,"Status":"0","TLoc":"306.61;231.344;175.478","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"116:1/302.986,182.053,235.011,100.0,100.0,1,3,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1097","IsAnterograde":false,"Status":"0","TLoc":"306.831;231.337;181.984","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"25:1/323.792,217.987,235.084,100.0,100.0,1,3,down,-0.1,0.0,-0.1,0.9,0,10002.0/1/62","Id":"1025","IsAnterograde":false,"Status":"0","TLoc":"308.038;231.3;217.518","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"120:1/310.762,218.759,235.056,100.0,100.0,1,3,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1101","IsAnterograde":false,"Status":"0","TLoc":"308.106;231.298;219.52","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"26:1/331.29,217.744,235.081,100.0,100.0,1,3,down,-0.1,0.0,-0.1,0.9,0,10002.0/1/62","Id":"1026","IsAnterograde":false,"Status":"0","TLoc":"308.259;231.293;224.024","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"110:1/303.644,219.331,234.868,50.0,50.0,1,7,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1091","IsAnterograde":false,"Status":"0","TLoc":"308.293;231.292;225.025","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"29","IsAnterograde":false,"Status":"0","TLoc":"308.973;230.621;245.044","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"30:1/339.163,217.802,234.595,50.0,50.0,1,7,down,0.0,0.0,0.0,60.0,0,10002.0/1/62","Id":"1030","IsAnterograde":false,"Status":"0","TLoc":"343.662;231.23;243.791","TLocType":"transfer","TLocWidth":5},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"343.662;231.23;243.791","TLocType":"turn","TLocWidth":5,"TurnAngle":"180"},{"Align":"middle","Id":"19","IsAnterograde":false,"Status":"0","TLoc":"337.005;230.588;244.032","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"95:1/334.177,274.978,234.062,50.0,50.0,1,14,down,0.0,0.0,0.0,1.0,0,0.0/1/62","Id":"1077","IsAnterograde":false,"Status":"0","TLoc":"338.11;231.294;274.624","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"97:1/341.161,270.616,232.634,100.0,100.0,1,5,down,0.0,41.0,0.0,6.0,0,0.0/1/62","Id":"1079","IsAnterograde":false,"Status":"0","TLoc":"338.146;231.275;275.65","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"98:1/341.163,270.616,232.702,30.0,30.0,1,8,down,0.0,0.0,0.0,3.0,0,0.0/1/62","Id":"1080","IsAnterograde":false,"Status":"0","TLoc":"338.164;231.265;276.164","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"22","IsAnterograde":false,"Status":"0","TLoc":"338.364;230.509;281.809","TLocType":"turn","TLocWidth":5,"TurnAngle":"-90"},{"Align":"middle","Id":"27","IsAnterograde":false,"Status":"0","TLoc":"330.231;230.518;282.096","TLocType":"turn","TLocWidth":5,"TurnAngle":"-90"},{"Align":"middle","CameraPose":"102:1/326.087,271.171,232.467,30.0,30.0,1,8,down,0.0,0.0,0.0,3.0,0,0.0/1/62","Id":"1083","IsAnterograde":false,"Status":"0","TLoc":"330.098;231.227;278.334","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"101:1/326.09,271.171,232.497,100.0,100.0,1,5,down,0.0,41.0,0.0,6.0,0,0.0/1/62","Id":"1082","IsAnterograde":false,"Status":"0","TLoc":"330.079;231.236;277.796","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"99:1/333.635,270.888,232.521,100.0,100.0,1,6,down,0.0,41.0,0.0,6.0,0,0.0/1/62;100:1/333.633,270.885,232.488,30.0,30.0,1,8,down,0.0,0.0,0.0,3.0,0,0.0/1/62","Id":"1081","IsAnterograde":false,"Status":"0","TLoc":"330.022;231.261;276.184","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"96:1/326.617,275.254,234.042,50.0,50.0,1,14,down,0.0,0.0,0.0,1.0,0,0.0/1/62","Id":"1078","IsAnterograde":false,"Status":"0","TLoc":"329.984;231.278;275.109","TLocType":"transfer","TLocWidth":5},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"329.984;231.278;275.109","TLocType":"turn","TLocWidth":5,"TurnAngle":"180"},{"Align":"middle","Id":"27","IsAnterograde":false,"Status":"0","TLoc":"330.231;230.518;282.096","TLocType":"turn","TLocWidth":5,"TurnAngle":"-90"},{"Align":"middle","Id":"34","IsAnterograde":false,"Status":"0","TLoc":"302.28;230.553;283.084","TLocType":"turn","TLocWidth":5,"TurnAngle":"-90"},{"Align":"middle","CameraPose":"127:1/298.669,276.296,234.095,50.0,50.0,1,14,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1108","IsAnterograde":false,"Status":"0","TLoc":"302.038;231.301;276.212","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"129:1/305.427,276.012,234.118,50.0,50.0,1,14,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1110","IsAnterograde":false,"Status":"0","TLoc":"302.038;231.301;276.212","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"119:1/303.265,219.046,235.07,100.0,100.0,1,3,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1100","IsAnterograde":false,"Status":"0","TLoc":"299.988;231.305;219.255","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"117:1/295.508,182.277,235.017,100.0,100.0,1,3,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1098","IsAnterograde":false,"Status":"0","TLoc":"298.712;231.338;183.647","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"114:1/294.364,150.198,234.985,100.0,100.0,1,3,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1095","IsAnterograde":false,"Status":"0","TLoc":"297.507;231.37;150.044","TLocType":"transfer","TLocWidth":5},{"Align":"middle","CameraPose":"104:1/301.436,149.711,234.878,50.0,50.0,1,7,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1085","IsAnterograde":false,"Status":"0","TLoc":"297.159;231.393;140.507","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"37","IsAnterograde":false,"Status":"0","TLoc":"296.566;230.664;124.436","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"105:1/293.838,150.132,234.737,50.0,50.0,1,7,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1086","IsAnterograde":false,"Status":"0","TLoc":"287.168;231.331;124.806","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"41","IsAnterograde":false,"Status":"0","TLoc":"276.187;230.681;125.239","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","CameraPose":"118:1/295.741,219.266,235.053,100.0,100.0,1,3,down,0.0,0.0,0.0,0.0,0,0.0/1/62","Id":"1099","IsAnterograde":false,"Status":"0","TLoc":"279.64;231.272;220.883","TLocType":"transfer","TLocWidth":5},{"Align":"middle","Id":"72","IsAnterograde":false,"Status":"0","TLoc":"280.5391;230.654;246.0837","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","Id":"29","IsAnterograde":false,"Status":"0","TLoc":"308.973;230.621;245.044","TLocType":"turn","TLocWidth":5,"TurnAngle":"90"},{"Align":"middle","Id":"31","IsAnterograde":false,"Status":"0","TLoc":"304.833;230.657;124.11","TLocType":"turn","TLocWidth":5,"TurnAngle":"-90"},{"Align":"middle","Id":"1","IsAnterograde":false,"Status":"0","TLoc":"356.451;230.577;121.917","TLocType":"turn","TLocWidth":5,"TurnAngle":"89"},{"Align":"middle","IsAnterograde":false,"Status":"0","TLoc":"355.062;230.642;86.714","TLocType":"end","TLocWidth":5}]},
      };
    },
    props: ['irDataTaskHistoryId'],
    mounted(){
    	let _this = this

      _this.ros = new ROSLIB.Ros({
          url : _this.url
      });
      //console.log(_this.ros)
      _this.ros.on('connection', function() {
          //console.log('point.server');
      });

      _this.init()
      _this.plateShow()
      _this.point_now()
      _this.taskExecuteStatus()
      //_this.planLineShow()
      _this.planLinePoint = planLinePointArr

      _this.showNewPointLine()
    },

    methods:{
    	init(){
    		let _this = this

        var extent = [16.2149, 35.8646, 54.2111, -4.9501];
        var iconStyle = new ol.style.Style({

        });
        let image = new ol.layer.Image({
          source: new ol.source.ImageStatic({
            url: '../../static/img/map_img.png',//这里添加静态图片的地址
            /*projection: projection,
            imageExtent: extent*/
            projection: 'EPSG:3857',
            imageExtent: ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857'),
          }),
          //style: iconStyle,

        })
        //console.log(image.getSource())

        _this.geoJsonLayerRoute = new ol.layer.Vector({
          title: 'add Layer',
          source: new ol.source.Vector({
            //projection: 'EPSG:4326',
            url: '../../static/geojson/route.geojson',
            //url: '../../static/geojson/route_yu_new.geojson',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              stroke: new ol.style.Stroke({
                color:'#6ad864',  //6ad864   6abcff
                width: 2,
              }),
            });
          },
          visible: true
        });

        //console.log("123");
        _this.geoJsonLayerPoint = new ol.layer.Vector({
          title: 'add Layer Point',
          source: new ol.source.Vector({
            //projection: 'EPSG:4326',
            url: '../../static/geojson/stops.geojson',
            //url: '../../static/geojson/stops_yu_new.geojson',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                  color: '#ffaf43'  //#3837ae
                })
              }),

            });
          },
          visible: true
        });

        var geoJsonLayerRoute3 = new ol.layer.Vector({
          title: 'add Layer',
          source: new ol.source.Vector({
            //projection: 'EPSG:4326',
            url: '../../static/geojson/route_yu_new.geojson',
            //url: '../../static/geojson/route3.geojson',
            //url: '../../static/geojson/route.geojson',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              stroke: new ol.style.Stroke({
                color:'#6ad864',
                width: 2
              }),

            });
          },
          visible: true
        });
        _this.geoJsonLayerPoint3 = new ol.layer.Vector({
          title: 'add Layer Point',
          source: new ol.source.Vector({
            //projection: 'EPSG:4326',
            url: '../../static/geojson/stops_yu_new.geojson',
            //url: '../../static/geojson/stops3.geojson',
            //url: '../../static/geojson/stops.geojson',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                  color: '#ffaf43'
                })
              }),

            });
          },
          visible: true
        });
        _this.geoJsonLayerPointTargets3 = new ol.layer.Vector({
            title: 'add Layer Point',
            source: new ol.source.Vector({
                //projection: 'EPSG:4326',
                //url: '../../static/geojson/targets_yu_new.geojson',
                url: '../../static/geojson/targets.geojson',
                format:new ol.format.GeoJSON()
            }),
            style: function (feature, resolution) {
                //console.log(feature)
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 4,
                        fill: new ol.style.Fill({
                            color: '#ff5524'
                        })
                    }),
                    text: new ol.style.Text({
                      textAlign: 'center',            //位置
                      textBaseline: 'middle',         //基准线
                      offsetY: -8,
                      font: 'normal 14px 微软雅黑',    //文字样式
                      text: feature.getId().substring(8),      //文本内容
                      fill: new ol.style.Fill({       //文本填充样式（即文字颜色)
                        color: '#000'
                      }),
                      stroke: new ol.style.Stroke({
                        color: '#000000',
                        width: 0
                      })
                    })

                });
            },
            visible: true
        });

        var m_center = mapCenter  //[28, 20]
        //var m_center = [10, 9]
        m_center = ol.proj.transform(m_center,'EPSG:4326','EPSG:3857');

        var mousePositionControl = new ol.control.MousePosition({
          coordinateFormat: ol.coordinate.createStringXY(4),
          projection: 'EPSG:4326',
          className: 'custom-mouse-position',
          target: document.getElementById('mouseposition'),
          undefinedHTML: '&nbsp;'
        });

        _this.map = new ol.Map({
          layers: [
            //image,
            _this.geoJsonLayerRoute,
            _this.geoJsonLayerPoint,
            //geoJsonLayerRoute3,
            //_this.geoJsonLayerPoint3,
            _this.geoJsonLayerPointTargets3
          ],
          target: 'map',
          interactions: ol.interaction.defaults().extend([
            new ol.interaction.DragRotateAndZoom()
          ]),
          view: new ol.View({
            center: m_center,
            zoom: zoom,
            rotation: Math.PI/180 * mapRotate      //楼顶
            //rotation: Math.PI/180 * 4.5    //三楼
            //rotation: Math.PI/180 * -2.4   //玉贤
          }),
          //controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
          controls: ol.control.defaults().extend([
            new ol.control.FullScreen(),
            //new ol.control.MousePosition()
          ]),

        });

        //添加控件到地图
        //_this.map.addControl(mousePositionControl);

        //计划线路
        var planLineSource = new ol.source.Vector({});
        _this.planLinePointVector = new ol.layer.Vector({
            source: planLineSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({ //边界样式
                    color: '#3a4c69',
                    width: 4
                })
            })
        })
        _this.map.addLayer(_this.planLinePointVector);
        $('.ol-full-screen button').text('全屏')

        var view = _this.map.getView();
        _this.mapZoom = view.getZoom();
        _this.mapCenter = view.getCenter();
        _this.mapRotation = view.getRotation();

      },
      //地图选点
      choosePoint(){
    		let _this = this
        /*let pan = getFun();
        pan.setActive(false);//false：当前地图不可拖动。true：可拖动
        function getFun() {
          let pan;
          _this.map.getInteractions().forEach(function(element, index, array) {
            if(element instanceof ol.interaction.DragPan) {
              pan = element;
            }
          })
          return pan;
        }*/
        //如果挂牌打开先关闭
        if(_this.addPlateText == '退出挂牌'){
          _this.addPlateText = '挂牌'
          _this.map.removeInteraction(_this.dragBoxPlate);
          _this.map.removeInteraction(_this.boxSelect);
          _this.addPlateVector.getSource().clear();
        }

        if(_this.choosePointText=='地图选点'){
          _this.choosePointText = '停止'
          _this.isShowStopPoint = true
          _this.pointmove = new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            layers: [_this.geoJsonLayerPointTargets3]
          })
          var pointFeatures = _this.geoJsonLayerPointTargets3.getSource().getFeatures()
          var vectorSource = new ol.source.Vector({
            features: pointFeatures
          })
          var pointIdsArr = []
          //框选
          _this.boxSelect = new ol.interaction.Select({
            layers: [_this.geoJsonLayerPointTargets3]
          });
          _this.selectedFeatures = _this.boxSelect.getFeatures();
          _this.dragBoxPoint = new ol.interaction.DragBox({
            //condition : ol.events.condition.always  //默认是always
            condition: ol.events.condition.platformModifierKeyOnly
          });
          _this.map.addInteraction(_this.dragBoxPoint);
          _this.dragBoxPoint.on('boxend', function() {
            var extent = _this.dragBoxPoint.getGeometry().getExtent();
            vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
              _this.selectedFeatures.push(feature)
              pointIdsArr.push(feature.getId().slice(8))
            });
            //console.log(selectedFeatures)
            _this.pointIds = pointIdsArr.toString()
            if(_this.pointIds!=''){
              _this.addTaskDisabled = false
            }
          });
          _this.dragBoxPoint.on('boxstart', function() {
            _this.selectedFeatures.clear();
            pointIdsArr = []
            _this.addTaskDisabled = true
          });
          _this.map.on('click', function() {
            _this.selectedFeatures.clear();
            pointIdsArr = []
            _this.addTaskDisabled = true
          });
          _this.map.addInteraction(_this.boxSelect);
          _this.map.addInteraction(_this.pointmove);

        }else {
          _this.choosePointText = '地图选点'
          _this.isShowStopPoint = false
          _this.map.removeInteraction(_this.boxSelect);
          _this.map.removeInteraction(_this.pointmove);
          _this.map.removeInteraction(_this.dragBoxPoint);
          pointIdsArr = []
          _this.addTaskDisabled = true
        }

      },

      ttt(){
      	var _this = this
//选择对象
        var select = null;
        //单选
        var pointSelect = new ol.interaction.Select();
        //多选
        var toggleSelect = new ol.interaction.Select({
          condition:ol.events.condition.click,
          toggleCondition:ol.events.condition.click
        });
        //鼠标经过
        var pointmove = new ol.interaction.Select({
          condition: ol.events.condition.pointerMove
        });

        var pointFeatures = _this.geoJsonLayerPoint.getSource().getFeatures()
        var vectorSource = new ol.source.Vector({
          features: pointFeatures
        })
        //框选
        var boxSelect = new ol.interaction.Select({
            layers: [_this.geoJsonLayerPoint]
        });
        var selectedFeatures = boxSelect.getFeatures();
        var dragBox = new ol.interaction.DragBox({
          //condition : ol.events.condition.always  //默认是always
          condition: ol.events.condition.platformModifierKeyOnly
        });
        _this.map.addInteraction(dragBox);
        dragBox.on('boxend', function() {
          var extent = dragBox.getGeometry().getExtent();
          vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
            selectedFeatures.push(feature)
            //console.log(123123123)
          });
          console.log(selectedFeatures)
        });
        dragBox.on('boxstart', function() {
          selectedFeatures.clear();
        });
        _this.map.on('click', function() {
          selectedFeatures.clear();
        });
        var selectElement = document.getElementById('selecttype');
        var changeInteraction = function() {
          if (select !== null) {
            _this.map.removeInteraction(select);
            console.log('remove')
          }
          var value = selectElement.value;
          if (value == 'pointSelect') {
            select = pointSelect;
          } else if (value == 'boxSelect') {
            select = boxSelect;
          } else if (value == 'pointmove') {
            select = pointmove;
          } else if (value == 'toggleSelect') {
            select = toggleSelect;
          }else {
            select = null;
            console.log('none')
          }
          if (select !== null) {
            _this.map.addInteraction(select);
            console.log('add')
          }
        };
        selectElement.onchange = changeInteraction;
        changeInteraction();
      },
      removeChoosePoint(){
      	let _this = this
        //_this.map.removeInteraction(_this.pointmove)
        //_this.map.removeInteraction(_this.boxSelect)
        if(_this.selectedFeatures){
      		//console.log(11)
          _this.selectedFeatures.clear()
          _this.pointIds = ''
        }
        //_this.isShowStopPoint = false
        //_this.choosePointText = '地图选点'
        //_this.addTaskDisabled = true
      },
      //任务暂停-继续  原来重新计算的-开始
      taskStop_xxx(){
      	let _this = this
      	if(_this.taskStopText == '任务暂停'){
          _this.taskStopText = '任务继续'
          /*var ros = new ROSLIB.Ros({
              url : _this.url
          });
          //console.log(ros)
          ros.on('connection', function() {
              console.log('准备暂停任务.');
          });*/

          _this.taskServerClear = new ROSLIB.Service({
              ros : _this.ros,
              name : '/taskclear',
              serviceType : 'robotmsg/TaskControl'
          });
          _this.taskServerClear.callService({flag:1},function(result) {
              console.log('任务暂停');
              _this.$message('任务暂停');
              //发送irDataTaskHistoryId到后台
              console.log(_this.irDataTaskHistoryId)
              _this.ajax_api('post',url_api + '/task/gen-path',
                {irDataTaskHistoryId:_this.irDataTaskHistoryId},
                true,function (res) {
                  console.log(res)
                })
          })
        }else {
          _this.taskStopText = '任务暂停'
          /*var ros = new ROSLIB.Ros({
              url : _this.url
          });
          //console.log(ros)
          ros.on('connection', function() {
              console.log('准备暂停任务.');
          });*/

          _this.taskServerClear = new ROSLIB.Service({
              ros : _this.ros,
              name : '/taskclear',
              serviceType : 'robotmsg/TaskControl'
          });
          _this.taskServerClear.callService({flag:2},function(result) {
              console.log('任务继续');
              //_this.$message('任务继续');
              //发id到后台
              _this.ajax_api('post',url_api + '/task/proceed',
                {irDataTaskHistoryId:_this.irDataTaskHistoryId,irBaseRobotId:robotIdCurrent},
                true,function (res) {
                  //console.log(res)
                  console.log(res.data.path)
                  //取到计划线路的点
                  if(!res.data.path){
                    _this.$message({
                      message: '未获取到有效路径',
                    });
                    return
                  }
                  var linePlanObj = JSON.parse(res.data.path)
                  var lineArr = []
                  if(lineArr.length>0){
                    lineArr = []
                  }
                  for(var i=0;i<linePlanObj.Tasks.length;i++){
                    var pointArr = linePlanObj.Tasks[i].TLoc.split(";")
                    var point = projRobotXY(pointArr[0]*1,pointArr[2]*1)//[pointArr[0]*1,pointArr[2]*1]
                    lineArr.push(point)
                  }
                  planLinePointArr = lineArr

                  _this.taskServer = new ROSLIB.Service({
                    ros : _this.ros,
                    name : '/tasklist',
                    serviceType : 'robotmsg/TaskList'
                  });
                  _this.taskServerClear = new ROSLIB.Service({
                    ros : _this.ros,
                    name : '/taskclear',
                    serviceType : 'robotmsg/TaskList'
                  });
                  _this.taskServerClear.callService({flag:0},function(result) {
                    console.log('Clear');
                    if(result){
                      var request = new ROSLIB.ServiceRequest({
                        plan : res.data.path,
                        //plan : JSON.stringify(aa),
                      });
                      _this.taskServer.callService(request, function(result) {
                        console.log(result);
                        if(result){
                          _this.$message({
                            type: 'success',
                            message: '任务继续',
                          });
                        }
                      });
                    }else {
                      _this.taskServerClear.callService({flag:0},function(result) {
                        if(result){
                          var request = new ROSLIB.ServiceRequest({
                            plan : res.data.path,
                            //plan : JSON.stringify(aa),
                          });
                          _this.taskServer.callService(request, function(result) {
                            console.log(result);
                            _this.$message({
                              type: 'success',
                              message: '任务继续',
                            });
                          });
                        }else{
                          _this.$message({
                            type: 'success',
                            message: '任务继续失败',
                          });
                        }
                      })
                    }
                  });
                })
          })
        }

      },
      //任务暂停-继续  原来重新计算的-结束

      //任务暂停-继续  简单的
      taskStop(){
        let _this = this
        if(_this.taskStopText == '任务暂停'){
          _this.taskStopText = '任务继续'
          _this.taskServerClear = new ROSLIB.Service({
            ros : _this.ros,
            name : '/taskclear',
            serviceType : 'robotmsg/TaskControl'
          });
          _this.taskServerClear.callService({flag:1},function(result) {
            console.log('任务暂停');
            _this.$message('任务暂停');
          })
        }else {
          _this.taskStopText = '任务暂停'
          _this.taskServerClear = new ROSLIB.Service({
            ros : _this.ros,
            name : '/taskclear',
            serviceType : 'robotmsg/TaskControl'
          });
          _this.taskServerClear.callService({flag:2},function(result) {
            console.log('任务继续');
            _this.$message('任务继续');
          })
        }

      },

      //一键返航
      backStartPoint(){
        let _this = this
        this.$confirm('该操作将终止当前任务返回充电房, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //_this.$message('任务终止'); GET /ui/robot/{id}/turn-back
            _this.ajax_api('get',url_api + '/robot/' + robotIdCurrent + '/turn-back',
                null,true,function (res) {
                    console.log(res)
                    if(res.data=='null'){
                        console.log('没有data')
                        _this.$message({
                          message: '获取路径失败',
                        });
                        return
                    }
                    if(!res.data){
                        console.log(res.data)
                        _this.$message({
                          message: '获取路径失败',
                        });
                        return
                    }
                    var linePlanObj = JSON.parse(res.data)
                    var lineArr = []
                    if(lineArr.length>0){
                        lineArr = []
                    }
                    for(var i=0;i<linePlanObj.Tasks.length;i++){
                        var pointArr = linePlanObj.Tasks[i].TLoc.split(";")
                        var point = projRobotXY(pointArr[0]*1,pointArr[2]*1)
                        lineArr.push(point)
                    }
                    planLinePointArr = lineArr
                    _this.planLinePoint = lineArr
                    //console.log(_this.planLinePointVector) //.refresh()
                    _this.planLinePointVector.getSource().refresh()
                    sessionStorage.setItem("planLine",lineArr);
                    //_this.init()
                    /*var ros = new ROSLIB.Ros({
                        url : _this.url
                    });
                    //console.log(ros)
                    ros.on('connection', function() {
                        console.log('准备返回.');
                    });*/

                    _this.taskServer = new ROSLIB.Service({
                        ros : _this.ros,
                        name : '/tasklist',
                        serviceType : 'robotmsg/TaskList'
                    });
                    _this.taskServerClear = new ROSLIB.Service({
                        ros : _this.ros,
                        name : '/taskclear',
                        serviceType : 'robotmsg/TaskList'
                    });
                    _this.taskServerClear.callService({flag:0},function(result) {
                      console.log('Clear'+result);
                      if(result){
                        var request = new ROSLIB.ServiceRequest({
                          plan : res.data,
                          //plan : JSON.stringify(_this.aa),
                        });
                        //console.log(request)
                        _this.taskServer.callService(request, function(result1) {
                          //console.log(result1);
                          if(result1){
                            _this.$message({
                              type: 'success',
                              message: '准备返航',
                            });
                            _this.$root.eventHub.$emit('taskSuccess', '1111');
                          }
                        });
                      }else {
                        _this.taskServerClear.callService({flag:0},function(result) {
                          if(result){
                            var request = new ROSLIB.ServiceRequest({
                              plan : res.data,
                              //plan : JSON.stringify(aa),
                            });
                            _this.taskServer.callService(request, function(result) {
                              console.log(result);
                              _this.$message({
                                type: 'success',
                                message: '准备返航',
                              });
                              _this.$root.eventHub.$emit('taskSuccess', '1111');
                            });
                          }else{
                            _this.$message({
                              type: 'success',
                              message: '准备返航失败',
                            });
                          }
                        })
                      }
                    });
                    /*_this.taskServerClear.callService({flag:0},function(result) {
                        console.log('Clear');
                        var request = new ROSLIB.ServiceRequest({
                            plan : res.data,
                            //plan : JSON.stringify(aa),
                        });

                        _this.taskServer.callService(request, function(result) {
                            console.log(result);
                        });
                    })*/ //原来的没有判断


                })

        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });
        });
      },

      test(e){
        const arrPoint = [[21.136,12.909],[20.136,12.909],
          [19.136,12.909],[18.136,12.909],[17.136,12.909],[16.136,12.909],
          [15.136,12.909],[14.136,12.809],[13.136,12.709],[11.136,12.609],
          [10.136,12.509],[8.136,12.509],[6.136,12.509],[3.136,12.509]]
      	//const arrPoint = [[0, 0],[689676, -14675],[631064, 308194],[631064, 523440],
        // [631064, 816958],[562576, 1041989],[141867, 993069],[-396249, 905014]]
      	let _this = this
        var i = 0
        if(e){
          if(_this.vehVector){
            _this.vehVector.getSource().clear()
          }
          var vehSource = new ol.source.Vector({});
          _this.vehVector = new ol.layer.Vector({
            source: vehSource,
            style: new ol.style.Style({
              image:new ol.style.Icon({
                rotation: 0,
                color: "white",
                src: '../../static/img/location.png',
                scale:0.15,
              })
            })
          });
          _this.map.addLayer(_this.vehVector);

          var passRouteSource = new ol.source.Vector({});
          _this.passRouteLayer = new ol.layer.Vector({
            source: passRouteSource,
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({ //边界样式
                color: '#3c42ac',
                width: 3
              }),
              image: new ol.style.Circle({
                radius: 1,
                fill: new ol.style.Fill({
                  color: 'pink'
                })
              }),
            })
          });
          _this.map.addLayer(_this.passRouteLayer);
          var routeArr = [],
          routeArrPoint = []
          function moveRobot(){
            if(vehSource)vehSource.clear();
            var iconFeature = new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform(arrPoint[i], 'EPSG:4326', 'EPSG:3857'), "XY"),
              name: "my Icon",
            });
            vehSource.addFeature(iconFeature);

            routeArrPoint.push(arrPoint[i])
            for (var j = 0, ii = routeArrPoint.length; j < ii; ++j) {
              routeArr.push(
                new ol.Feature({
                  geometry:new ol.geom.Point(ol.proj.fromLonLat(routeArrPoint[j])),
                })
              )
            }
            var geom2 = new ol.geom.LineString(routeArrPoint);
            geom2.transform('EPSG:4326', 'EPSG:3857');
            var feature2 = new ol.Feature({
              geometry:geom2
            });

            passRouteSource.addFeature(feature2);
            passRouteSource.addFeature(iconFeature);
            i++
            if(i>arrPoint.length-1){
              i = 0
              passRouteSource.clear()
              routeArrPoint = []
            }
            _this.timeId = window.setTimeout(moveRobot,1000)
          }
          moveRobot()
        }else {
          window.clearTimeout(_this.timeId)
        }


      },
      addTask(){
        if(this.pointIds==''){
          return
        }
        this.$router.push({
          name: 'robotAddNewTask',
          path: '/robots/add-task',
          params: {
            ids:this.pointIds
          }
        })
      },
      //挂牌
      addPlate(){
    	  //console.log(this.irDataTaskHistoryId)
      	let _this = this
        //如果选点打开先关闭
        if(_this.choosePointText == '停止'){
          _this.choosePointText = '地图选点'
          _this.isShowStopPoint = false
          _this.map.removeInteraction(_this.boxSelect);
          _this.map.removeInteraction(_this.pointmove);
          _this.map.removeInteraction(_this.dragBoxPoint);
        }

        var style = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.2)'
          }),
          stroke: new ol.style.Stroke({
            color: '#ff272e',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        })
        var source = new ol.source.Vector({wrapX:false})

        if(_this.addPlateText == '挂牌'){
          _this.addPlateText = '退出挂牌'

          _this.addPlateVector = new ol.layer.Vector({
            source: source,
            style:style
          })
          _this.map.addLayer(_this.addPlateVector)

          var pointFeatures = _this.geoJsonLayerPoint.getSource().getFeatures()
          var vectorSource = new ol.source.Vector({
            features: pointFeatures
          })

          var routeFeatures = _this.geoJsonLayerRoute.getSource().getFeatures()
          var routeVectorSource = new ol.source.Vector({
            features: routeFeatures
          })

          var routeIdsArr = []

          //框选
          _this.boxSelect = new ol.interaction.Select({
            layers: [_this.geoJsonLayerRoute,_this.geoJsonLayerPoint]
          });
          var selectedFeatures = _this.boxSelect.getFeatures();
          _this.dragBoxPlate = new ol.interaction.DragBox({
            condition: ol.events.condition.platformModifierKeyOnly
          });
          _this.map.addInteraction(_this.dragBoxPlate);
          _this.dragBoxPlate.on('boxend', function() {
            var extent = _this.dragBoxPlate.getGeometry().getExtent();
            vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
              selectedFeatures.push(feature)
            });
            routeVectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
              selectedFeatures.push(feature)
              console.log(feature.getId())
              routeIdsArr.push(feature.getId().slice(6))
            });
            _this.routeId = routeIdsArr.toString()
            //console.log(_this.routeId)
            //console.log(selectedFeatures)
            //console.log(dragBox.getGeometry())
            var geometryFeature = new ol.Feature({geometry:_this.dragBoxPlate.getGeometry()});
            _this.addPlateVector.getSource().addFeature(geometryFeature);
            //console.log(_this.addPlateVector.getSource())
            _this.dialogVisiblePlate = true
            _this.startTime = ''
            _this.endTime = ''
            _this.$emit('isVideo', false)
          });
          _this.dragBoxPlate.on('boxstart', function() {
            selectedFeatures.clear();
            _this.addPlateVector.getSource().clear();
            routeIdsArr = []
          });
          _this.map.on('click', function() {
            selectedFeatures.clear();
            _this.addPlateVector.getSource().clear();
          });
          _this.map.addInteraction(_this.boxSelect);

        }else {
          _this.addPlateText = '挂牌'
          _this.map.removeInteraction(_this.dragBoxPlate);
          _this.map.removeInteraction(_this.boxSelect);
          _this.addPlateVector.getSource().clear();

        }

      },
      addPlateCommit(){
      	let _this = this
        let plateFeatures = _this.addPlateVector.getSource().getFeatures()
        let plateCoordinate = plateFeatures[0].getGeometry().getCoordinates()
        //console.log(plateCoordinate)
        let polygon_d = '';
      	let fence_shp = ''
        plateCoordinate[0].forEach((v, k) => {
          var ol_ep =  ol.proj.transform([v[0],v[1]], 'EPSG:3857', 'EPSG:4326')
          polygon_d += ol_ep[0] + " " + ol_ep[1];
          if (plateCoordinate[0].length != k + 1) {
            polygon_d += ", ";
          }
          fence_shp = 'POLYGON((' + polygon_d + '))'
          //console.log(polygon_d)
        });
        //console.log(fence_shp)
        let addFenceData = {
          startTime:_this.startTime,
          endTime:_this.endTime,
          fenceAngle:fence_shp,
          irBaseDeviceId:4,
          irProjRountIds:_this.routeId,
          isDelete:0,
          fenceName:'test',
        }
        if(!addFenceData.startTime){
          _this.$message({
            message: '请选择开始时间',
          });
          return
        }
        if(!addFenceData.endTime){
          _this.$message({
            message: '请选择结束时间',
          });
          return
        }
        console.log(addFenceData)
        //localStorage.setItem("fence_shp",fence_shp);
        //POST /ui/fence/addFence
        _this.ajax_api('post',url_api + '/fence/addFence',
          addFenceData,
          true,function (res) {
              if(res.code == 200){
                _this.$message({
                  message: '挂牌成功',
                  type: 'success',
                });
                _this.dialogVisiblePlate = false
                _this.plateShow()
              }else {
                _this.$message({
                  message: res.message,
                });
              }
            })

      },
      closeDialog(){
      	let _this = this
        _this.$emit('isVideo', true)
      },
      change11(val,is){
      	let _this = this
        //console.log(val)
        if(is){
          _this[val].setVisible(true)
        }else{
          _this[val].setVisible(false)
        }

      },
      plateShow(){
      	let _this = this
        if(_this.allPlateVector){
          _this.allPlateVector.getSource().clear()
        }

        _this.ajax_api('get',url_api + '/fence',
          {page:1,size:1000},
          true,function (res) {
            //console.log(res)
            if(res.code == 200){
            	let fence_items = res.data.items
              let features = []
              for(let i=0;i<fence_items.length;i++){
            		let wkt = fence_items[i].fenceAngle
                let format = new ol.format.WKT();
                let feature = format.readFeature(wkt,{
                  dataProjection: 'EPSG:4326',
                  featureProjection: 'EPSG:3857'
                });
                let idProperties = {
                	id:fence_items[i].id,
                  startTime:fence_items[i].startTime,
                  endTime:fence_items[i].endTime
                }
                feature.setProperties(idProperties)
                features.push(feature)
              }
              let source = new ol.source.Vector({
                features: features
              });
              let style = new ol.style.Style({
                fill: new ol.style.Fill({
                  color: 'rgba(255, 190, 0, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                  color: '#ff9c68',
                  width: 2
                }),
                image: new ol.style.Circle({
                  radius: 5,
                  fill: new ol.style.Fill({
                    color: '#ffcc33'
                  })
                })
              })
              _this.allPlateVector = new ol.layer.Vector({
                source: source,
                style: style
              })
              _this.map.addLayer(_this.allPlateVector)
              _this.plateMove()
              _this.plateClick()
            }
          })

        //let wkt = localStorage.getItem("fence_shp")
        //console.log(wkt)

      },
      plateMove(){
        let _this = this
        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');
        //点击兴趣点弹出框使用
        var overlay = new ol.Overlay({
          element: container,//设置弹出框的容器
          autoPan: true, //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
          autoPanAnimation: {
            duration: 250
          }
        });
        _this.map.addOverlay(overlay);
        var selectMove = new ol.interaction.Select({
          condition: ol.events.condition.pointerMove,
          layers: [_this.allPlateVector],
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 190, 0, 0.4)'
            }),
            stroke: new ol.style.Stroke({
              color: '#ff3228',
              width: 2
            }),
          })
        });
        _this.map.addInteraction(selectMove);
        selectMove.on('select', function(e) {
          var features=e.target.getFeatures().getArray();
          if (features.length>0){
            var feature=features[0];
            var coordinate = ol.extent.getBottomLeft(feature.getGeometry().getExtent());
            //console.log(feature.get('id'))
            _this.popupStartTime = feature.get('startTime')
            _this.popupEndTime = feature.get('endTime')
            //$('#popup').css({'visibility': 'visible'})
            $('#popup').css({'display': 'block'})
            overlay.setPosition(coordinate);
          }else {
            //$('#popup').css({'visibility': 'hidden'})
            $('#popup').css({'display': 'none'})
          }
        });
      },
      plateClick(){
        let _this = this

        var selectClick = new ol.interaction.Select({
          //condition: ol.events.condition.pointerMove,
          layers: [_this.allPlateVector],
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(190, 190, 0, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#ff0050',
              width: 2
            }),
          })
        });
        var selectedFeatures = selectClick.getFeatures();
        _this.map.addInteraction(selectClick);
        selectClick.on('select', function(e) {
          var features=e.target.getFeatures().getArray();
          if (features.length>0){
            var feature=features[0];
            //alert(feature.getId())
            //console.log(feature.get('id'))
            _this.$confirm('确认取消该挂牌?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              //localStorage.setItem("fence_shp",null)
              //POST /ui/fence/delFence/{id}
              _this.ajax_api('post',url_api + '/fence/delFence/'+feature.get('id'),
                null,
                true,function (res) {
              	  if(res.code==200){
                    _this.$message({
                      type: 'success',
                      message: '取消挂牌成功!'
                    });
                    _this.plateShow()
                    selectedFeatures.clear()
                  }else {
                    _this.$message({
                      message: res.message
                    });
                  }
                })

            }).catch(() => {
              selectedFeatures.clear()
            });
          }
        });
      },

      point_now(){
          let _this = this
          if(_this.vehVector){
              _this.vehVector.getSource().clear()
          }
          var vehSource = new ol.source.Vector({});
          _this.vehVector = new ol.layer.Vector({
              source: vehSource,
              /*style: new ol.style.Style({
                  image:new ol.style.Icon({
                      color: "white",
                      src: '../../static/img/location.png',
                      scale:0.15,
                  })
              })*/
          });

          var passRouteSource = new ol.source.Vector({});
          _this.passRouteLayer = new ol.layer.Vector({
              source: passRouteSource,
              style: new ol.style.Style({
                  stroke: new ol.style.Stroke({ //边界样式
                      color: '#df5ca8',  //#4ec0df
                      width: 2
                  }),
                  image: new ol.style.Circle({
                      radius: 1,
                      fill: new ol.style.Fill({
                          color: 'deeppink'
                      })
                  }),
              })
          });
          _this.map.addLayer(_this.passRouteLayer);
          _this.map.addLayer(_this.vehVector);

          /*var ros = new ROSLIB.Ros({
              url : _this.url
          });
          //console.log(ros)
          ros.on('connection', function() {
              console.log('point.server');
          });*/

          _this.listener = new ROSLIB.Topic({
              ros : _this.ros,
              //name : '/robot_pose',
              name : '/computer_pose',
              messageType : 'robotmsg/robot_pose'
          });
          var routeArr = [],
              routeArrPoint = []
          _this.listener.subscribe(function(message) {
              //console.log(message);
              /*var routeArr = [],
                  routeArrPoint = []*/
                  if(vehSource)vehSource.clear();
                  if(passRouteSource)passRouteSource.clear();
                  var iconFeature = new ol.Feature({
                      geometry: new ol.geom.Point(ol.proj.transform(projRobotXY(message.x,message.z), 'EPSG:4326', 'EPSG:3857'), "XY"),
                      name: "my Icon",
                  });
                  //console.log(message.anglez*180/Math.PI)
                  var rotateDeg = message.anglez*180/Math.PI>0?90:270
                  _this.vehVector.setStyle(
                      new ol.style.Style({
                          image:new ol.style.Icon({
                              rotation: -message.anglez,//+ (270*Math.PI/180)
                              //rotation:270*Math.PI/180,
                              color: "white",
                              src: '../../static/img/location1.png',
                              scale:0.15,
                          }),
                      }),
                  )
                  vehSource.addFeature(iconFeature);

                  routeArrPoint.push(projRobotXY(message.x,message.z))
                  /*routeArr.push(
                      new ol.Feature({
                          geometry:new ol.geom.Point(ol.proj.fromLonLat([message.x,message.y])),
                      })
                  )*/
                  var geom2 = new ol.geom.LineString(routeArrPoint);
                  geom2.transform('EPSG:4326', 'EPSG:3857');
                  var feature2 = new ol.Feature({
                      geometry:geom2
                  });
                  passRouteSource.addFeature(feature2);
                  /*for (var j = 0, ii = routeArrPoint.length; j < ii; ++j) {
                      routeArr.push(
                          new ol.Feature({
                              geometry:new ol.geom.Point(ol.proj.fromLonLat(routeArrPoint[j])),
                          })
                      )
                  }
                  var geom2 = new ol.geom.LineString(routeArrPoint);
                  geom2.transform('EPSG:4326', 'EPSG:3857');
                  var feature2 = new ol.Feature({
                      geometry:geom2
                  });*/
                  //console.log(routeArr)
                  //passRouteSource.addFeature(feature2);
                  //passRouteSource.addFeature(iconFeature);

              //_this.listener.unsubscribe();
          });
      },
      taskExecuteStatus(){
    	  let _this = this
        /*_this.$alert('任务完成', '提示', {  //测试用
          confirmButtonText: '确定',
          callback: action => {
            _this.$root.eventHub.$emit('taskEnd', 'true');
          }
        })*/
        //接收任务是否完成-消息
        _this.listener = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/task_execute_status',
          messageType : 'robotmsg/TaskExecuteStatus'
        });
        _this.listener.subscribe(function(message) {
          //console.log(message.task_status)
          if(message.task_status==0){
            /*_this.$message({
              type: 'success',
              message: '任务完成',
            });*/
            _this.$alert('任务完成', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$root.eventHub.$emit('taskEnd', true);
                //清除计划的线  &  走过的线路
                _this.planLinePointVector.getSource().clear()
                _this.passRouteLayer.getSource().clear()
                sessionStorage.setItem("planLine",'');
              }
            })
          }
        });
      },

      planLineShow(val){
    	  //console.log(val)
        let _this = this
        //console.log(_this.planLinePoint)
        if(_this.planLinePointVector){
            _this.planLinePointVector.getSource().clear()
        }
        var geomPlanLine = new ol.geom.LineString(val);
        geomPlanLine.transform('EPSG:4326', 'EPSG:3857');
        var featurePlanLine = new ol.Feature({
          geometry:geomPlanLine
        });
        _this.planLinePointVector.getSource().addFeature(featurePlanLine);



        //原来的计划线路-开始
        /*var geomPlanLine = new ol.geom.LineString(val);
        geomPlanLine.transform('EPSG:4326', 'EPSG:3857');
        var featurePlanLine = new ol.Feature({
            geometry:geomPlanLine
        });
        _this.planLinePointVector.getSource().addFeature(featurePlanLine);*/
        //原来的计划线路-结束

      },

      //清除任务
      clearTask(){
    	    let _this = this
          /*var ros = new ROSLIB.Ros({
              url : _this.url
          });
          //console.log(ros)
          ros.on('connection', function() {
              console.log('准备清除任务.');
          });*/

          _this.taskServerClear = new ROSLIB.Service({
              ros : _this.ros,
              name : '/taskclear',
              serviceType : 'robotmsg/TaskList'
          });
          _this.taskServerClear.callService({flag:0},function(result) {
              console.log('任务终止');
              _this.$message('任务终止');
              _this.planLinePointVector.getSource().clear()
              sessionStorage.setItem("planLine",'');
          })
      },

      //地图复位
      resetView(){
    	  var _this = this
        var view = _this.map.getView();
        view.setCenter(_this.mapCenter); //初始中心点
        view.setRotation(_this.mapRotation); //初始旋转角度
        view.setZoom(_this.mapZoom);
      },

      //地图编辑
      editMapBtn(){
    	  let _this = this
        var typeSelect = document.getElementById('type');
        var draw; // 在这儿定义一个全局的绘制变量，方便一会去除它
    	  if(_this.editMap=='地图编辑'){
          _this.editMap = '取消编辑'
          $('.map_edit_box').show()
          var stylePoint = new ol.style.Style({
            image: new ol.style.Circle({
              radius: 5,
              fill: new ol.style.Fill({
                color: '#ffbc1e'
              })
            })
          })
          var styleLine = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color:'#6ad864',
              width: 2
            })
          })
          _this.addPointVector = new ol.layer.Vector({
            style: stylePoint,
            source: new ol.source.Vector(),
          })
          _this.addLineVector = new ol.layer.Vector({
            style: styleLine,
            source: new ol.source.Vector(),
          })
          //把layer加入到地图中
          _this.map.addLayer(_this.addLineVector)
          _this.map.addLayer(_this.addPointVector)

          function addInteraction() {
            var value = typeSelect.value; //LineString
            if (value == 'Point') {
              draw = new ol.interaction.Draw({
                source: _this.addPointVector.getSource(),
                type: typeSelect.value
              });
              _this.map.addInteraction(draw);
            }else if(value == 'LineString'){
              draw = new ol.interaction.Draw({
                source: _this.addLineVector.getSource(),
                type: typeSelect.value
              });
              _this.map.addInteraction(draw);
            }
          }

          typeSelect.onchange = function () {
            //先移除上一个Interaction
            _this.map.removeInteraction(draw);
            //再根据typeSelect的值绘制新的Interaction
            addInteraction();
          };

          addInteraction();

        }else if(_this.editMap=='取消编辑'){
          _this.editMap = '地图编辑'
          $('.map_edit_box').hide()
          _this.map.getInteractions().forEach(function (interaction) {
            if (interaction instanceof ol.interaction.Draw) {
              _this.map.removeInteraction(interaction);//pointer
            }
            if (interaction instanceof ol.interaction.Select) {
              _this.map.removeInteraction(interaction);
            }
            if (interaction instanceof ol.interaction.Pointer) {
              _this.map.removeInteraction(interaction);
            }
          });
        }

      },
      //保存绘制
      savePoint(){
        let _this = this
        let pointFeatures = _this.addPointVector.getSource().getFeatures()

        let newPointArr = []
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i); //获取本地存储的Key

          if(key.substr(0,4) == 'addP'){
            newPointArr.push({
              id:key.substr(key.length-1,1),
            })
          }
        }

        //console.log(pointFeatures)
        pointFeatures.forEach((v,k) => {
          //console.log(v,k)
          let plateCoordinate = pointFeatures[k].getGeometry().getCoordinates()
          let ol_ep =  ol.proj.transform([plateCoordinate[0],plateCoordinate[1]], 'EPSG:3857', 'EPSG:4326')
          //console.log(ol_ep)
          let polygon_d = ''
          polygon_d += ol_ep[0] + " " + ol_ep[1];
          let point_shp = 'POINT(' + polygon_d + ')'
          //console.log(point_shp)

          localStorage.setItem('addPoint'+(newPointArr.length+k),point_shp)

        })
        _this.showNewPointLine()
      },
      saveLine(){
        let _this = this
        let lineFeatures = _this.addLineVector.getSource().getFeatures()
        let newLineArr = []
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i); //获取本地存储的Key
          if(key.substr(0,4) == 'addL'){
            //console.log(key + '-p');
            newLineArr.push({
              id:key.substr(key.length-1,1),
              //value:localStorage.getItem(key)
            })
          }
        }
        //console.log(lineFeatures)
        lineFeatures.forEach((w,i) => {
          //console.log(i)
          let line_shp
          let plateCoordinate = lineFeatures[i].getGeometry().getCoordinates()
          let polygon_d = ''
          plateCoordinate.forEach((v, k) => {
            var ol_ep =  ol.proj.transform([v[0],v[1]], 'EPSG:3857', 'EPSG:4326')
            polygon_d += ol_ep[0] + " " + ol_ep[1];
            if (plateCoordinate.length != k + 1) {
              polygon_d += ", ";
            }
            line_shp = 'linestring(' + polygon_d + ')'
          });
          //console.log(line_shp)
          localStorage.setItem('addLine'+(newLineArr.length+i),line_shp)
        })

        _this.showNewPointLine()
      },
      //清除画布
      clearPoint(){
    	  let _this = this
        if(_this.addPointVector){
          _this.addPointVector.getSource().clear();
        }
        if(_this.addLineVector){
          _this.addLineVector.getSource().clear();
        }
      },
      //显示new点线
      showNewPointLine(){
        let _this = this
        if(_this.addPointVector){
          _this.addPointVector.getSource().clear();
        }
        if(_this.addLineVector){
          _this.addLineVector.getSource().clear();
        }

    	  let newPointArr = []
        let newLineArr = []
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i); //获取本地存储的Key
          /*console.log(key);
          console.log(localStorage.getItem(key));//所有value
          console.log("---------------------------------");*/
          if(key.substr(0,4) == 'addP'){
            //console.log(key + '-p');
            newPointArr.push({
              id:key.substring(8),
              value:localStorage.getItem(key)
            })
          }else if(key.substr(0,4) == 'addL'){
            //console.log(key + '-l');
            newLineArr.push({
              id:key.substring(7),
              value:localStorage.getItem(key)
            })
          }
        }
        //console.log(newPointArr)
        //console.log(newLineArr)

        if(_this.allNewPointVector){
          _this.allNewPointVector.getSource().clear()
        }
        if(_this.allNewLineVector){
          _this.allNewLineVector.getSource().clear()
        }

        let featuresPoint = []
        let featuresLine = []
        for(let i=0;i<newPointArr.length;i++){
          //localStorage.removeItem('addPoint'+newPointArr[i].id)
          let wkt = newPointArr[i].value
          let format = new ol.format.WKT();
          let feature = format.readFeature(wkt,{
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          });
          let idProperties = {
            id:newPointArr[i].id,
          }
          //feature.setProperties(idProperties)
          feature.setId(newPointArr[i].id)
          featuresPoint.push(feature)
        }
        for(let i=0;i<newLineArr.length;i++){
          //localStorage.removeItem('addLine'+newLineArr[i].id)
          let wkt = newLineArr[i].value
          let format = new ol.format.WKT();
          let feature = format.readFeature(wkt,{
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          });
          let idProperties = {
            id:newLineArr[i].id,
          }
          feature.setId(newLineArr[i].id)
          featuresLine.push(feature)
        }

        let sourcePoint = new ol.source.Vector({
          features: featuresPoint
        });
        let stylePoint = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: '#ffaf43'
            })
          })
        })
        _this.allNewPointVector = new ol.layer.Vector({
          source: sourcePoint,
          style: stylePoint,
        })

        let sourceLine = new ol.source.Vector({
          features: featuresLine
        });
        let styleLine = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color:'#6ad864',
            width: 2
          })
        })
        _this.allNewLineVector = new ol.layer.Vector({
          source: sourceLine,
          style: styleLine
        })

        _this.map.addLayer(_this.allNewLineVector)
        _this.map.addLayer(_this.allNewPointVector)

      },
      //删除new点线 框选
      onAddOrDel(){
    	  var _this = this
        //选择-删除
        var typeSelect = document.getElementById('type');
        var value = typeSelect.value; //LineString

        if (value == 'delPoint') {
          _this.pointmove = new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            layers: [_this.allNewPointVector]
          })
          var pointFeatures = _this.allNewPointVector.getSource().getFeatures()
          var vectorSource = new ol.source.Vector({
            features: pointFeatures
          })
          _this.delPointArr = []
          //框选
          _this.boxSelect = new ol.interaction.Select({
            layers: [_this.allNewPointVector]
          });
          _this.selectedFeatures = _this.boxSelect.getFeatures();
          _this.dragBoxPoint = new ol.interaction.DragBox({
            //condition : ol.events.condition.always  //默认是always
            condition: ol.events.condition.platformModifierKeyOnly
          });
          _this.map.addInteraction(_this.dragBoxPoint);
          _this.dragBoxPoint.on('boxend', function() {
            var extent = _this.dragBoxPoint.getGeometry().getExtent();
            vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
              _this.selectedFeatures.push(feature)
              //console.log(feature.getId())
              _this.delPointArr.push(feature.getId())
            });
          });
          _this.dragBoxPoint.on('boxstart', function() {
            _this.selectedFeatures.clear();
            _this.delPointArr = []
          });
          _this.map.on('click', function() {
            _this.selectedFeatures.clear();
            _this.delPointArr = []
          });
          _this.map.addInteraction(_this.boxSelect);
          _this.map.addInteraction(_this.pointmove);

        }else if(value == 'delLine'){
          _this.pointmove = new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            layers: [_this.allNewLineVector]
          })
          var pointFeatures = _this.allNewLineVector.getSource().getFeatures()
          var vectorSource = new ol.source.Vector({
            features: pointFeatures
          })
          _this.delPointArr = []
          //框选
          _this.boxSelect = new ol.interaction.Select({
            layers: [_this.allNewLineVector]
          });
          _this.selectedFeatures = _this.boxSelect.getFeatures();
          _this.dragBoxPoint = new ol.interaction.DragBox({
            //condition : ol.events.condition.always  //默认是always
            condition: ol.events.condition.platformModifierKeyOnly
          });
          _this.map.addInteraction(_this.dragBoxPoint);
          _this.dragBoxPoint.on('boxend', function() {
            var extent = _this.dragBoxPoint.getGeometry().getExtent();
            vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
              _this.selectedFeatures.push(feature)
              //console.log(feature.getId())
              _this.delLineArr.push(feature.getId())
            });
          });
          _this.dragBoxPoint.on('boxstart', function() {
            _this.selectedFeatures.clear();
            _this.delLineArr = []
          });
          _this.map.on('click', function() {
            _this.selectedFeatures.clear();
            _this.delLineArr = []
          });
          _this.map.addInteraction(_this.boxSelect);
          _this.map.addInteraction(_this.pointmove);
        }else {
          _this.map.removeInteraction(_this.boxSelect);
          _this.map.removeInteraction(_this.pointmove);
        }

      },
      //确认删除 new 点线
      delNewPointLineY(){
    	  let _this = this
        let delPointArr = _this.delPointArr
        let delLineArr = _this.delLineArr
        //console.log(delPointArr)
        for(let i=0;i<delPointArr.length;i++){
          localStorage.removeItem(`addPoint${delPointArr[i]}`)
        }
        for(let i=0;i<delLineArr.length;i++){
          localStorage.removeItem(`addLine${delLineArr[i]}`)
        }
        _this.showNewPointLine()
        _this.selectedFeatures.clear();
        _this.onAddOrDel()
      },
      //关闭编辑地图小框
      closeEditMap(){
    	  let _this = this
        $('.map_edit_box').hide()
        _this.map.getInteractions().forEach(function (interaction) {
          if (interaction instanceof ol.interaction.Draw) {
            _this.map.removeInteraction(interaction);//pointer
          }
          if (interaction instanceof ol.interaction.Select) {
            _this.map.removeInteraction(interaction);
          }
          if (interaction instanceof ol.interaction.Pointer) {
            _this.map.removeInteraction(interaction);
          }
        });
      },

      //shp转换
      shp_to_json(){
    	  let _this = this
        //请求shp文件
        _this.ajax_api('post',url_api + '/shpfile/shpToGeoJson',
          {
            localUrl: 'D:\\abc\\hubei_s.geojson', //'D:\\0317湖北\\0317湖北\\省界.shp',
            shpUrl: url_img + '/shp/hb/hb_s.shp'
          },
          true,function (res) {
            console.log(res)
        })
      }
    },
    computed:{
      mapPlanLine:function(){
        console.log(planLinePointArr)
        return planLinePointArr
      }
    },
    watch:{
        planLinePoint: function(val,oval){
            this.planLineShow(val)
            //console.log(val,oval)
        }
    },
    destroyed(){
      let _this = this
      if(_this.listener){
          //console.log('unsub')
          _this.listener.unsubscribe();
      }
      _this.ros.close()
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .task_control_wrap
    width 100%
    height 100%
    overflow hidden
    #map
      width 100%
      height 100%
      /*border 1px solid deeppink*/
      background white
      position relative
      .map_fuwei
        width 21px
        height 21px
        position absolute
        top 86px
        left 10px
        z-index 99
        background rgba(0,60,136,.5)
        :hover
          background rgba(10,60,136,.5)
        img
          width 100%
          height 100%
      .map_edit_box
        width 120px
        /*height 184px*/
        position absolute
        top 40px
        right 10px
        z-index 99
        border 1px solid #10a7bf
        background linear-gradient(#e3f2ee, #cae7ee)
        border-radius 3px
        display none
        .map_edit_box_close
          color #10a7bf
          position absolute
          top 5px
          right 5px
          font-size 20px
          cursor pointer
        .select_box
          width 100px
          height 22px
          margin 40px 0 6px 10px
          border 1px solid #10a7bf
        .del_point, .clear_point, .save_point, .save_line
          background #109cb4
          width 100px
          height 24px
          margin 10px auto
          text-align center
          line-height 25px
          color white
          border-radius 5px
          cursor pointer
        .del_point:hover, .clear_point:hover, .save_point:hover, .save_line:hover
          background #10b6ce
      >ul
        background-color: #109cb4;
        border: 1px solid #c6cdd3;
        display flex
        width 100%
        height 30px
        position absolute
        z-index 99
        >li
          float left
          margin 0 16px
          cursor pointer
          >button
            color white
            height 30px
            >:hover
              color #bccacb
          .el-dropdown-link {
            cursor: pointer;
            color: #fff;
            font-size: 12px;
            line-height 30px
          }
          .el-icon-arrow-down {
            font-size: 12px;
          }


      /deep/ .ol-full-screen
        z-index 996
        width 42px
        height 26px
        top 2px
        rhght 30px
        padding 0
        background transparent
        button
          width 100%
          height 100%
          background transparent
          font-weight 500
          font-size 12px
          cursor pointer
          outline none
      /deep/ .ol-zoom
        top 38px
      /deep/ .ol-attribution
        display none
      /deep/ .ol-mouse-position
        margin-top 30px

    .plate_dialog/deep/
      div>>>.el-dialog
        background #d7efec
        width: 500px;
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
      div>>>.el-dialog
        .el-dialog__title
          display inline-block
          position absolute
          font-size 14px
          top 4px
          left 10px

    #popup
      #popup-content
        border 1px solid #d9d9d9
        border-radius 5px
        margin-top 10px
        background white
        padding 5px 12px
        p
          margin 8px 0
          white-space nowrap
</style>
