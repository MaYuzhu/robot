<template>
  <div class="alarm_query_wrap">

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
    <div class="li_xunjian_title">
      <p>告警等级：</p>
      <div class="all_content all_content_leixing">
        <el-checkbox style="float: left" :indeterminate="isIndeterminateDengji" v-model="checkAlldengji" @change="handleCheckAllChangeDengji">全部</el-checkbox>
        <el-checkbox-group v-model="checkedDengji" @change="handleCheckedCitiesChangeDengji">
          <el-checkbox v-for="dengji in dengjis" :label="dengji" :key="dengji">{{dengji}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="li_xunjian_title">
      <p>点位类型：</p>
      <div class="all_content all_content_leixing">
        <el-checkbox style="float: left" :indeterminate="isIndeterminatePoint" v-model="checkAllPoint" @change="handleCheckAllChangePoint">全部</el-checkbox>
        <el-checkbox-group v-model="checkedPoints" @change="handleCheckedCitiesChangePoint">
          <el-checkbox v-for="pointWeizhi in pointsArr" :label="pointWeizhi" :key="pointWeizhi">{{pointWeizhi}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

  </div>
</template>

<script>
  const cityOptions = ['110kV', '主变', '35kV', '330kV', '330KV', '张掖330kV','1号主变','2号主变' ];
  const dengjiOptions = ['预警', '一般告警', '严重告警'];
  const pointsOptions = ['点', '面' ]
  export default {
    data () {
      return {
        checkAll: false,
        checkAlldengji: false,
        checkAllPoint: false,
        checkedCities: ['主变'],
        checkedDengji: ['预警'],
        checkedPoints: [],
        cities: cityOptions,
        dengjis: dengjiOptions,
        pointsArr: pointsOptions,
        isIndeterminate: true,
        isIndeterminateDengji: true,
        isIndeterminatePoint: false,
        moreQuyu:false
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckAllChangeDengji(val){
        this.checkedDengji = val ? dengjiOptions : [];
        this.isIndeterminateDengji = false;
      },
      handleCheckAllChangePoint(val){
        this.checkedPoints = val ? pointsOptions : [];
        this.isIndeterminatePoint = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleCheckedCitiesChangeDengji(value){
        let checkedCount = value.length;
        this.checkAlldengji = checkedCount === this.dengjis.length;
        this.isIndeterminateDengji = checkedCount > 0 && checkedCount < this.dengjis.length;
      },
      handleCheckedCitiesChangePoint(value){
        let checkedCount = value.length;
        this.checkAllPoint = checkedCount === this.pointsArr.length;
        this.isIndeterminatePoint = checkedCount > 0 && checkedCount < this.pointsArr.length;
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
  .alarm_query_wrap
    margin 20px 20px 20px 5px
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
        .el-checkbox
          width 210px
          margin 0 30px 10px 10px
      .all_content_quyu,.all_content_leixing
        height 20px

</style>
