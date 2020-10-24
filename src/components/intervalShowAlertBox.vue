<template>
	<div class="show_alert_wrap">
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="content_box">
        <span class="title_dev">{{title_dev}}</span>
        <ul>
          <li v-for="(item, index) in items">
            <span class="alarm" :class="'alarm'+item.alarmLevel"></span>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      </span>
    </el-dialog>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible_: this.show_box_visible,
        items:[]
      };
    },
    props:['dialogVisible','title_dev','title_dev_id'],
    mounted(){
    	this.getContentAlarm()
    },
    methods: {
    	getContentAlarm(){
        let _this = this
        _this.ajax_api('get',url_api + '/device/interval-devices',
          {intervalId:_this.title_dev_id},
          true,function (res) {
            //console.log(_this.title_dev_id)
            if(res.code == 200){
              //console.log(res.data)
              _this.items = res.data
            }
          })
      },
      handleClose(done) {
        /*this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});*/
        this.dialogVisible_ = false
        this.$emit('childVisible', this.dialogVisible_)
      },

    },
    watch:{
      title_dev_id:function (newVal,oldVal) {
        let _this = this
        //console.log(newVal)
        _this.getContentAlarm()
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .show_alert_wrap
    .content_box
      margin 0
      .title_dev
        display inline-block
        position absolute
        top 10px
        left 8px
      >ul
        background white
        padding 8px
        overflow hidden
        >li
          border 1px solid
          /*width 25%*/
          min-width 25%
          float left
          height: 36px;
          display flex
          justify-content center
          align-items center
          box-sizing border-box
          line-height 36px
          span
            display inline-block
            margin 0 10px
            margin-right 5px
          .alarm
            width 16px
            height 16px
            border-radius 50%
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

    div>>>.el-dialog
      background #d7efec
      width: 65%;
      min-width: 880px;
      padding-bottom: 2px;
    div>>>.el-dialog__body
      padding 2px 5px 7px
    div>>>.el-dialog__footer
      padding 0
    div>>>.el-dialog__headerbtn
      top 8px
      right 8px

</style>
