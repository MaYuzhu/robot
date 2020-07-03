<template>
	<div class="task_control_wrap">
    <select id="selecttype" style="display: none">
      <option value="none" selected>None</option>
      <option value="pointSelect">点选</option>
      <option value="toggleSelect">多选</option>
      <option value="boxSelect">框选</option>
      <option value="pointmove">鼠标经过</option>
    </select>
    <div id="map" ref="rootmap">
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
                <el-checkbox v-model="checked1" @change="change11('geoJsonLayerPoint3',checked1)">停靠点</el-checkbox>
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
        <li><el-button type="text" size="mini"></el-button></li>
      </ul>
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
      };
    },
    mounted(){
    	let _this = this

      _this.ros = new ROSLIB.Ros({
          url : _this.url
      });
      //console.log(_this.ros)
      _this.ros.on('connection', function() {
          console.log('point.server');
      });

      _this.init()
      _this.plateShow()
      _this.point_now()
      //_this.planLineShow()
      _this.planLinePoint = planLinePointArr

    },

    methods:{
    	init(){
    		let _this = this
        _this.geoJsonLayerRoute = new ol.layer.Vector({
          title: 'add Layer',
          source: new ol.source.Vector({
            //projection: 'EPSG:4326',
            //url: '../../static/route.json',
            url: '../../static/geojson/route.geojson',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              stroke: new ol.style.Stroke({
                color:'#6abcff',
                width: 2
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
            //url: '../../static/point.json',
            url: '../../static/geojson/stops.geojson',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                  color: '#3837ae'
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
            url: '../../static/geojson/route3.geojson',
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
            url: '../../static/geojson/stops3.geojson',
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
                url: '../../static/geojson/targets3.geojson',
                //url: '../../static/geojson/stops.geojson',
                format:new ol.format.GeoJSON()
            }),
            style: function (feature, resolution) {
                //console.log(feature)
                return new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 3,
                        fill: new ol.style.Fill({
                            color: '#ff5524'
                        })
                    }),
                    text: new ol.style.Text({
                      textAlign: 'center',            //位置
                      textBaseline: 'middle',         //基准线
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

        _this.map = new ol.Map({
          layers: [
            //_this.geoJsonLayerRoute,
            //_this.geoJsonLayerPoint,
            geoJsonLayerRoute3,
            _this.geoJsonLayerPoint3,
            _this.geoJsonLayerPointTargets3
          ],
          target: 'map',
          interactions: ol.interaction.defaults().extend([
            new ol.interaction.DragRotateAndZoom()
          ]),
          view: new ol.View({
            center: [0, 0],
            zoom: 4
          }),
          //controls: ol.control.defaults().extend([new ol.control.FullScreen()]),
          controls: ol.control.defaults().extend([
            new ol.control.FullScreen(),
            //new ol.control.MousePosition()
          ]),

        });

        //计划线路
        var planLineSource = new ol.source.Vector({});
        _this.planLinePointVector = new ol.layer.Vector({
            source: planLineSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({ //边界样式
                    color: '#3a4c69',
                    width: 3
                })
            })
        })
        _this.map.addLayer(_this.planLinePointVector);
        $('.ol-full-screen button').text('全屏')
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
      //任务暂停-继续
      taskStop(){
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
              serviceType : 'yidamsg/TaskControl'
          });
          _this.taskServerClear.callService({flag:1},function(result) {
              console.log('任务暂停');
              _this.$message('任务暂停');
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
              serviceType : 'yidamsg/TaskControl'
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
                        return
                    }
                    if(!res.data){
                        console.log(res.data)
                        return
                    }
                    var linePlanObj = JSON.parse(res.data)
                    var lineArr = []
                    if(lineArr.length>0){
                        lineArr = []
                    }
                    for(var i=0;i<linePlanObj.Tasks.length;i++){
                        var pointArr = linePlanObj.Tasks[i].TLoc.split(";")
                        var point = [pointArr[0]*1,pointArr[2]*1]
                        lineArr.push(point)
                    }
                    planLinePointArr = lineArr
                    _this.planLinePoint = lineArr
                    //console.log(_this.planLinePointVector) //.refresh()
                    _this.planLinePointVector.getSource().refresh()
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
                        serviceType : 'yidamsg/TaskList'
                    });
                    _this.taskServerClear = new ROSLIB.Service({
                        ros : _this.ros,
                        name : '/taskclear',
                        serviceType : 'yidamsg/TaskList'
                    });
                    _this.taskServerClear.callService({flag:0},function(result) {
                        console.log('Clear');
                        var request = new ROSLIB.ServiceRequest({
                            plan : res.data,
                            //plan : JSON.stringify(aa),
                        });

                        _this.taskServer.callService(request, function(result) {
                            console.log(result);
                        });
                    })

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
        //console.log(addFenceData)
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
                      color: '#4ec0df',
                      width: 3
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
              name : '/robot_pose',
              messageType : 'yidamsg/Yida_pose'
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
                      geometry: new ol.geom.Point(ol.proj.transform([message.x,message.z], 'EPSG:4326', 'EPSG:3857'), "XY"),
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

                  routeArrPoint.push([message.x,message.z])
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

      planLineShow(val){
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
              serviceType : 'yidamsg/TaskList'
          });
          _this.taskServerClear.callService({flag:0},function(result) {
              console.log('任务终止');
              _this.$message('任务终止');
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
          console.log('unsub')
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
