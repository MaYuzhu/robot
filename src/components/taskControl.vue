<template>
	<div class="task_control_wrap">
    <select id="selecttype">
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
        <li><el-button type="text" size="mini">任务终止</el-button></li>
        <li @click="addTask">
          <el-button type="text" size="mini" :disabled="addTaskDisabled">创建任务</el-button>
        </li>
        <li><el-button type="text" size="mini">一键返航</el-button></li>
        <li @click="choosePoint">
          <el-button type="text" size="mini">{{choosePointText}}</el-button>
        </li>
        <li @click="removeChoosePoint" v-if="isShowStopPoint">
          <el-button type="text" size="mini">取消选择</el-button>
        </li>
        <li @click="addPlate">
          <el-button type="text" size="mini">挂牌</el-button>
        </li>
        <li>
          <el-dropdown trigger="click" placement="bottom" :hide-on-click=false>
          <span class="el-dropdown-link">
            图层管理<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-checkbox v-model="checked1">停靠点</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-checkbox v-model="checked2">检测点</el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
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
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li @click="test"><el-button type="text" size="mini">test</el-button></li>
        <li><el-button type="text" size="mini"></el-button></li>
      </ul>
      <!--<img src="../../static/aaaa.jpg" style="width: 100%" alt="">-->
    </div>
  </div>
</template>

<script>
  import '../../static/ol/css/ol.css'
  import ol from '../../static/ol/ol.js'

	export default {
    data() {
      return {
        checked1: true,
        checked2: true,
        checked3: true,
        checked4: true,
        checked5: true,
        checked6: true,
        checked7: true,
        map: null,
        geoJsonLayerPoint: null,
        addTaskDisabled:true,
        choosePointText:'地图选点',
        taskStopText:'任务暂停',
        pointmove:null,
        isShowStopPoint:false,
        pointSelect:null,
        boxSelect: null,
        selectedFeatures: null,
        pointIds:'',
      };
    },
    mounted(){
      this.init()

    },
    methods:{
    	init(){
    		let _this = this
        var geoJsonLayer = new ol.layer.Vector({
          title: 'add Layer',
          source: new ol.source.Vector({
            //projection: 'EPSG:4326',
            url: '../../static/route.json',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              stroke: new ol.style.Stroke({
                color:'#49ac73',
                width: 2
              }),

            });
          }
        });
        //console.log("123");
        _this.geoJsonLayerPoint = new ol.layer.Vector({
          title: 'add Layer Point',
          source: new ol.source.Vector({
            //projection: 'EPSG:4326',
            url: '../../static/point.json',
            format:new ol.format.GeoJSON()
          }),
          style: function (feature, resolution) {
            return new ol.style.Style({
              image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                  color: 'orange'
                })
              }),

            });
          }
        });

        _this.map = new ol.Map({
          layers: [
            geoJsonLayer,
            _this.geoJsonLayerPoint
          ],
          target: 'map',
          interactions: ol.interaction.defaults().extend([
            new ol.interaction.DragRotateAndZoom()
          ]),
          view: new ol.View({
            center: [0, 0],
            zoom: 4
          }),
          controls: ol.control.defaults().extend([new ol.control.FullScreen()])
        });

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

        if(_this.choosePointText=='地图选点'){
          _this.choosePointText = '停止'
          _this.isShowStopPoint = true
          _this.pointmove = new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            layers: [_this.geoJsonLayerPoint]
          })
          var pointFeatures = _this.geoJsonLayerPoint.getSource().getFeatures()
          var vectorSource = new ol.source.Vector({
            features: pointFeatures
          })
          //框选
          _this.boxSelect = new ol.interaction.Select({
            layers: [_this.geoJsonLayerPoint]
          });
          var selectedFeatures = _this.boxSelect.getFeatures();
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
            //console.log(selectedFeatures)
            _this.pointIds = '1,2'
          });
          dragBox.on('boxstart', function() {
            selectedFeatures.clear();
          });
          _this.map.on('click', function() {
            selectedFeatures.clear();
          });
          _this.map.addInteraction(_this.boxSelect);
          _this.map.addInteraction(_this.pointmove);

        }else {
          _this.choosePointText = '地图选点'
          _this.isShowStopPoint = false
          _this.map.removeInteraction(_this.boxSelect);
          _this.map.removeInteraction(_this.pointmove);
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
        _this.map.removeInteraction(_this.pointmove)
        _this.map.removeInteraction(_this.boxSelect)
        if(_this.selectedFeatures){
          _this.selectedFeatures.clear()
        }
        _this.isShowStopPoint = false
        _this.choosePointText = '地图选点'
      },
      //任务暂停-继续
      taskStop(){
      	let _this = this
      	if(_this.taskStopText == '任务暂停'){
          _this.taskStopText = '任务继续'
        }else {
          _this.taskStopText = '任务暂停'
        }

      },
      //挂牌
      addPlate(){
      	let _this = this

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
        var source = new ol.source.Vector({wrapX: false});
        var draw = new ol.interaction.Draw({
          geometryName: "draw01",
          source: source,
          type: 'LineString',
          geometryFunction: function(coordinates, geometry){
            if(!geometry){
              geometry = new ol.geom.Polygon(null);       //多边形
            }
            var start = coordinates[0];
            var end = coordinates[1];
            geometry.setCoordinates([
              [
                start,
                [start[0], end[1]],
                end,
                [end[0], start[1]],
                start
              ]
            ]);
            return geometry;
          },
          style: style,
        });

        // 数据源
        var drawSoucre = new ol.source.Vector();
        // 数据源图层，绘图时图层
        var drawLayer = new ol.layer.Vector({
          source: drawSoucre,
          style: style
        });
        $(document).keydown(function (e) {
          if(e.keyCode==17){
            _this.map.addInteraction(draw);
          }
        }).keyup(function (e) {
          if(e.keyCode==17){
            _this.map.removeInteraction(draw);
          }
        })
        _this.map.addLayer(drawLayer)


        draw.on("drawend", function (e) {


          //alert(123)


        });


      },
      addTask(){
        if(this.addTaskDisabled){
          //return
        }
        this.$router.push({
          path:'/robots/add-task',
          query: {
            ids:this.pointIds
          }
        })
      },
      //test
      test(){
      	let _this = this
        var source = new ol.source.Vector({wrapX:false})
        var vector = new ol.layer.Vector({
          source: source
        })
        var pointFeatures = _this.geoJsonLayerPoint.getSource().getFeatures()
        var vectorSource = new ol.source.Vector({
          features: pointFeatures
        })
        //框选
        _this.boxSelect = new ol.interaction.Select({
          layers: [_this.geoJsonLayerPoint]
        });
        var selectedFeatures = _this.boxSelect.getFeatures();
        var dragBox = new ol.interaction.DragBox({
          condition: ol.events.condition.platformModifierKeyOnly
        });
        _this.map.addInteraction(dragBox);
        dragBox.on('boxend', function() {
          var extent = dragBox.getGeometry().getExtent();
          vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
            selectedFeatures.push(feature)
          });
          console.log(dragBox.getGeometry())
          //var geometry = new ol.geom.Polygon(dragBox.getGeometry())
          var geometryFeature = new ol.Feature({geometry:dragBox.getGeometry()});
          vector.getSource().addFeature(geometryFeature);
        });
        dragBox.on('boxstart', function(wh) {
          selectedFeatures.clear();
          console.log(wh)
        });
        _this.map.on('click', function() {
          selectedFeatures.clear();
        });
        _this.map.addInteraction(_this.boxSelect);



        _this.map.addLayer(vector)
        var geometryFunction = function (coordinates, geometry) {
          if(!geometry){
            geometry = new ol.geom.Polygon(null);//多边形
            console.log('xxx')
          }

          var start = coordinates[0];
          var end = coordinates[1];
          geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]]);
          return geometry;
        }
        /*
        var geometryFunction = function (coordinates, geometry) {
          if(!geometry){
            geometry = new ol.geom.Polygon(null);//多边形
            console.log('xxx')
          }

          var start = coordinates[0];
          var end = coordinates[1];
          geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]]);
          return geometry;
        }
        // var geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
        var draw = new ol.interaction.Draw({
          source: source,
          type: 'Circle',
          geometryFunction: geometryFunction,
          maxPoints:2
        })
        _this.map.addInteraction(draw);*/

      }
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
      border 2px solid pink
      background white
      position relative
      >ul
        background-color: #109cb4;
        border: 1px solid #c6cdd3;
        display flex
        width 100%
        height 30px
        position absolute
        z-index 998
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
        z-index 999
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


</style>
