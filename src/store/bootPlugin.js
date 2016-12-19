import Vue from 'vue'
import welcom from './welcome.vue'
import router from '../routes'
import { native ,promise} from  '../call'
export default store=>{

    console.log('boot plugin is working')
    promise.then(function () {
        //alert('add resource')
        native.addNotifyResolver('alert',function (s) {
            alert(s)
        })
        native.addNotifyResolver('downloadFinish',function(){
            router.push({name:'download'})
        })
    })
    //media ended event handler
    store.state.player.media.addEventListener('ended',function () {
        console.log('song ended')
        store.dispatch('playNext')
    })
    //get self info ,then check if signed in
    setTimeout(function () {
        store.dispatch('selfInfo').then(function (result) {
            router.push({name:'login'});
            store.commit('gotSelfFinished',result);

        },function (err) {
            router.push({name:'login'});
        })
    },0)
    //show the welcome page;
    if(true){
        var vm = new Vue(welcom);
        vm.$mount()
        document.body.appendChild(vm.$el)
    }

}
/*
export default store=>{
    console.log('boot plugin is working')
    store.dispatch('selfInfo').then(function (result) {
        store.commit('gotSelfFinished',result);
    },function (err) {

    })
}*/
