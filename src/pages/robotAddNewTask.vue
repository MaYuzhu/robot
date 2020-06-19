<template>
	<div class="add_task_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="center">
      <XunjianFindTool @xunjianFind="xunjianFind" :saveData="saveData"
                       :savePutData="savePutData"></XunjianFindTool>
      <div class="content">
        <div class="left">
          <devTree @devTreeKey="treeCheck" :toTreeData="toTreeData"></devTree>
        </div>
        <div class="right">
          <taskTable v-if="taskTableReset" :irBaseRobotId="irBaseRobotId"
                     :irBaseInspectTypeId="irBaseInspectTypeId"></taskTable>
        </div>
      </div>
    </div>
    <menuBottom></menuBottom>
	</div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'
  import devTree from '../components/devTree.vue'
  import taskTable from '../components/tasksTable.vue'
  import XunjianFindTool from '../components/xunjianFindTool.vue'
	export default {
  	data(){
  		return{
        title:'机器人管理 > 创建任务',
        toTreeData:{
          quyu:[],
          type:[],
          recon:[],
          meter:[],
          face:[]
        },
        taskTableReset:true,
        irBaseRobotId:1,
        irBaseInspectTypeId:1,
        saveData:{
          description:'',
          irBaseInspectTypeId:'1',
          irBaseRobotId:1,
          isCustom:'0',
          name:'map_test',
          points:'',
        },
        savePutData:{},
        ids: this.$route.params.ids,
      }
    },
    mounted(){
      console.log(this.ids)
      this.saveData.points = this.ids
      //this.saveData.points = '32,37'
    },
    methods:{
      treeCheck(data){
        //console.log(data)
      },
      //刷新任务列表
      xunjianFind(){
        this.taskTableReset = false;
        this.$nextTick(() => {
          this.taskTableReset = true;
        });
      },
    },
    components: {
      HeaderTop,
      taskTable,
      menuBottom,
      devTree,
      XunjianFindTool
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .add_task_wrap
    height 100%
    .center
      height calc(100% - 90px)
      .content
        width 100%
        height calc(100% - 30px)
        .left
          width 300px
          height 100%
          float left
        .right
          width calc(100% - 300px)
          height 100%
          float left
          background white

</style>
