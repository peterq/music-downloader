import Vue from 'vue'


var vm = new Vue({
    http: {
        root: 'http://music.peterq.cn/api',
        //root: 'http://music.app/api',
        headers: {

        }
    }
})
console.log(vm)

const urlList = {
    search:'search',
    detail:'song{/id}',
    login:'login',
    token:'token',
    self:'self',
    like:'like',
    recommend:'recommend',
    songMeta:'song_meta',
    user:'user',
    square:'square',
    share:'share',
    comment:'comment',
    notificationList:'notification/list'
}



function get(urlName,params={}){
    console.log('xhr get',urlName,params)
    return vm.$http.get(urlList[urlName],{
        params,
        credentials:true,
    })
}

const getTokenPromise = (function () {
    var promise = null
    return function () {
        if(promise==null)
            promise = new Promise((resolve,reject)=>{
                get('token').then(res=>{resolve(res.body)},err=>{reject('get token failed')})
            })
        return promise
    }
})()

function post(urlName,body,params={}) {
    console.log('xhr post',urlName,body)
    return new Promise(function (resolve,reject) {
        getTokenPromise().then(function (token) {
            vm.$http.post(urlList[urlName],body,{
                params,
                credentials:true,
                headers:{
                    'X-CSRF-TOKEN':token
                }
            }).then(res=>resolve(res),err=>reject(err))
        },err=>reject(err))
    })
}

function getSongDetail(id){
    return get('detail',{id})
}

function search() {

}

export default {
    getSongDetail,
    search,
    get,
    post
}