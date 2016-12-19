
<template>
    <div>
        <div class="self item">
            <img :src="$store.getters.avatar" class="avatar">
            <p>{{$store.state.user.nickname}}<br/><span style="color:#999;">{{$store.state.user.email}}</span></p>
        </div>
        <router-link :to="{name:'download'}" tag="p" class="item">
            <p>下载列表</p>
        </router-link>
        <div class="item">
            <p><router-link :to="{name:'debug'}" tag="span">调试</router-link></p>
        </div>
        <mt-button type="danger" class="out-btn">退出登录</mt-button>
    </div>
</template>
<style scoped>
    .item{
        border:1px solid #eee;
        border-left:none;
        border-right:none;
        margin:-1px 0;
        box-sizing:content-box;
        padding:10px;
        text-align:left;
        color:black;
    }
    .out-btn{
        display:block;
        width:90vw;
        margin:10px 5vw;
    }
    .self{
        display:flex;
        align-items:center;
        margin-bottom:30px;
    }
    .self p{
        margin-left:20px;
    }
    .avatar{
        width:50px;
        height:50px;
        border-radius:50%;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
        }
    }
</script>
