<template>
    <div class="container">
        <div class="item" :style="{'transition-delay':aniDelay(index)}" @click="$emit('select',name)" v-for="(text,name,index) in colors" :class="[name==current?'current':'']">
            {{text}}
        </div>
    </div>
</template>

<style scoped>
    .container{
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        height:100%;
    }
    .item{
        padding:10px 10px;
        color:blue;
        margin-top:5px;
        border:1px solid blue;
        border-radius:5px;
        left:50vh;
        transition:left .5s;
    }
    .current{
        background:blue;
        color:white;
    }
</style>
<style>
    .setting .container .item{
        left:0;
    }
</style>
<script>
    export default{
        props:['current'],
        data(){
            return{
                colors:{
                    background:'背景颜色',
                    listBackground:'列表背景',
                    lrc:'歌词颜色',
                    lrcCurrent:'焦点歌词',
                    lrcMask:'歌词遮罩',
                    button:'按钮背景',
                    buttonIcon:'按钮图标'
                },
                index:0
            }
        },
        components:{
        },
        methods:{
            aniDelay(index){
                return ((index++)+1)*0.1+'s'
            }
        }
    }

</script>
