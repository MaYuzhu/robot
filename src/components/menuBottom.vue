<template>
	<div class="menu_bottom_wrap">
    <el-tag :class="{on:currentRoute==tag.path}" style="cursor:pointer;"
      v-for="tag in tags"
      :key="tag.name"
      closable
      :disable-transitions="false"
      @click="routerGo(tag)"
      @close="handleClose(tag)"
      :type="tag.type"
      size="mini">
      {{tag.meta.name}}
    </el-tag>
	</div>
</template>

<script>
	export default {
    data() {
      return {
        tags: [],
        currentRoute:'',
      };
    },
    mounted(){
    	this.tags = routersArr
      //console.log(this.$route.path)
      this.currentRoute = this.$route.path
    },
    methods:{
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
        if(tag.path==this.currentRoute){
        	if(routersArr.length>1){
            this.$router.go(-1)
          }
        }
      },
      routerGo(tag){
        this.$router.push(tag.path)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .menu_bottom_wrap
    width 100%
    position fixed
    z-index 9999
    bottom 0
    background #f0f0f0
    .on
      background #77cccb
      color white
</style>

