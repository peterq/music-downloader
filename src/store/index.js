import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createLogger from 'vuex/dist/logger'
import player from './modules/player'
import search from './modules/search'
import localStorage from './localStorage'
import bootPlugin from './bootPlugin'
Vue.use(Vuex);

const state = {


    hasGotSelf: false,

    userData: {},
    promises: {},
    taskStatus: {
        loadingSquare: false,
        loadingNotification: false,
        getUser: {}
    },
    user: {
        "login": true,
        "id": 0,
        "name": "leo",
        "nickname": "leo",
        "type": "user",
        "email": "leo@peterq.cn",
        "created_at": "2016-12-07 15:30:03",
        "updated_at": "2016-12-07 18:26:30"
    },

    square: {
        data: [],
        page: 0,
        noMore: false
    },
    notification: {
        data: [],
        page: 0,
        noMore: false
    },
    downloadList: {
        440207621:{
            range:.7,
            id:440207621,
            state:'pending'
        }
    }

};

export default new Vuex.Store({
    state,

    getters,
    actions,
    mutations,
    modules:{
        player,
        search
    },
    plugins: process.env.NODE_ENV !== 'production'
        ? [createLogger(),localStorage,bootPlugin] : [localStorage,bootPlugin]
})
