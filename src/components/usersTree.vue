<template>
  <div style="width: 300px;height: 668px;">
    <p class="user_tree_title" style="padding-left:5px;height:30px;line-height:30px;background:linear-gradient(#e3f2ee,#cae7ee);">组织结构</p>
    <div>
      <el-tree
        :data="data"

        default-expand-all
        node-key="id"
        ref="tree"
        :highlight-current="true"
        @node-click="nodeClick()"
        :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">

        <!--<span style="width: 10px;height:10px;background: red;display: inline-block"></span>-->
        <span>
          <i :class="data.icon"></i>
          {{ node.label }}
        </span>
      </span>

      </el-tree>

      <div class="buttons" v-show="false">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
        <el-button @click="getCurrentKey">当前 key 获取</el-button>
      </div>
    </div>


  </div>
</template>

<script>
  export default {

    data() {
      return {
        data: [{
          id: 1,
          icon:"el-icon-menu",
          label: '易达图灵',
          children: [{
            id: 4,
            label: '技术部',
            icon: 'el-icon-menu',
            children: [{
              id: 9,
              label: '1102',
              icon: 'el-icon-document'
            }, {
              id: 10,
              label: '监察',
              icon: 'el-icon-document'
            }]
          }]
        }],

        defaultProps: {
          children: 'children',
          label: 'name',
          icon: 'el-icon-document'
        }
      };
    },
    mounted(){
      /*this.$axios({
        method: 'get',
        url: url_api + '/organization/tree',

      }).then(res => {
        console.log(res.data.data)
        this.data = res.data.data
      }).catch(function (err) {
        console.log(err)
      })*/
      this.getTreeData()
    },
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      getCurrentKey(){
        console.log(this.$refs.tree.getCurrentKey());
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

      getTreeData(){
        var _this = this
        _this.ajax_api('get',url_api + '/organization/tree', null, true, function (res) {
          _this.data = res.data
        })
      },
      //node-click节点点击事件
      nodeClick(){
      	//console.log(this.$refs.tree.getCurrentKey())
        this.$emit('childKey', {
        	id:this.$refs.tree.getCurrentKey(),
          name:this.$refs.tree.getCurrentNode().name
        })
      }

    },


  }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  /*.user_tree_title{
    background -ms-linear-gradient(rgb(227, 242, 238), rgb(202, 231, 238))\0
  }*/
  .user_tree_title{
    background :#cae7ee\0;
    /*background :-ms-linear-gradient(rgb(227, 242, 238), rgb(202, 231, 238))\0;*/
    /*filter: progid:DXImageTransform.Microsoft.Gradient(startColorstr="#e3f2ee", endColorstr="#cae7ee", gradientType=0);*/
  }


</style>
