<template>
  <div class="interval_show_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="interval_show_top">
      <p style="font-weight: 600">间隔查询：</p>
      <p><el-input v-model="input" placeholder="请输入内容" size="mini"></el-input></p>
      <p @click="findDev"><img src="../../static/images/query.png" alt=""><span>查询</span></p>
    </div>
    <div class="interval_show_content">
      <div class="interval_show_content_left">
        <ul>
          <li v-for="(item,index) in leftOptions" :key="index"  class="left-item"
              :class="{'is-checked':item.id==indexIschecked}"
              @click="queryRightContent(item.id)">{{item.name}}</li>
        </ul>
      </div>
      <div class="interval_show_content_right" v-loading="loading">
        <ul>
          <li @click="dialogVisible(item.id,item.name)" v-for="(item,index) in rightContent"
              class="right-item" :class="'alarm'+item.alarmLevel">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <ShowAlertBox :dialogVisible="show_box_visible" @childVisible="isVisible"
                  :title_dev="title_dev" :title_dev_id="title_dev_id"></ShowAlertBox>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import ShowAlertBox from '../components/intervalShowAlertBox.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'设备告警信息确认 > 间隔展示',
        show_box_visible:false,
        title_dev:'',
        title_dev_id:'',
        input:'',
        indexIschecked:0,
        leftOptions: [],
        rightContent: [],
        loading:true,
      }
    },
    components: {
      HeaderTop,
      ShowAlertBox,
      menuBottom
    },
    mounted(){
    	this.init()
    },
    methods:{
    	init(){
    		let _this = this
        _this.ajax_api('get',url_api + '/device/region',null,true,function (res) {
          //console.log(res.data)
          if(res.code == 200){
            _this.leftOptions = res.data
            _this.indexIschecked = res.data[0].id
            _this.queryRightContent(_this.indexIschecked)
          }
        })
      },
      queryRightContent(index){
        let _this = this
        _this.loading = true
        _this.indexIschecked = index
        _this.ajax_api('get',url_api + '/device/intervals',
          {deviceRegionId:index},
          true,function (res) {
          //console.log(res.data)
          if(res.code == 200){
            _this.rightContent = res.data
            _this.loading = false
          }
        })

      },
      dialogVisible(id,name){
      	this.show_box_visible = true
        this.title_dev = name
        this.title_dev_id = id
      },
      isVisible: function (childValue) {
        // childValue就是子组件传过来的值
        this.show_box_visible = childValue
      },
      findDev(){
      	let _this = this
        let stringInput = _this.input.trim()
      	if(stringInput == ''){
          _this.$message({
            message: '请输入内容',
          })
          return
        }
        _this.loading = true
        _this.ajax_api('get',url_api + '/device/intervals',
          {intervalName:stringInput},
          true,function (res) {
            //console.log(res.data)
            if(res.code == 200){
              _this.rightContent = res.data
              _this.loading = false
            }
          })


      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .interval_show_wrap
    height 100%
    .interval_show_top
      height 30px
      background #e3f2ee\0
      background: linear-gradient(#e3f2ee,#cae7ee);
      border-top: 1px solid #cae7ee;
      display flex
      align-items center
      padding-left 30px
      p
        float left
        margin 0 10px
        display flex
        align-items center
        cursor pointer
        img
          width 16px
          height 16px
          margin-right 4px
    .interval_show_content
      display flex
      border 1px solid #cae7ee
      height calc(100% - 124px)
      .interval_show_content_left
        width 300px
        min-height 500px
        overflow-y auto
        border 1px solid #cae7ee
        float left
        box-sizing border-box
        .left-item
          width: 260px;
          height: 80px;
          margin: 10px auto;
          background-color: #d2e9e5;
          text-align: center;
          font-size: 18px;
          line-height: 80px;
          border-radius: 5px;
        .is-checked
          background-color: #cdc0e5;
      .interval_show_content_right
        width calc(100% - 302px)
        border 1px solid #cae7ee
        float left
        box-sizing border-box
        ul
          margin: 10px;
          padding: 3px;
          background-color: #d2e9e5;
          overflow hidden
          .right-item
            float left
            height: 30px;
            min-width: 160px;
            margin: 6px;
            display: block;
            /*background-color: #78ee88;*/
            text-align: center;
            font-size: 15px;
            line-height: 30px;
            border-radius: 5px;
            -webkit-box-shadow: 0 0 3px 1px rgba(48,53,54,.3);
            box-shadow: 0 0 3px 1px rgba(48,53,54,.3);
            cursor pointer
          .alarm0
            background : #00f100;
          .alarm1
            background : #447bff;
          .alarm2
            background : #fdff59;
          .alarm3
            background : #ffaf43;
          .alarm4
            background : #ff3d14;



</style>
