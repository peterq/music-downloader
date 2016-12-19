<template>
    <router-link :to="{name:link.to}" @touchstart="touch" @touchend="touch" class="item" :class="{focus}">
        <span class="text">{{link.text}}</span>
        <span class="iconfont icon-youjiantou"></span>
    </router-link>
</template>
<style scoped>
    .item span{
        margin:0 10px;
    }
    .item{
        height:50px;
        color:#000;
        font-size:20px;
        display:flex;
        justify-content:space-between;
        line-height:50px;
        background:white;
    }
    .focus{
        background:#ddd;
    }
</style>
<script>

    export default{
        props:[
            'link',
        ],
        data(){
            return{
                focus:false
            }
        },
        components:{

        },
        methods:{
            touch(){
                this.focus = !this.focus;
                console.log(this.focus)
            }
        }
    }

</script>
