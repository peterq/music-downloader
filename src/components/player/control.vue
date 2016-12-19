<template>
    <div class="control">
        <div class="moreButton" v-if="flase" :class="[likeClass,recommendClass]" :style="{color:$store.state.player.color.buttonIcon}">
            <mt-palette-button  content="+" direction="lt" class="pb"
                               :radius="80" ref="target_1"
                               :mainButtonStyle="'background-color:'+$store.state.player.color.button"
                               style="left:30px;">
                <div class="iconfont icon-fenxiang" @click="share"></div>
                <div class="iconfont icon-xiazai" @click="download"></div>
                <div class="iconfont like" @click="like"></div>
                <div class="iconfont recommend" @click="recommend"></div>
            </mt-palette-button>
        </div>
        <div class="moreBar"  :class="[likeClass,recommendClass]" :style="{color:$store.state.player.color.buttonIcon}">
            <div class="iconfont icon-fenxiang" @click="share"></div>
            <div class="iconfont icon-xiazai" @click="download"></div>
            <div class="iconfont like" @click="like"></div>
            <div class="iconfont recommend" @click="recommend"></div>
        </div>
        <div class="progress" :style="{color:$store.state.player.color.lrc}">
            <span class="current-time">{{time($store.getters.mediaState.currentTime)}}</span>
            <div class="progress-bar" ref="barDom" @click="moveTo">
                <div class="time-mask" :style="{
                                                    background:$store.state.player.color.button,
                                                    width:range
                                               }">
                    <div ref="dotDom" class="dot"></div>
                </div>
            </div>
            <span class="duration">{{time(this.$store.getters.mediaState.duration||0)}}</span>
        </div>
        <div class="buttons">
            <span class="iconfont play-mode"
                  @click="$store.commit('changePlayMode')"
                  :style="{color:$store.state.player.color.buttonIcon}"
                  :class="[$store.getters.playModeClass]"></span>
            <span class="previous iconfont icon-shangyiqu101"
                  @click="playPrevious"
                  :style="{
                      color:$store.state.player.color.buttonIcon,
                      'background-color':$store.state.player.color.button
                  }"></span>

            <span class="play-pause iconfont" :style="{
                      color:$store.state.player.color.buttonIcon,
                      'background-color':$store.state.player.color.button
                  }"
                  :class="[playClass]"
                  @click="$store.commit('playPause')"></span>
            <span class="next iconfont icon-xiayiqu101"
                  @click="playNext"
                  :style="{
                      color:$store.state.player.color.buttonIcon,
                      'background-color':$store.state.player.color.button
                  }"></span>
            <span class="iconfont list icon-bofangliebiao"
                  @click="$emit('show-list')"
                  :style="{color:$store.state.player.color.buttonIcon}">
            </span>
        </div>
        <mt-actionsheet
                :actions="shareActions"
                v-model="shareSheet">
        </mt-actionsheet>
    </div>
</template>
<style scoped>
    .control{
        width:100%;
    }
    .progress{
        display:flex;
        height:30px;
        align-items:center;
    }
    .current-time,.duration{
        width:10%;
        min-width:35px;
        font-size:10px;
    }
    .progress-bar{
        width:90%;
        background:rgba(255,255,255,.4);
        height:3px;
    }
    .time-mask{
        position:absolute;
        top:0;
        left:0;
        height:100%;
    }
    .dot{
        width:6px;
        height:6px;
        border-radius:50%;
        background-color:white;
        position:absolute;
        right:-2.5px;
        top:-1px;
    }
</style>
<style scoped>
    .buttons,.moreBar{
        display:flex;
        align-items:center;
        justify-content:space-around;
        height:90px;
    }
    .moreBar{
        position:absolute;
        width:100%;
        top:-60px;
    }
    .play-mode,.list{
        font-size:18px;
        width:20px;
    }
    .previous::before,.next::before{
        font-size:20px;
        display:block;
        width:40px;
        height:40px;
        line-height:40px;
    }
    .previous,.next{
        border-radius:50%;
    }
    .play-pause::before{
        font-size:35px;
        display:block;
        position:absolute;
        left:15px;
        line-height:65px;
    }
    .play-pause{
        border-radius:50%;
        width:65px;
        height:65px;
    }
    .moreButton{
        position:absolute;
        top:-100px;
        right:50px;
        color:white;
    }
</style>
<style scoped>
    .like:before{
        content:"\e643";
    },
    .recommend:before{
        content:"\e65a";
    }
    .liking .like:before,.recommending .recommend:before{
        display:block;
        content:"\e639";
        animation: rotate 2s linear infinite;
    }
    .liked .like:before{
         content: "\e601";
         color:red;
    }
    .recommended .recommend:before{
        content: "\e62c";
        color:blue;
    }
</style>
<script>
    import {native} from '../../call'
    export default{
        data(){
            return{
                msg:'hello vue',
                shareActions:[
                    {
                        name:'分享到广场',
                        method:s=>this.shareToSquare()
                    },{
                        name:'分享到其他应用',
                        method:s=>this.shareToApp()
                    }

                ],
                shareSheet:false
            }
        },
        components:{
        },
        computed:{
            likeClass(){
                console.log('cur song, ',this.$store.getters.currentSong)
                if(this.$store.getters.isLiking)return 'liking'
                return this.$store.getters.currentSong.liked?'liked':''
            },
            recommendClass(){
                if(this.$store.getters.isRecommending)return 'recommending'
                return this.$store.getters.currentSong.recommended?'recommended':''
            },
            range(){
                 this.$store.state.player.mediaState.currentTime
                 var duration = this.$store.state.player.media.duration;
                 if(duration==0||Number.isNaN(duration))return 0;
                 return (this.$store.state.player.mediaState.currentTime/duration)*100+'%'
            },
            playClass(){
                return this.$store.getters.mediaState.paused?"icon-listbtnorangeplayselect2x":"icon-iconfontzanting"
            }
        },
        methods:{
            time(seconds){
                var duration = ~~seconds
                //console.log('duration',duration)
                var seconds = duration%60
                var minutes = (duration-seconds)/60
                return minutes+':'+(seconds>9?seconds:'0'+seconds)
            },
            playNext(){
                this.$store.dispatch('playNext')
            },
            playPrevious(){
                this.$store.dispatch('playPrevious')
            },
            moveTo(evt){
                if(evt.target==this.$refs.dotDom)return
                //console.log('the progress barn clicked,',evt)
                var range = evt.offsetX/this.$refs.barDom.clientWidth;
                //console.log('to time range,',range);
                this.$store.state.player.media.currentTime = this.$store.getters.mediaState.duration*range
            },
            share(){
                this.shareSheet = !this.shareSheet
            },
            shareToSquare(){
                this.$messagebox.prompt('说点啥吗','').then(({ value, action }) => {
                    value = value||'分享了歌曲'
                    this.$store.dispatch('shareToSquare',value)
                },err=>console.log(err));
            },
            shareToApp(){
                console.log('share to app')
                if(!this.$store.getters.currentSong.id){
                    this.$toast('nothing to share')
                    return
                }
                native.socialShare('我在用leo music 听['+this.$store.getters.currentSong.name+'],分享给你吧',null,null,'http://music.peterq.cn/share/'+this.$store.getters.currentSong.id)
            },
            download(){
                console.log('download')
                this.$store.dispatch('download',this.$store.getters.currentSong)
            },
            like(){
                console.log('like')
                this.$store.dispatch('like');
            },
            recommend(){
                console.log('recommend')
                this.$store.dispatch('recommend')
            }
        }
    }
</script>
