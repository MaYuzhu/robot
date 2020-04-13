<template>
  <div class="xunjian_find_wrap">
    <div style="display: flex">
      <el-input v-model="input_find" placeholder="请输入内容"></el-input>
      <ul>
        <li @click="queryTree"><img src="../../static/images/query.png" alt=""><span>查询</span></li>
        <li @click="save"><img src="../../static/images/save.png" alt=""><span>保存</span></li>
        <li @click="delTaskTable"><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
        <li @click="resetTree"><img src="../../static/images/reset_a.png" alt=""><span>重置</span></li>
        <li v-if="importImg" @click="importTask"><img src="../../static/images/import.png" alt=""><span>任务导入</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input_find: '',
        currentId: '',
        savePutId: '',
        savePutDataResult: {},
      }
    },
    props: {
      saveData: {  // 必须提供字段
        required: false
      },
      savePutData: {  // 必须提供字段
        required: false
      },
      importImg: {   // 可选字段，有默认值
        default: false
      }
    },
    /*props:[
     'saveData',
     'savePutData',
     {
     'aa':Number,

     }
     ],*/
    created() {
      this.$root.eventHub.$on('currentChange', (target) => {
        //console.log(target)
        this.currentTaskTable(target)
      });
      this.$root.eventHub.$on('editTaskDbl', (target) => {
        this.editTaskId(target)
      });
    },
    methods: {
      queryTree() {
        //this.$message('这是一条消息提示');
        if (!this.input_find) {
          this.$message('请输入关键字');
        }
        this.$root.eventHub.$emit('eventName', this.input_find);
      },
      save(){
        let _this = this
        //console.log(_this.saveData)PUT /ui/task/updTask/{id}
        if (_this.savePutId) {
          _this.ajax_api('put', url_api + '/task/updTask/' + _this.savePutId, _this.savePutData, true,
            function (res) {
              if (res.code == 200) {
                _this.$message({
                  message: '任务修改成功',
                  type: 'success',
                });
                _this.$emit('xunjianFind', '1')
              } else {
                _this.$message({
                  message: '操作失败，请重试',
                });
              }
            })
        } else {
          _this.ajax_api('post', url_api + '/task/addTask', _this.saveData, true,
            function (res) {
              if (res.code == 200) {
                _this.$message({
                  message: '任务保存成功',
                  type: 'success',
                });
                _this.$emit('xunjianFind', '1')
              } else {
                _this.$message({
                  message: '操作失败，请重试',
                });
              }
            })
        }

      },
      resetTree(){
        this.input_find = ''
        this.$root.eventHub.$emit('eventName', '');
      },
      currentTaskTable(id){
        //console.log(id)
        this.currentId = id
      },
      delTaskTable(){
        let _this = this
        //console.log(_this.currentId)
        if (!_this.currentId) {
          _this.$message({
            message: '请选择',
          });
          return
        }
        this.$confirm('是否删除该任务?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//DELETE /ui/task/delTask/{id}
          _this.ajax_api('DELETE', url_api + '/task/delTask/' + _this.currentId,
            {}, true,
            function (res) {
              if (res.code == 200) {
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                _this.currentId = ''
                _this.$emit('xunjianFind', '1')
              } else {
                _this.$message({
                  message: '操作失败，请重试',
                });
              }
            })

        }).catch(() => {

        });


      },
      editTaskId(target){
        let _this = this
        _this.savePutId = target
        _this.ajax_api('get', url_api + '/task/info/' + target,
          null,
          true,
          function (res) {
            if (res.code == 200) {
              //console.log(res.data)
              _this.savePutData.description = res.description
              _this.savePutData.irBaseInspectTypeId = res.irBaseInspectTypeId
              _this.savePutData.irBaseRobotId = res.irBaseRobotId
              _this.savePutData.isCustom = res.isCustom
              _this.savePutData.name = res.name
            }
          })
      },

      importTask(){
      	let _this = this
        _this.$emit('importBox', '1')
      },

    },


  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .xunjian_find_wrap
    background #cae7ee \0
    background: linear-gradient(#e3f2ee, #cae7ee);
    border-top: 1px solid #cae7ee;
    padding-left 10px
  div>>>
    height 30px
    .el-input
      float left
      width 180px
      .el-input__inner
        height 30px
        line-height 30px
    ul
      float left
      display flex
      padding-left 30px
      li
        float left
        margin-right 30px
        display flex
        align-items center
        cursor pointer
        img
          width 16px
          height 16px
          margin-right 4px

</style>
