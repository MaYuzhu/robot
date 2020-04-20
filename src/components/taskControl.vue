<template>
	<div class="task_control_wrap">
    <ul>
      <li><el-button type="text" size="mini" disabled>任务暂停</el-button></li>
      <li><el-button type="text" size="mini">任务终止</el-button></li>
      <li><el-button type="text" size="mini">任务继续</el-button></li>
      <li><el-button type="text" size="mini">一键返航</el-button></li>
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
    </ul>
    <div id="map" ref="rootmap">
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
        map: null
      };
    },
    mounted(){
      this.init()
    },
    methods:{
    	init(){
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
                color: '#f00',
                width: 4
              }),

            });
          }
        });
        console.log("123");

        var map = new ol.Map({
          layers: [
            geoJsonLayer
            //,vectorone
          ],
          target: 'map',
          interactions: ol.interaction.defaults().extend([
            new ol.interaction.DragRotateAndZoom()
          ]),
          view: new ol.View({
            center: [0, 0],
            zoom: 2
          })
        });
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .task_control_wrap
    width 100%
    height 100%
    >ul
      background-color: #109cb4;
      border: 1px solid #c6cdd3;
      display flex
      height 30px
      >li
        float left
        margin 0 16px
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

    #map
      width 100%
      height calc(100% - 36px)
      border 2px solid pink
</style>
