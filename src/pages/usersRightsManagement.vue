<template>
  <div class="management_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="management_content">
      <div class="content_left">
        <div class="left_top">
          <p>角色目录</p>
          <ul style="display: none">
            <li><img src="../../static/images/add.png" alt=""><span>新增</span></li>
            <li><img src="../../static/images/remove.png" alt=""><span>删除</span></li>
          </ul>
        </div>
        <div class="left_content">
          <ul>
            <li style="cursor: pointer" v-for="(item, index) in role_items"
                @click="changeRole(item.displayName)">
              <img src="../../static/images/file.png" alt="">
              {{item.displayName}}
            </li>
          </ul>
        </div>
      </div>
      <div class="content_right">
        <div class="right_top">
          <p>名称：</p>
          <el-input v-model="input" placeholder="请输入内容" style="width: 180px;float: left" size="mini"></el-input>
          <ul>
            <li><img src="../../static/images/query.png" alt=""><span>查询</span></li>
            <li @click="rightsRoleCommit"><img src="../../static/images/save.png" alt=""><span>保存</span></li>
          </ul>
        </div>
        <div class="right_content">
          <el-table ref="table"
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            :select-on-indeterminate="false"
            @select="select"
            @select-all="selectAll"
            @selection-change="selectionChange"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column type="selection"
                             prop="update_date"
                             label="">
            </el-table-column>
            <el-table-column
              prop="displayName"
              label="名称"
              sortable
              width="280">
            </el-table-column>
            <el-table-column
              prop="routeAddress"
              label="地址"
              sortable
              width="380">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新日期">
            </el-table-column>

          </el-table>

          <div style="margin-top: 20px;display: none">
            <el-button @click="cancelAll()">取消选择</el-button>
          </div>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'组织权限设置 > 权限管理',
        role_items:['管理员1','操作员2','普通用户3'],
        input:'',
        tableData: [],
        multipleSelection: [],
        selectArr:[],

        displayName:'',
        name:'',
        isCheckedRoleId:'',
      }
    },
    components: {
      HeaderTop,
      menuBottom
    },
    mounted(){
    	this.getAllPermission()
      this.getAllRole()
    },
    methods:{
      getAllPermission(){
      	let _this = this
        this.ajax_api('get',url_api + '/permission/tree',
          null,true,function (res) {
          //console.log(res.data)
          _this.tableData = res.data
        })
      },
      getAllRole(){
        let _this = this
        this.ajax_api('get',url_api + '/role/roleList',
          null,true,function (res) {
            //console.log(res.data)
            _this.role_items = res.data.items
          })
      },
      changeRole(name){
      	let _this = this
      	//console.log(name)
        let currRole = _this.role_items.filter((item)=>{
      		return item.displayName == name
        })
        //console.log(currRole)
        //_this.toggleSelection(currRole[0].permissions)
        _this.name = currRole[0].name
        _this.displayName = currRole[0].displayName
        if(_this.displayName=='管理员'){
          _this.isCheckedRoleId = '1'
        }else if(_this.displayName=='操作员'){
          _this.isCheckedRoleId = '2'
        }else {
          _this.isCheckedRoleId = '3'
        }

        let a = []
        currRole[0].permissions.forEach(res=>{
          a.push(res.id.toString())
        })         //分割成数组
        //console.log(a)
        let b = []
        this.tableData.forEach(res=>{                  //把表格里所有的id加入到b里
          //b.push(res.id.toString())
          res.children.forEach(res2=>{
          	if(res2.children){
              res2.children.forEach(res3=>{
                b.push(res3.id.toString())
                //console.log(isInArray(a,res3.id.toString()))
                if(isInArray(a,res3.id.toString())){
                  _this.toggleSelection(res3, true)
                }else {
                  _this.toggleSelection(res3, false)
                }
              })
            }


          })
        })
        //var arr = ['a','s','d','f'];
        //console.info(isInArray(arr,'a'));//循环的方式

        /**
         * 使用循环的方式判断一个元素是否存在于一个数组中
         * @param {Object} arr 数组
         * @param {Object} value 元素值
         */
        function isInArray(arr,value){
          for(var i = 0; i < arr.length; i++){
            if(value === arr[i]){
              return true;
            }
          }
          return false;
        }
        //console.log(b)
        // console.log(typeof(b[0]))
        for(let c = 0;c<b.length;c++){                 //对b循环  如果b里面有a（a是被选中的行） 则把索引代入到first函数里 让这些行的复选框选中
          // console.log(b[c])
          // console.log(a.indexOf(b[c]))
          if(b.indexOf(a[c])>=0){
            //console.log(a.indexOf(b[c]))
            //this.toggleSelection(a[c],true)
          }
        }


      },

      select (selection, row) {
        if (selection.some(el => { return row.id === el.id })) {
          if (row.children) {
            row.children.map(j => {
              this.toggleSelection(j, true)
              if(j.children){
                j.children.map(k=>{
                  this.toggleSelection(k, true)
                })
              }
            })
          }
        } else {
          if (row.children) {
            row.children.map(j => {
              this.toggleSelection(j, false)
              if(j.children){
                j.children.map(k=>{
                  this.toggleSelection(k, false)
                })
              }
            })
          }
        }
      },
      selectAll (selection) {
        // tabledata第一层只要有在selection里面就是全选
        const isSelect = selection.some(el => {
          const tableDataIds = this.tableData.map(j => j.id)
          return tableDataIds.includes(el.id)
        })
        // tableDate第一层只要有不在selection里面就是全不选
        const isCancel = !this.tableData.every(el => {
          const selectIds = selection.map(j => j.id)
          return selectIds.includes(el.id)
        })
        if (isSelect) {
          selection.map(el => {
            if (el.children) {
              el.children.map(j => {
                this.toggleSelection(j, true)
                if(j.children){
                  j.children.map(k=>{
                    this.toggleSelection(k, true)
                  })
                }
              })
            }
          })
        }
        if (isCancel) {
          this.tableData.map(el => {
            if (el.children) {
              el.children.map(j => {
                this.toggleSelection(j, false)
                if(j.children){
                  j.children.map(k=>{
                    this.toggleSelection(k, false)
                  })
                }
              })
            }
          })
        }
      },
      selectionChange (selection) {
        this.selectArr = selection
        //console.log(this.selectArr)

      },
      toggleSelection (row, select) {
        if (row) {
          this.$nextTick(() => {
            this.$refs.table && this.$refs.table.toggleRowSelection(row, select)
          })
        }
      },
      cancelAll () {
        this.$refs.table.clearSelection()
      },
      rightsRoleCommit(){
        let _this = this
      	let roleRights = []
        let updateRoleRights = {
          name:_this.name,
          displayName:_this.displayName,
          permissionIds:''
        }
        //console.log(this.selectArr)
        this.selectArr.forEach(res=>{                  //把表格里所有的id加入到b里
          //b.push(res.id.toString())
          //console.log(res)
          roleRights.push(res.id.toString())
        })
        //console.log(roleRights)
        if(roleRights.length<1){
          this.$message({
            message: '请选择权限',
          });
          return
        }
        updateRoleRights.permissionIds = roleRights.toString()
        //console.log(updateRoleRights)
        this.ajax_api('put',url_api + '/role/updRole/' + _this.isCheckedRoleId,
          updateRoleRights,
          true, function (res) {
            if(res.code == 200){
              _this.$message({
                message: '修改成功',
                type: 'success',
              });
              _this.getAllPermission()
              _this.getAllRole()
            }else {
              _this.$message({
                message: '操作失败，请重试',
              });
            }
        })
      },

    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .management_wrap
    width 100%
    height 100%
    .management_content
      width 100%
      height calc(100% - 70px)
      display flex
      .content_left
        float left
        width 300px
        height 100%
        border 1px solid #cae7ee
        background white
        box-sizing border-box
        .left_top
          height 30px
          display flex
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee)
          align-items center
          padding-left 10px
          box-sizing border-box
          p
            float left
          ul
            float left
            display flex
            padding-left 5px
            li
              float left
              margin 0 30px
              display flex
              align-items center
              cursor pointer
              img
                width 16px
                height 16px
                margin-right 4px

        .left_content
          height calc(100% - 30px)
          background white
          float left
          ul
            li
              display flex
              align-items center
              margin  10px 20px
              img
                width 16px
                height 16px
                margin-right 4px

      .content_right
        width calc(100% - 302px)
        background white
        float left
        .right_top
          width 100%
          height 30px
          display flex
          background #cae7ee\0
          background linear-gradient(#e3f2ee,#cae7ee)
          align-items center
          padding-left 10px
          box-sizing border-box
          p
            float left
          ul
            float left
            display flex
            padding-left 5px
            li
              float left
              margin 0 30px
              display flex
              align-items center
              cursor pointer
              img
                width 16px
                height 16px
                margin-right 4px

        .right_content
          height calc(100% - 30px)
          overflow-y auto
</style>
