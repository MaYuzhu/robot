<template>
  <div style="width:100%;height:100%;background: #fff">
    <p class="dev_tree_p" style="padding-left:5px;height:30px;line-height:30px;
        background:linear-gradient(#e3f2ee,#cae7ee);">设备树</p>
    <div style="max-height: calc(100% - 30px);overflow: auto">
      <el-tree
        :data="data"
        @node-click="nodeClick()"
        :default-expand-all="false"
        node-key="id" @check="checkedNode"
        ref="tree" show-checkbox
        highlight-current
        :props="defaultProps">
        <span class="custom-tree-node span-ellipsis" slot-scope="{ node, data }">

          <!--<span style="width: 10px;height:10px;background: red;display: inline-block"></span>-->
          <span :title="node.data.name">
            <i :class="node.data.treeNode?'el-icon-s-cooperation':'el-icon-s-order'"></i>
            <span :class="'alarm'+node.data.alarmLevel" style="width:13px;height:13px;display:inline-block"></span>
            {{ node.data.name }}
          </span>
          <!--<span>{{node.data.id}}</span>-->
        </span>

      </el-tree>

      <div class="buttons" v-show="false">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
      </div>
    </div>


  </div>
</template>

<script>
  export default {

    data() {
      return {
        data: [{name: '加载中...',
          /*id: 1,
           icon:"el-icon-menu",
           label: '变电站',
           children: [{
           id: 4,
           label: '110KkV',
           icon: 'el-icon-menu',
           children: [{
           id: 9,
           label: '1102',
           icon: 'el-icon-document'
           }, {
           id: 10,
           label: '1103',
           icon: 'el-icon-document'
           }]
           }]*/
        }],
        defaultProps: {
          children: 'treeNode',
          label: 'label'
        },
        checkedId:[],

      };
    },
    props:['pointIds'],

    mounted(){
      this.getAllDev()
    },

    methods: {
      getAllDev(){
        let _this = this
        _this.ajax_api('get',url_api + '/point/tree',
          null,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res)
              _this.data = res.data
            }
          })
      },
      checkedNode(data,isCheck){
        this.checkedId = this.$refs.tree.getCheckedKeys(true)
        //console.log(this.$refs.tree.getCheckedKeys(true));
        //console.log(data,isCheck)
        this.checkedId = distinct(this.checkedId)
        this.$emit('devTreeKey', this.checkedId)
        function distinct(arr) {
          return Array.from(new Set(arr))
        }
      },

      //node-click节点点击事件
      nodeClick(){
        //console.log(this.$refs.tree.getCurrentKey())
        this.$emit('childKey', {
          id:this.$refs.tree.getCurrentKey(),
          name:this.$refs.tree.getCurrentNode().name
        })
      },


      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
    },
    watch: {
      pointIds:{
        handler(n,o){
          //console.log(n)
          if(n=='0'){
            this.resetChecked()
          }
        }
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dev_tree_p{
    background #ddece8
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .alarm0
    background : #329632;
  .alarm1
    background : #447bff;
  .alarm2
    background : #fdff59;
  .alarm3
    background : #ffaf43;
  .alarm4
    background : #ff3d14;
  .alarmundefined
    background : #37b837;

  .span-ellipsis {
    width: calc(100% - 70px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }

  /*div>>>.el-tree .el-tree-node__content
          display flex!important
  div>>>.el-tree .el-tree-node .el-tree-node__children
          overflow visible!important*/

  div>>>.el-tree
    background #fff
    .el-tree-node
      .is-leaf + .el-checkbox .el-checkbox__inner
        display inline-block
      .el-checkbox__input>.el-checkbox__inner
        display none


</style>
