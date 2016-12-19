<template>
    <p :class="{current:current}">
        <span style="displaye:inline-block;" :style="{color}">
            <span>{{row.text}}</span>
            <div class="text-mask" :style="{width:range,color:maskColor}">
                <span>{{row.text}}</span>
            </div>
        </span>
    </p>
</template>
<style scoped>
    p{
        color:white;
        transition: font-size .5s;
        -webkit-transition: font-size .5s;
        font-size:14px;
        padding-top:10px;
    }
    .current{
        color:#00AAAA;
        font-size:20px;
    }
    .text-mask{
        position:absolute;
        left:0;
        top:0;
        color:red;
        overflow:hidden;
        text-align:left;
    }
    .text-mask span{
        text-overflow: clip;
        white-space: nowrap;
    }
</style>
<script>
    export default{

        data(){
            return{
               emitCurrent:false
            }
        },
        mounted(){
            this.current
        },
        props:['row'],
        components:{

        },
        computed:{
            current(){
                var isCurrent = this.$store.getters.timeStage.time == this.row.time;
                if(isCurrent&&!this.emitCurrent&&this.$el){
                    this.$emit('row-active',this)
                    this.emitCurrent = true
                }
                return isCurrent
            },
            range(){
               return this.current?this.$store.getters.timeStage.range*100+'%':'0%'
            },
            maskColor(){
               return this.$store.state.player.color.lrcMask
            },
            currentColor(){
               return this.$store.state.player.color.lrcCurrent
            },
            color(){
               return this.$store.state.player.color[this.current?'lrcCurrent':'lrc']
            }
        }
    }
</script>
