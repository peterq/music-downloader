<template>
    <div style="padding-top:44px;">
        <mt-header fixed title="下载列表">
            <router-link slot="left" to="/me">
                <i class="iconfont icon-fanhui"></i>
            </router-link>
        </mt-header>
        <div class="list">
            <p>文件保存在 /leo_music/download 文件夹下</p>
            <item class="item" v-for="item in $store.state.downloadList" :task="item"></item>
        </div>
    </div>
</template>
<style scoped>
    .list{
        padding:10px;
    }
    .item{
        margin-bottom:10px;
    }
</style>
<script>
    import item from './item.vue'
    export default{
        data(){
            return{
            }
        },
        components:{
            item
        },
        computed:{
           downloadingSongs(){
                return this.$store.state.downloadList
           }
        }
    }

</script>
