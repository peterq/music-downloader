<template>
    <div style="padding-top:40px;">
        <mt-header fixed title="">
            <div slot="left">
                Music for Leo
            </div>
            <router-link slot="right" to="/player">
                <i class="iconfont icon-music"></i>
            </router-link>
        </mt-header>
        <transition name="fade" mode="out-in">
            <router-view>
            </router-view>
        </transition>
        <mt-tabbar fixed  v-model="tab">
            <mt-tab-item id="search">
                <i class="iconfont icon-sousuo_sousuo" slot="icon"></i>
                搜索
            </mt-tab-item>
            <mt-tab-item id="explore">
                <i class="iconfont icon-faxian" slot="icon"></i>
                发现
            </mt-tab-item>
            <mt-tab-item id="me">
                <i class="iconfont icon-iconfontwohover" slot="icon"></i>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                tab:'search'
            }
        },
        watch:{
            tab:function(name){
                this.$router.push({name})
            }
        },
        created:function(){
           this.tab = this.$router.currentRoute.name;
           this.$router.push({name:this.tab})
        },
        components:{
        },
    }
</script>
