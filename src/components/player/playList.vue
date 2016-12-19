<template>
    <div>
        <div class="mask" @click="$emit('close')"></div>
        <div class="panel" :style="{'background-color':$store.state.player.color.listBackground}">
            <div class="header">
                <div style="width:50%;">
                    <span style="font-size:20px;margin-right:10px;">播放队列</span>
                    <span>{{$store.state.player.playList.length}}</span>
                </div>
                <div class="buttons" style="width:50%;display:flex;align-items:center;">
                    <span class="iconfont icon-tianjiadaogedan" @click="addToMyList"></span>
                    <span class="iconfont" :class="[playModeClass]" @click="$store.commit('changePlayMode')"></span>
                    <span class="iconfont icon-qingkongshanchu" @click="clear"></span>
                </div>
            </div>
            <play-list-item v-for="(songId,index) in $store.state.player.playList" :song-id="songId" :index="index"></play-list-item>
        </div>
    </div>
</template>
<style scoped>
    .mask{
        position:fixed;
        width:100%;
        height:100%;
        bottom:0;
        left:0;
        z-index:20;
    }
    .panel{
        width:100%;
        height:100%;
        background:pink;
        z-index:25;
        color:white;
    }
    .header{
        display:flex;
        padding:10px;
        align-items:center;
        border-bottom:1px solid #aaa;
    }
    .buttons .iconfont{
        width:33.333%;
    }
    .iconfont+.iconfont{
        border-left:1px solid #aaa;
    }
</style>
<script>
    import playListItem from './playListItem'
    export default{
        data(){
            return{
            }
        },
        components:{
            playListItem
        },
        computed:{
            list(){
                console.log('play list',this.$store.state.player.playList)
                return this.$store.state.player.playList;
            },
            playModeClass(){
                return this.$store.getters.playModeClass;
            }
        },
        methods:{
            addToMyList(){
                this.$messagebox({message:'暂未实现此功能'})
            },
            clear(){
                console.log('remove all songs in the play list',this.song)
                this.$store.commit('clearPlayList');
            }
        },

    }
</script>
