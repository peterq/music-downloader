<template>
    <div  style="padding-top:40px;">
        <mt-header fixed :title="title">
            {{title}}
            <a slot="left" @click="$router.go(-1)">
                <i class="iconfont icon-fanhui"></i>
            </a>
        </mt-header>
        <router-view @setting-title="settingTitle">
            <h1>hello world</h1>
        </router-view>
    </div>
</template>


<style scoped>

</style>
<script>
    export default{
        data(){
            return{
                title:'设置'
            }
        },
        components:{
        },
        computed:{
        },
        methods:{
            settingTitle(t){
                //console.log(s)
                this.title = t
            }
        }
    }

</script>
