import api from './api'
import {native} from '../call'
import Vue from 'vue'
const vm = new Vue()

const actions = {
    login(store,data){
        return new Promise(function (resolve,reject) {
            api.post('login',data).then(function (res) {
                if(res.body.err){
                    reject(res.body.msg)
                    return
                }
                resolve(res.body)
            },function (res) {
                reject('server error try again later')
            })
        })
    },
    selfInfo({commit},data={ }){

        return new Promise(function (resolve,reject) {
            console.log('get self info action work')
            console.log(api)
            api.get('self',data).then(function (res) {
                if(res.body.err){
                    reject(res.body.msg)
                    return
                }
                resolve(res.body)
            },function () {
                reject('server error try again later')
            })
        })
    },
    getSongMeta({state},sid){
        if(state.promises['song_'+sid])
            return state.promises['song_'+sid]
        const promise = new Promise(function(resolve,reject){

            if(state.player.songMeta[sid]){
                resolve(state.player.songMeta[sid])
                return
            }
            api.get('songMeta',{id:sid}).then(function (res) {
                state.player.songMeta[sid] = res.body
                resolve(res.body)
            },err=>reject(err))
        })
        state.promises['song_'+sid] = promise
        return promise
    },
    getUser({state},uid){
        if(state.promises['user_'+uid])
            return state.promises['user_'+uid]
        const promise = new Promise(function(resolve,reject){
            if(state.userData[uid]){
                resolve(state.userData[uid])
                return
            }
            api.get('user',{id:uid}).then(function (res) {
                state.userData[uid] = res.body
                resolve(res.body)
            },err=>reject(err))
        })
        state.promises['user_'+uid] = promise
        return promise
    },
    loadSquare({state},payload={}){
        console.log('load square',payload)
        return new Promise(function (resolve,rejcet) {
            if(state.taskStatus.loadingSquare){
                resolve()
                return
            }

            if(payload.refresh){
                state.square.noMore = false
                state.square.page = 0
            }

            if (state.square.noMore){
                rejcet('no more data')
                return
            }

            state.taskStatus.loadingSquare = true
            api.get('square',{page:++state.square.page}).then(function (res) {
                if(!res.body.next_page_url)
                    state.square.noMore = true;
                if (state.square.page ==1)
                    state.square.data = []
                state.square.data = state.square.data.concat(res.body.data)
                state.taskStatus.loadingSquare = false
                resolve()
            },function () {
                state.taskStatus.loadingSquare = false
                rejcet('fetch data error')
            })
        })
    },
    loadNotification({state},payload={}){
        console.log('load notify',payload)
        return new Promise(function (resolve,reject) {

            if(state.taskStatus.loadingNotification){
                resolve()
                return
            }

            if(payload.refresh){
                state.notification.noMore = false
                state.notification.page = 0
            }

            if (state.notification.noMore){
                reject('no more data')
                return
            }

            state.taskStatus.loadingNotification = true
            api.get('notificationList',{page:++state.notification.page}).then(function (res) {
                if(!res.body.next_page_url)
                    state.notification.noMore = true;
                if (state.notification.page ==1)
                    state.notification.data = []
                state.notification.data = state.notification.data.concat(res.body.data)
                state.taskStatus.loadingNotification = false
                resolve()
            },function () {
                state.taskStatus.loadingNotification = false
                reject('fetch data error')
            })
        })
    },
    comment({state},{msg,share_id}){
        return new Promise(function (resovle,reject) {
            api.post('comment',{msg,share_id}).then(function (res) {
                resovle(res.body)
            },err=>reject(err))
        })
    },

    download({dispatch,state,commit},songMeta){
        return new Promise(function (resolve, reject) {
            if(state.downloadList[songMeta.id]){
                vm.$toast('任务已存在')
                return
            }
            vm.$toast('已添加到下载队列')
            commit('setDownloadList',Object.assign({
                [songMeta.id]:{
                    range:0,
                    id:songMeta.id,
                    state:'pending'
                }
            },state.downloadList))
            dispatch('loadSongDataByMeta',songMeta).then(song=>{
                native.download(song.url,'download/'+song.name+'_'+song.id+'.mp3',range=>{
                    state.downloadList[song.id].range = range
                },(res)=>{
                    state.downloadList[song.id].state = "success"
                    commit('setDownloadList',Object.assign({},state.downloadList))
                    resolve()
                    native.notify('歌曲下载成功',song.name+' 下载完成','downloadFinish')
                },err=>{
                    state.downloadList[song.id].state = "error"
                    reject('download fail')
                })
            },err=>reject(err))
        })
    },
}

export default actions