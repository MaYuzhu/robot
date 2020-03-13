<template>
  <div class="my_transfer_wrap">
    <el-row>
      <el-col :span="22">
        <el-transfer v-model="outputListTemp" :data="inputList" :props="alias" target-order="push" @right-check-change="rightCheck">

        </el-transfer>
      </el-col>
      <el-col :span="2" style="margin-top: 95px;">
        <div style="margin-bottom: 10px;">
          <el-button icon="el-icon-arrow-up" circle :disabled="upDownDisable" @click="upData"></el-button>
        </div>
        <div>
          <el-button icon="el-icon-arrow-down" circle :disabled="upDownDisable" @click="downData"></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /*import {
    Message,
    Notification
  } from 'element-ui';*/
  export default {
    name: 'myTransfer',
    props: [
      'value',
      'inputList',
      'alias'
    ],
    data() {
      return {
        upDownDisable:true,
        tempSelectionKeys:[],
        outputListTemp:[]
      }
    },
    watch: {
      value(val) {
        this.outputListTemp = val;
      },
      outputListTemp(val){
        this.$emit('input', val);
      }
    },
    mounted() {

    },
    methods: {
      rightCheck(selectionKeys, changeKeys){
        this.tempSelectionKeys = selectionKeys;
        if(selectionKeys.length > 0){
          this.upDownDisable = false;
        }else{
          this.upDownDisable = true;
        }
      },
      upData(){
        if(this.tempSelectionKeys.length > 1){
          this.$message({
            type: 'warning',
            message: '仅支持单选调顺序'
          });
          return ;
        }
        let indexNum = 0;
        for(let i=0; i<this.tempSelectionKeys.length; i++){
          indexNum = this.outputListTemp.indexOf(this.tempSelectionKeys[i])
          if(indexNum > 0){
            this.outputListTemp.splice(indexNum - 1, 0, this.tempSelectionKeys[i]);
            this.outputListTemp.splice(indexNum + 1, 1);
          }
        }
      },
      downData(){
        if(this.tempSelectionKeys.length > 1){
          this.$message({
            type: 'warning',
            message: '仅支持单选调顺序'
          });
          return ;
        }
        let indexNum = 0;
        for(let i=0; i<this.tempSelectionKeys.length; i++){
          indexNum = this.outputListTemp.indexOf(this.tempSelectionKeys[i]);
          if(indexNum > -1 && indexNum != this.outputListTemp.length - 1){
            this.outputListTemp.splice(indexNum + 2, 0, this.tempSelectionKeys[i]);
            this.outputListTemp.splice(indexNum, 1);
          }
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .my_transfer_wrap
    div>>>
      .el-transfer
        .el-transfer__buttons
          button
            display block
            margin 10px 4px
</style>
