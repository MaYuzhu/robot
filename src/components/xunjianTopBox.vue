<template>
	<div class="xunjian_wrap">
    <div class="li_xunjian_title">
      <p>巡检类型：</p>
      <div class="all_content">
        <el-radio v-model="radio" v-for="item in radio_items"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-radio>
      </div>
    </div>
    <div class="li_xunjian_title">
      <p>设备区域：</p>
      <div class="all_content all_content_quyu">
        <el-checkbox style="float: left" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-checkbox v-model="moreQuyu" @change="moreQuyuF">查看更多</el-checkbox>
    </div>

    <div class="li_xunjian_title">
      <p>设备类型：</p>
      <div class="all_content all_content_leixing">
        <el-checkbox style="float: left" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-checkbox v-model="moreQuyu" @change="moreQuyuF">查看更多</el-checkbox>
    </div>

	</div>
</template>

<script>
  const cityOptions = ['110kV', '主变', '35kV', '330kV', '330KV', '张掖330kV','1号主变','2号主变' ];
	export default {
    data () {
      return {
        radio: '1',
        radio_items:[
          {
          	value:1,
            label:'全面巡检'
          },
          {
            value:2,
            label:'例行巡视'
          },
          {
            value:3,
            label:'专项巡视'
          },
          {
            value:4,
            label:'特殊巡视'
          },
          {
            value:5,
            label:'紧急任务'
          },
          {
            value:6,
            label:'多光谱任务'
          },
        ],
        checkAll: false,
        checkedCities: ['主变'],
        cities: cityOptions,
        isIndeterminate: true,
        moreQuyu:false
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      moreQuyuF(value){
      	if(value){
          $('.all_content_quyu').height('auto')
        }else {
      		$('.all_content_quyu').height('20px')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .xunjian_wrap
    margin 20px
    .li_xunjian_title
      margin 10px 0
      display flex
      .el-radio
        width 210px
        margin-left 10px

      p
        font-size 14px
        font-weight 600
        width 120px
        text-align right
        margin-right 20px
      .all_content
        width: calc(100% - 380px);
        float: left;
        overflow: hidden;
        .el-radio
          margin-bottom 10px
        .el-checkbox
          width 210px
          margin 0 30px 10px 10px
      .all_content_quyu,.all_content_leixing
        height 20px

</style>
