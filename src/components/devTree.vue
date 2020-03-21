<template>
	<div style="width: 300px;height: 668px;border:1px solid #cae7ee">
    <p class="dev_tree_p" style="padding-left:5px;height:30px;line-height:30px;background:linear-gradient(#e3f2ee,#cae7ee);">设备树</p>
    <div>
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">

        <!--<span style="width: 10px;height:10px;background: red;display: inline-block"></span>-->
        <span><i :class="data.icon"></i>
          <span style="width: 13px;height:13px;background:#329632;display: inline-block"></span>
          {{ node.label }}</span>
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
    methods: {
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
      }
    },

    data() {
      return {
        data: [{
          id: 1,
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
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
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

</style>
