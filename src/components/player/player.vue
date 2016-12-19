<template>
    <div class="page">
        <div class="page"
             :class="{'show-list-page':showList}"
             :style="{'background-color':backgroundColor}">
            <div class="header" :style="{color:$store.state.player.color.buttonIcon}">
                <router-link class="back" :style="{color:$store.state.player.color.buttonIcon}" to="/">
                    <span class="iconfont icon-fanhui"></span>
                </router-link>
                <a class="setting" @click="$emit('setting')">
                    <span class="iconfont icon-shezhi"></span>
                </a>
                <div>
                    <p class="name">{{song.name}}</p>
                    <p class="singer">{{song.singer.join('、 ')}}</p>
                </div>
            </div>
            <div class="poster-lyric"
                 @click="$store.commit('changeFullLrc')"
                 :class="{'full-lrc':fullLrc}">
                <div class="poster">
                    <div class="wrapper" :class="{pause:mediaState.paused}">
                        <div style="padding-top:100%;"></div>
                        <img :src="song.pic">
                    </div>
                </div>
                <lyric class="lyric" :full="fullLrc"></lyric>
            </div>
            <control @show-list="showList=true" class="control"></control>
        </div>
        <transition name="fade-scale">
            <play-list v-show="showList" @close="showList=false" class="play-list"></play-list>
        </transition>
    </div>
</template>

<style scoped>
    .page{
        width: 100vw;
        height: 100vh;
        background:#0e2231;
        top:0;
        overflow:hidden;
    }
    .show-list-page{
        filter: blur(1.1px)
    }

    .header{
        height:50px;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .poster-lyric{
        height:80%;
    }
    .lyric{
        height:30%;
        margin-top:5%;
    }
    .full-lrc .lyric{
        height:90%;
    }
    .name{
        margin-top:0px;
        font-size:18px;
    }
    .singer{
        font-size:12px;
    }
    .back,.setting{
        position: absolute;
        left: 0;
        margin-left:10px;
        font-size:25px;
    }
    .setting{
        left:auto;
        right:0;
        margin-right:10px;
    }
    .poster{
        padding:20px 70px;
        margin: 0 auto;
        max-width: 400px;
        width:100%;
        height:50%;
        z-index: 5;
        -webkit-transition:all 0.5s;
    }
    .poster img{
         display:block;
         top:0;
         left:0;
         width:100%;
         height:100%;
         position: absolute;
         border-radius:50%;
         border:5px solid rgba(255,255,255,.7);
         -webkit-transition:all 0.5s;
    }
    .full-lrc .poster{
        width:0;
        padding:0;
        height:0;
        top:10%;
    }
    .full-lrc img{
        border-width:0;
    }

    .poster .wrapper{
         position:relative;
         -webkit-animation: roll 15s linear infinite;
    }
    .poster .pause{
        animation-play-state:paused;
    }
    .control{
        height:120px;
        bottom:0;
        z-index:10;
        position:absolute;
    }
    .play-list{
        position:fixed;
        width:40vh;
        height:65vh;
        background:blue;
        bottom:130px;
        right:10px;
        z-index:15;
    }
</style>
<script>
    import { mapState,mapGetters } from 'vuex'
    import lyric from './lyric'
    import control from './control'
    import playList from './playList'
    export default{

        data(){
            return{
                showList:false
            }
        },
        components:{
            lyric,
            control,
            playList
        },
        computed:{
            song(){
                //console.log('store',this.$store)
                return this.$store.getters.currentSong
            },
            media(){
                return this.$store.state.player.media
            },
            mediaState(){
                return this.$store.getters.mediaState
            },
            lyricRows(){
                return this.$store.getters.lyric
            },
            lyricText(){
                return this.$store.getters.currentSong.lrc
            },
            backgroundColor(){
                return this.$store.state.player.color.background
            },
            fullLrc(){
                return this.$store.state.player.fullLrc
            }

        }
    }
</script>
