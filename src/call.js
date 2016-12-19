import Vue from 'vue'
import download from './native/download.js'
import {notify,addNotifyResolver,bootNotify} from  './native/notify.js'
import socialShare from './native/socialShare.js'
import setStatusColor from './native/setStatusColor.js'
import toggleWebView from './native/toggleWebView.js'
const vm = new Vue()
var app = true
app = window._cordovaNative?true:false;
var booted = false
const call = {
    toggleWebView,
    setStatusColor,
    download,
    notify,
    addNotifyResolver,
    socialShare
}
//for in normal browser, fake methods is needed to track the native methods calls
const fake = {}
for (let item in call){
    fake[item] =(function () {
        const name = item
        return  function () {
            var str = 'call native : '+name+': '
            Array.prototype.slice.call(arguments).forEach(arg=>str+='['+arg.toString()+']')
            alert(str)
            return false
        }
    })();
}
//used to exposed, when native methods are called, agent will check if cordova plugin is correctly initialized
const agent = {}
for (let item in call){
    agent[item] = (function () {
        const name = item
        return function () {
            if(!booted){
                alert('native plugin not booted')
                return false
            }
            return call[name](...Array.prototype.slice.call(arguments))
        }
    })()
}

//boot init
export const  native = app?agent:fake
//the promise for booting native plugin
export const promise = new Promise(function (resolve,reject) {
    app&&setTimeout(function () {
        var i = 0;
        const boot = function(){
            try {
                i++
                bootNotify()
                plugin.backgroundMode.enable()
                booted = true
                resolve()
            }catch (e){
                if(i>10){
                    vm.$messagebox('native plugin boot error,try to reboot the application')
                    reject()
                    return
                }
                vm.$toast('try to boot for'+i+'times')
                setTimeout(boot,1000)

            }
        }
        boot()
    },2000)

})


