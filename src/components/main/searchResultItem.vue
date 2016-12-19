<template>
    <div>
        <mt-cell-swipe
                :right="rightConfig">
            <div slot="" class="content" @click="play()">
                <img v-lazy="song.pic">
                <div class="meta">
                    <p class="song-name">{{song.name}} <span class="iconfont icon-mv" v-if="song.mv>0"></span></p>
                    <p>{{song.singer.join(" ")}}</p>
                </div>
            </div>
        </mt-cell-swipe>

    </div>
</template>
<style>
    .mint-cell-value{
        width:100%;
    }
    .mint-cell-wrapper{
      padding:0;
    }
</style>
<style scoped>
    img {
        width: 40px;
        height: 40px;
        border-radius:5px;
        margin: auto;
        margin:7.5px 10px;
        display:block;
        float:left;
    }
    .meta{
        height:100%;
        text-align:left;
        padding:10px 5px;
    }
    .icon-mv{
        color:red;
    }
    .song-name{
        font-size:20px;
        color:black;

    }
    img[lazy=loading]{
        background:url('data:image/jpeg;base64,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');
    }
    .content{
       width:100%; height:65px;background:transparent;
    }

</style>
<script>

    export default{
        data(){
            return{
                rightConfig:
                [
                    {
                         content: '下载',
                         style: { background: '#d4d4d4',padding:'10px 30px', color: '#fff' },
                         handler: () => {
                              this.$store.dispatch('download',this.song)
                         }
                    },
                    {
                         content: '稍后播',
                         style: { background: '#ff9b00',padding:'10px 30px', color: '#fff' },
                         handler:()=>{
                             console.log('this',this)
                             this.$toast({message:'已添加到播放队列',position:'bottom'})
                             this.$store.commit('addToPlayList',{songMeta:this.song,index:this.$store.state.player.songIndex+1})
                         }
                    }
                ]
            }
        },
        props:[
            'song'
        ],
        components:{
        },
        methods:{
            play(){
                this.$store.dispatch('playWithMeta',this.song)
                this.$router.push({name:'player'})
                console.log(this.$router)
            }
        }
    }
</script>
