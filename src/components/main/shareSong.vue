<template>
    <div class="item" @click="play">
        <img :src="song.pic">
        <div class="text">
            <p class="name">{{song.name}}</p>
            <p class="singer">{{song.singer.join(' ')}}</p>
        </div>
    </div>
</template>
<style scoped>
    p{
       text-align:left;
    }
    .item{
        display:flex;
        align-items:center;
        background:rgb(245,245,245);
    }
    img{
        display:block;
        width:50px;
        height:100%;
        margin-right:15px;
    }
    .name{
        font-size:16px;
    }
    .singer{
        color:#ccc;
    }
</style>
<script>
    import config from '../../config'
    export default{
        props:['song-id'],
        data(){
            return{
                song:{
                    name:'加载中',
                    singer:[],
                    pic:config.staticRoot+'image/disc_default_text.png'
                }
            }
        },
        created:function(){
            this.$store.dispatch('getSongMeta',this.songId).then(function(songMeta){
                this.song = songMeta;
            }.bind(this))
        },
        components:{
        },
        methods:{
            play(){
                console.log('play share',this.song)
                this.$store.dispatch('playWithMeta',this.song)
                this.$router.push({name:'player'})
            }
        }
    }

</script>
