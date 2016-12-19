import vueRouter from 'vue-router'
import mainPage from './components/main/layout.vue'
import search from './components/main/search.vue'
import explore from './components/main/explore.vue'
import me from './components/main/me.vue'
import player from './components/player/layout.vue'
import playerSetting from './components/player/setting/layout.vue'
import login from './components/auth/login.vue'
import debug from './components/debug.vue'
import download from './components/download/list.vue'
import store from './store/index'


const routes = [
    {
        path:'/',
        component:mainPage,
        children:[
            {
                path:'',
                component:search,
                name:'search'
            },
            {
                path:'explore',
                component:explore,
                name:'explore'
            },{
                path:'me',
                component:me,
                name:'me'
            }
        ]
    },
    {
        path:'/msg',
        component:{
            template:'<h1>my name is peter q</h1>'
        },

    },
    {
        path:'/player',
        component:player,
        name:'player'
    },
    {
        path:'/player/setting',
        component:playerSetting,
        children: [
        ]
    },
    {
        path:'/login',
        name:'login',
        component:login
    },
    {
        path:'/download',
        name:'download',
        component:download
    },
    {
        path:'/debug',
        name:'debug',
        component:debug
    }
]

const router = new vueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //if has got self and the user has not signed in,redirect to the login page
    ////debugger;
    console.log('to path',to.path)
    if(store.state.hasGotSelf&&!store.state.user.login&&(to.name!='login')){
        console.log('redirected by rooter login hook');
        next({name:'login'})
    }

    else next()
})
export default router