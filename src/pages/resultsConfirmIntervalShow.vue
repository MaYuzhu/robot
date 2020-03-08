<template>
  <div class="interval_show_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="interval_show_top">
      <p style="font-weight: 600">间隔查询：</p>
      <p><el-input v-model="input" placeholder="请输入内容" size="mini"></el-input></p>
      <p><img src="../../static/images/query.png" alt=""><span>查询</span></p>
    </div>
    <div class="interval_show_content">
      <div class="interval_show_content_left">
        <ul>
          <li v-for="(item,index) in leftOptions" :key="index"  class="left-item" :class="{'is-checked':index==indexIschenked}"
              @click="queryRightContent(index)">{{item}}</li>
        </ul>
      </div>
      <div class="interval_show_content_right">
        <ul>
          <li v-for="(item,index) in rightContent"  class="right-item">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'

  export default {
    data(){
      return{
        title:'设备告警信息确认 > 间隔展示',
        input:'',
        indexIschenked:0,
        leftOptions: ['110kV', '主变', '35kV', '330kV', '330KV', '张掖330kV','1号主变','2号主变' ],
        rightContent: ['1111','1112','110kV','乙母PT','1113','1114','1115','1号主变','1101','1116','1117','1118','2号主变','1102',
        '110kV甲母PT','1119','1120','110kV','母联','1100','1121','1号主变','2号主变'],
      }
    },
    components: {
      HeaderTop,

    },
    methods:{
      queryRightContent(index){
      	//console.log(index)
        this.indexIschenked = index
        if(index==1){
      		this.rightContent = ['1号主变111','2222','3333','1117','1118','2号主变','1102',
            '110kV甲母PT','1119','1120','110kV','母联','1100','1121','1号主变','2号主变']
        }else {
          this.rightContent = ['1111','1112','110kV','乙母PT','1113','1114','1115','1号主变','1101','1116','1117','1118','2号主变','1102',
            '110kV甲母PT','1119','1120','110kV','母联','1100','1121','1号主变','2号主变']
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .interval_show_wrap
    .interval_show_top
      height 30px
      background: linear-gradient(#e3f2ee,#cae7ee);
      border-top: 1px solid #cae7ee;
      display flex
      align-items center
      padding-left 30px
      p
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
      .interval_show_content_left
        width 300px
        border 1px solid #cae7ee
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
        width calc(100% - 300px)
        border 1px solid #cae7ee
        ul
          margin: 10px;
          padding: 3px;
          background-color: #d2e9e5;
          .right-item
            height: 30px;
            min-width: 160px;
            margin: 6px;
            display: inline-block;
            /*background-color: #78ee88;*/
            background : #00ff00;
            text-align: center;
            font-size: 15px;
            line-height: 30px;
            border-radius: 5px;
            -webkit-box-shadow: 0 0 3px 1px rgba(48,53,54,.3);
            box-shadow: 0 0 3px 1px rgba(48,53,54,.3);



</style>
