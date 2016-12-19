<template>
    <div class="item" :class="{current}">
        <div v-show="current" class="img">
            <img :src="song.pic">
        </div>
        <div class="order" v-show="!current">{{order}}</div>
        <div @click="$store.dispatch('playSongInThePlayList',index)" class="text">
            <p class="name">{{song.name}}</p>
            <p class="singer">{{song.singer.join(' ')}}</p>
        </div>
        <div class="delete" @click="$store.commit('deleteSongInPlayList',index)"><span class="iconfont icon-qingkongshanchu"></span></div>
    </div>
</template>
<style scoped>
img{
    with:80px;
    height:30px;
    display:block;
    border-radius:50%;
}
.img,.order{
    width:15%;
}
.text{
    width:70%;
}
.delete{
    width:15%;
}
.item{
    height:50px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    padding:10px;
}
.current{
    background:rgba(255,255,255,.3)
}
.text{
    text-align:left;
    font-size:14px;
    color:#eee;
}
.name{
    font-size:16px;
    color:white;
}
</style>
<script>
    export default{
        props:[
            'songId',
            'index'
        ],
        data(){
            return{
            }
        },
        components:{
        },
        computed:{
            song(){
                return this.$store.state.player.songMeta[this.songId]
            },
            current(){
                return this.$store.state.player.songIndex == this.index
            },
            order(){
                return (this.index<9?'0':'')+(this.index+1)
            }
        }
    }
</script>
