<template>
    <div class="nt">

        <p class="time"><span v-show="popupVisible">发布于:{{notification.created_at}} -- </span><span @touchstart="popupVisible=true" @touchend="popupVisible=false">{{notification.time}}</span></p>
        <p class="title">{{notification.title}}</p>
        <p class="content" v-html="notification.content"></p>
    </div>
</template>
<style scoped>
     .nt{
        border-radius:5px;
        border:1px solid #ddd;
        padding:5px;
        margin:15px 10px;
        text-align:left;
    }
    .time{
        text-align:right;
        color:#ccc;
        padding:5px;
        border-bottom:1px solid #ddd;
    }
    .title{
        font-size:20px;
        padding:15px 5px;
    }
    .content{
        overflow:hidden;
        width:100%;
        padding:10px;
    }
</style>
<script>
    export default{
        props:['notification'],
        data(){
            return{
                popupVisible:false
            }
        },
        components:{
        }
    }

</script>
