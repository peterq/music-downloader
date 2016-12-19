import router from '../routes'
import Vue from 'vue'
export default {

    gotSelfFinished(state,user){
        state.hasGotSelf = true
        state.user = user
        if(!user.login&&router.currentRoute.name!='login'){
            router.push({name:'login'});
            new Vue({}).$messagebox('login first')
        }else if(user.login&&router.currentRoute.name=='login'){
            //new Vue({}).$messagebox('you have already signed in')
            router.push('/');
        }

    },
    setUser(state,user){
        state.user = user;
    },
    setDownloadList(state,list){
        state.downloadList = list
    }
}