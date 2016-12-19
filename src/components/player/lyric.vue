<template>
    <div class="view">
        <div class="top-mask" :style="{'background':topMaskColor}"></div>
        <div class="lrc-box" :style="{top:top}">
            <lyric-row v-for="(row,index) in rows" :ref="index" @row-active="rowActived" :row="row"></lyric-row>
        </div>
        <div class="bottom-mask" :style="{'background':bottomMaskColor}"></div>
    </div>
</template>
<style scoped>
    .lrc-box{
        top:100px;
        width:100%;
        position:absolute;
        transition:top 1s;
        font-family:youyuan;
    }
    .view{
        overflow:hidden;
    }
    .top-mask,.bottom-mask{
        position:absolute;
        z-index:2;
        background:transparent;
        width:100%;
        height:20%;
    }
    .bottom-mask{
        bottom:0;
    }
</style>
<script>
    import lyricRow from './lyricRow'
    export default{
        props:[
            'full'
        ],
        data(){
            return{
                top:'30px',
                firstRow:null,
                currentRow:null,
            }
        },
        watch:{
           full:function(newVal){
               this.rowActived(this.currentRow)
           }
        },
        mounted(){
            //console.log('lyric mounted',this.topMaskColor)
            //this.rowActived(this.firstRow)
        },
        components:{
            lyricRow
        },
        methods:{
            rowActived(row){
                var lrcBox = this.$el;
                if(!lrcBox){
                    this.firstRow = row
                    return
                }

                this.currentRow = row
                if(!row)return//解决没有播放音乐时,手动激活当前行的bug
                var rowDom = row.$el;
                var top = lrcBox.offsetHeight*0.5-rowDom.offsetTop
                this.top = top+'px'
            }
        },
        computed:{

            rows(){
                return this.$store.getters.rows
            },
            topMaskColor(){
                var c = this.$store.state.player.color.background
                return "-webkit-gradient(linear, 0% 0%, 0% 100%,from("+c+"), to(rgba(0,0,0,0)))"
                //return this.$store.state.player.color.background
            },
            bottomMaskColor(){
                 var c = this.$store.state.player.color.background
                return "-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgba(0,0,0,0)), to("+c+"))"
            }
        },

    }
</script>
