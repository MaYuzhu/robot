<template>
	<div style="width:100%;height:100%;border:1px solid #cae7ee;background: #fff">
    <!--<p>{{treeQuery}}</p>-->
    <p class="dev_tree_p" style="padding-left:5px;height:30px;line-height:30px;background:linear-gradient(#e3f2ee,#cae7ee);">设备树</p>
    <div style="max-height: calc(100% - 30px);overflow: auto">
      <el-tree
        :data="dataTree"
        show-checkbox :default-expanded-keys="idArr"
        :default-expand-all="false"
        node-key="id"
        ref="tree" @check="checkedNode"
        highlight-current
        :props="defaultProps">
        <span class="custom-tree-node" slot-scope="{ node, data }">

          <!--<span style="width: 10px;height:10px;background: red;display: inline-block"></span>-->
          <span>
            <i :class="node.data.children?'el-icon-s-cooperation':'el-icon-s-order'"></i>
            <span style="width: 13px;height:13px;background:#329632;display: inline-block"></span>
            {{ node.data.name }}
          </span>
          <span>{{node.data.id}}</span>
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
        dataTree: [{name:'加载中...'}
        	/*{
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
        }*/
        ],
        dataTreeAll:[],
        treeQuery:'111',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        getTreeData:{},
        idArr:[],
        checkedId:[],
      };
    },
    props:['toTreeData'],

    mounted(){
    	let _this = this
      _this.getAllDev()
      _this.ajax_api('get',url_api + '/point/tree',
        null,
        true,
        function (res) {
          if(res.code == 200){
            _this.dataTreeAll = res.data
          }
        })

    },

    methods: {
    	getAllDev(){
    		let _this = this
        _this.ajax_api('get',url_api + '/point/tree',
          _this.getTreeData,
          true,
          function (res) {
            if(res.code == 200){
              //console.log(res.data)
              _this.dataTree = res.data
              _this.dataTree.forEach(m=>{
                _this.idArr.push(m.id) //默认展开
              })
              if(_this.toTreeData.quyu.length>0){
                let newDataQuyu = []
                for(let i=0;i<_this.toTreeData.quyu.length;i++){
                  //console.log(_this.dataTreeAll)
                  if(_this.dataTreeAll.length>0){
                    let li = _this.dataTreeAll[0].children.filter(item => {
                      return item.id == _this.toTreeData.quyu[i].id
                    })
                    newDataQuyu.push(li[0])
                  }

                }
                //console.log(newDataQuyu)
                _this.dataTree = [{
                  id: 4,
                  name: "变电站",
                  irBaseDeviceTypeId: 4,
                  modelLevel: 1000,
                  parentId: 3,
                  children:newDataQuyu
                }]
              }

            }
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
      checkedNode(data,isCheck){
        this.checkedId = []
        this.checkedId.push(isCheck.checkedKeys)
        //console.log(data,isCheck)
        this.checkedId = distinct(this.checkedId)
        this.$emit('devTreeKey', this.checkedId)
        function distinct(arr) {
          return Array.from(new Set(arr))
        }
      },
    },
    watch:{
      /*toTreeData:function (val,old) {
        console.log(val,old)
      }*/
      toTreeData:{
        handler(n,o){
          //console.log(n)
          let _this = this
          _this.treeQuery = n
          if(n.quyu.length>0){
            let newDataQuyu = []

            if(_this.dataTreeAll.length<1){
              _this.getAllDev()

            }else {
              for(let i=0;i<n.quyu.length;i++){
                //console.log(_this.dataTreeAll)
                let li = _this.dataTreeAll[0].children.filter(item => {
                  return item.id == n.quyu[i].id
                })
                newDataQuyu.push(li[0])
              }
              //console.log(newDataQuyu)
              _this.dataTree = [{
                id: 4,
                name: "变电站",
                irBaseDeviceTypeId: 4,
                modelLevel: 1000,
                parentId: 3,
                children:newDataQuyu
              }]
            }
          }else if(n.quyu.length==0){
            _this.dataTree = _this.dataTreeAll
          }

          if(_this.dataTreeAll.length<1){

            _this.getAllDev()
          }else {
            let typeIds = []
            n.type.forEach(m=>{
              typeIds.push(m.id)
            })
            let reconTypeIds = []
            n.recon.forEach(m=>{
              reconTypeIds.push(m.id)
            })
            let meterTypeIds = []
            n.meter.forEach(m=>{
              meterTypeIds.push(m.id)
            })
            let faceTypeIds = []
            n.face.forEach(m=>{
              faceTypeIds.push(m.id)
            })
            _this.getTreeData.devTypeIds = typeIds.toString()
            _this.getTreeData.reconTypeIds = reconTypeIds.toString()
            _this.getTreeData.meterTypeIds = meterTypeIds.toString()
            _this.getTreeData.faceTypeIds = faceTypeIds.toString()

            _this.getAllDev()
          }


        },
        //immediate: true,
        deep: true
      }
    },
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
