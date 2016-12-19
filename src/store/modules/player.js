import api from '../api'
import lyric from './lyric'
import Vue from 'vue'
import config from '../../config'

var vm = new Vue({

})
console.log('new vue instance from player store',vm)
const state = {
    justForDigest:{currentSong:0},
    loadingSongDetail:false,
    media:new Audio(),//html5 audio instance
    songIndex:-1,//current song index in the play list
    playList:[],//play list
    songData:{},//song data cache
    songMeta:{},//song meta cache
    mediaState:{
        initialized:false,// if the refresh function started
        currentTime:0,
        paused:true,
        duration:0,
        ended:false,
    },//media state refers to the audio instance,it will be refreshed by a function in which request animation frame api is called
    playMode:1,//play mode,it's a index in the const playModes
    color:{
        background:'#0e2231',
        listBackground:'#a883e6',
        lrc:'white',
        lrcCurrent:'#00AAAA',
        lrcMask:'red',
        button:'#a883e6',
        buttonIcon:'white'
    },//the view color of the play page
    fullLrc:false,//whether the lyric view is full page(without a poster)
    playTask:0,//record the newest play task to avoid older play request(long time task due to get data by net work) abort current play
    taskStatus:{},//recode the task status
}
const playModes = [
    {
        name:'随机播放',
        icon:'icon-brackets_random',
        next(current,length){
            //console.log('get next index',{current,length})
            var random = ~~(Math.random()*length)
            while (random==current&&length>1){
                random = ~~(Math.random()*length)
            }
            return random
        },
        previous(current,length){
            return this.next(current,length)
        }
    },{
        name:'顺序播放',
        icon:'icon-shunxubofang',
        next:(current,length)=>++current==length?0:current,
        previous:(current,length)=>--current==0?0:length-1
    },{
        name:'单曲循环',
        icon:'icon-danquxunhuan',
        next:current=>current,
        previous:current=>current
    }
]

const getters = {
    //get the current song data
    currentSong:state=>{
        state.justForDigest.currentSong
        console.log('song index',state.songIndex)
        if(state.songIndex<0)return {
            "liked": false,
            "recommended": false,
            "id": 0,
            "name": "Programed by PeterQ",
            "mv": 0,
            "pic": config.staticRoot+"image/disc_default_text.png",
            "singer": [
                "Music for Leo"
            ],
            url:'',
            "lrc":'[59:00.00]try to play a song,my leo',
            expire:0
        }
        var songMeta = state.songMeta[state.playList[state.songIndex]]
        const loadingValue = {
            "liked": false,
            "recommended": false,
            "id": songMeta.id,
            "name": songMeta.name,
            "mv": songMeta.mv,
            "pic": songMeta.pic,
            "singer": songMeta.singer,
            "lrc":"[59:00.00] analysing the song resource url\n[59:00.01]please waite...",
            'expire':0
        };
        return state.loadingSongDetail?loadingValue:state.songData[state.playList[state.songIndex]]
    },
    //get the mediaState by getter,the refresh function is built in
    mediaState(state){
        if(!state.mediaState.initialized){
            function refresh() {
                [
                    'currentTime',
                    'paused',
                    'duration',
                    'ended'
                ].forEach(function (item) {
                    state.mediaState[item] = state.media[item];
                })

                requestAnimationFrame(refresh)
            }
            refresh();
        }
        return state.mediaState
    },
    //get the icon class of the play mode button
    playModeClass(state){
        return playModes[state.playMode].icon
    },
    isLiking(state,getters){
        if(!getters.currentSong.id)return false
        const task ='liking_'+getters.currentSong.id
        return state.taskStatus.hasOwnProperty(task)?state.taskStatus[task]:false;
    },
    isRecommending(state,getters){
        if(!getters.currentSong.id)return false
        const task ='recommending_'+getters.currentSong.id
        return state.taskStatus.hasOwnProperty(task)?state.taskStatus[task]:false;
    }
}
const actions = {
    //load the song data with lyric ,url ,and so on
    loadSongDataByMeta({state},{id,name}){
        return new Promise(function (resolve,reject) {
            //check the cache
            if(state.songData[id]){
                //calculate in how many minutes the song url will be unavailable
                var timeLeft = new Date(state.songData[id].expire).getTime()-new Date().getTime()
                timeLeft/=60000
                //console.log('minute left',timeLeft)
                //if the time is enough, just play
                if(timeLeft>5){
                    resolve(state.songData[id])
                    return
                }
            }
            //fetch data with api
            api.getSongDetail(id).then(function (result){
                //add to the buffer
                state.songData[result.body.id] = result.body
                resolve(result.body)
            },function () {
                reject('api error');
                vm.$messagebox('Sorry','fetch song('+name+') url failed,try it again later')
            })
        })
    },
    //play the song in the play list,to play a song, this function must be called
    playSongInThePlayList({commit,state,dispatch},index){
        if(index<0||index>=state.playList.length){
            vm.$toast('no such song in the play list')
            console.log('can not play the index: ',index);
            return
        }
        //state.songIndex = index
        commit('setSongIndex',index)
        //fresh the newest task id
        const timestamp = new Date().getTime()
        commit('setPlayTaskId',timestamp)
        commit('setLoading',true)
        state.media.pause()
        vm.$toast({message:'解析歌曲地址...',duration:500})
        var songMeta = state.songMeta[state.playList[index]]
        dispatch('loadSongDataByMeta',songMeta).then(function (song) {
            //return since this play task is not the newest
            if(timestamp != state.playTask)return
            commit('setLoading',false)
            state.media.src = ''
            state.media.src = song.url
            state.media.load()
            state.media.play()
        },function (err) {
            if(timestamp == state.playTask)return
            commit('setLoading',false)
        });


    },
    //called in the search page
    playWithMeta({commit,state,dispatch},songMeta){
        //check if the play list contains the song
        var index = state.playList.indexOf(songMeta.id)
        if(index<0) index = state.songIndex+1
        commit('addToPlayList',{songMeta,index})
        dispatch('playSongInThePlayList',index)
    },
    playNext({dispatch}){
        var index = playModes[state.playMode].next(state.songIndex,state.playList.length)
        dispatch('playSongInThePlayList',index)
    },
    playPrevious({dispatch}){
        var index = playModes[state.playMode].previous(state.songIndex,state.playList.length)
        dispatch('playSongInThePlayList',index)
    },
    like({getters,state,commit}){
        if(!getters.currentSong.id){
            vm.$toast('no song to like,my leo')
            return
        }
        var taskId = 'liking_'+getters.currentSong.id
        commit('taskStatus',{key:taskId,value:true})
        api.post('like',{id:getters.currentSong.id}).then(function (res) {
            commit('taskStatus',{key:taskId,value:false})
            commit('changeSongInfo',Object.assign({},getters.currentSong,{liked:res.body.liked}))
        },function (err) {
            commit('taskStatus',{key:taskId,value:false})
        })

    },
    recommend({getters,state,commit}){
        if(!getters.currentSong.id){
            vm.$toast('no song to recommend,my leo')
            return
        }
        var taskId = 'recommending_'+getters.currentSong.id
        commit('taskStatus',{key:taskId,value:true})
        api.post('recommend',{id:getters.currentSong.id}).then(function (res) {
            commit('taskStatus',{key:taskId,value:false})
            commit('changeSongInfo',Object.assign({},getters.currentSong,{recommended:res.body.recommended}))
        },function (err) {
            commit('taskStatus',{key:taskId,value:false})
        })

    },
    shareToSquare({getters},msg){
        if(!getters.currentSong.id){
            vm.$toast('no song to share,my leo')
            return
        }
        vm.$indicator.open({text:'分享中...'})
        api.post('share',{song_id:getters.currentSong.id,msg}).then(function () {
            vm.$toast('分享成功')
            vm.$indicator.close();
        },err=>vm.$toast('分享失败'),vm.$indicator.close())
    },
}

const mutations = {
    changeSongInfo(state,songInfo){
        state.justForDigest.currentSong++;
        state.songData[songInfo.id] = songInfo
    },
    deleteSongInPlayList(state,index){
        if(index==state.songIndex){
            state.songIndex=-1
            state.media.pause()
        }
        if(state.songIndex>index)state.songIndex--
        state.playList.splice(index,1)
    },
    setPlayTaskId(state,id){
        state.playTask = id
    },
    //add a song with meta to the play list
    addToPlayList(state,{songMeta,index=-1}){
        //add to the song meta cache
        state.songMeta[songMeta.id] = songMeta
        //if the index less than 0,add to the end of the list
        if(index<0)index=songMeta.length
        //add to list in the specific index
        else state.playList.splice(index,0,songMeta.id)
        //adjust the songIndex
        if(state.songIndex>=index)state.songIndex++
    },
    addManyToPlayList(state,{songsMeta=[],index=-1}){
        songsMeta.forEach(function(songMeta){
            state.songMeta[songMeta.id] = songMeta
        })
        if(index<0)index = state.playList.length
        //add to the list
        state.playList.splice(index,0,...songsMeta.map(s=>s.id))
        //adjust the current songIndex
        if(state.songIndex>=index)state.songIndex+=songsMeta.length
    },
    setLoading(state,status){
        state.loadingSongDetail = status
    },
    playPause(state){
        if(state.loadingSongDetail)return
        if(state.songIndex<0)return
        if(state.mediaState.paused)
            state.media.play()
        else
            state.media.pause()
    },
    changePlayMode(state){
        (state.playMode+1)==playModes.length?state.playMode=0:state.playMode++
        vm.$toast({
            message:playModes[state.playMode].name,
            position:'bottom',

        })
    },
    changeFullLrc(state){
        state.fullLrc=!state.fullLrc
    },
    stopPlay(state){
        state.media.pause();
        state.media.src = "";
    },
    clearPlayList(){
        state.media.pause();
        state.playList = [];
        state.songIndex = -1;
    },
    changePlayerColor(state,{color,name}){
        state.color[name] = color
    },
    taskStatus(state,payload){
        if(state.taskStatus.hasOwnProperty(payload.key))
            state.taskStatus[payload.key] = payload.value
        else vm.$set(state.taskStatus,payload.key,payload.value)
    },
    setSongIndex(state,index){
        state.songIndex = index
    }
}
state.media.addEventListener('error',function (err) {
    vm.$messagebox.alert(err,'load resource error')
    console.log('media err',err)
})

export default {
    state,
    getters,
    actions,
    mutations,
    modules:{
        lyric
    }
}