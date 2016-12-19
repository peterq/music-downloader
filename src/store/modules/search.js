import api from '../api'

const state = {
    result:[
        {
            "id": 440207430,
            "name": "下个，路口，见",
            "mv": 0,
            "pic": "http://p3.music.126.net/UjTXWIpw1wtJwW75d7Vghw==/3311729029882017.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 440207621,
            "name": "跟我回家",
            "mv": 0,
            "pic": "http://p4.music.126.net/Ir35vKQljuVJc7y_FRnzsw==/2946691242739501.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176093,
            "name": "空城",
            "mv": 0,
            "pic": "http://p3.music.126.net/9538RYZSTyToXPWhkyZ15A==/32985348834363.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 438801575,
            "name": "模特",
            "mv": 0,
            "pic": "http://p4.music.126.net/0b3u9H0yPkYnTLVK1Vpvuw==/18735678138265693.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 435289230,
            "name": "爱",
            "mv": 0,
            "pic": "http://p4.music.126.net/mZnQNwfl-9M-8-r7yHXxlA==/18777459579839082.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176179,
            "name": "无所谓",
            "mv": 0,
            "pic": "http://p3.music.126.net/zZ1lUJuTPNoT2wSJOQfSZw==/127543348822888.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 28232019,
            "name": "答案",
            "mv": 0,
            "pic": "http://p3.music.126.net/yRb0ZHDWRMb5yWMTAy6YPw==/6016527627196727.jpg",
            "singer": [
                "杨坤",
                "郭采洁"
            ]
        },
        {
            "id": 436699208,
            "name": "你的甜蜜",
            "mv": 0,
            "pic": "http://p4.music.126.net/TMWbXFcYWvylMV3JBcYpNw==/18720284975245736.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176075,
            "name": "路灯下的小姑娘",
            "mv": 0,
            "pic": "http://p3.music.126.net/gSPkikEn-uoIW6Ao0OC_tQ==/835628837110082.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176165,
            "name": "那一天",
            "mv": 0,
            "pic": "http://p4.music.126.net/r3vImYyyolimpv4I2vV0Qg==/37383395356459.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176110,
            "name": "牧马人",
            "mv": 0,
            "pic": "http://p3.music.126.net/eq3ovPrC1d0C5hLl7e6COA==/602532372033020.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 4875722,
            "name": "那一天",
            "mv": 0,
            "pic": "http://p3.music.126.net/1f9XVowTlvTkt6CHPMXNLw==/69269232566213.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 27698462,
            "name": "我没你想的那么坚强",
            "mv": 178027,
            "pic": "http://p4.music.126.net/JW6gXUFcVftiH2oZTO-OOA==/2120957929984721.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176076,
            "name": "站台2010",
            "mv": 59153,
            "pic": "http://p3.music.126.net/gSPkikEn-uoIW6Ao0OC_tQ==/835628837110082.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 434659673,
            "name": "不息之河",
            "mv": 5362583,
            "pic": "http://p4.music.126.net/in-IGDTosQCbE32DRg4fYw==/18548761161025661.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176159,
            "name": "月亮可以代表我的心",
            "mv": 0,
            "pic": "http://p4.music.126.net/r3vImYyyolimpv4I2vV0Qg==/37383395356459.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 32835757,
            "name": "真心英雄",
            "mv": 426045,
            "pic": "http://p4.music.126.net/dn_4J80oiUEIbUPBEVzOYw==/2915904839240266.jpg",
            "singer": [
                "杨坤",
                "佟大为",
                "郑元畅",
                "张杰",
                "朱亚文",
                "陈学冬"
            ]
        },
        {
            "id": 176066,
            "name": "真的很在乎",
            "mv": 0,
            "pic": "http://p4.music.126.net/IKlBVtLqtb6xzUFj8wDM7A==/96757023245210.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 28936106,
            "name": "空城(Live版)",
            "mv": 0,
            "pic": "http://p4.music.126.net/0ZBYdn9Hm7_R-Z50pOwF6A==/8891750533913724.jpg",
            "singer": [
                "吉克隽逸",
                "杨坤"
            ]
        },
        {
            "id": 5269123,
            "name": "无所谓",
            "mv": 0,
            "pic": "http://p4.music.126.net/ojYNAw7j9ANumgXqY7PZqA==/35184372105648.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 28884189,
            "name": "要死就一定要死在你手里",
            "mv": 0,
            "pic": "http://p4.music.126.net/nYERX28s3bd_b3UDzO-vTA==/6670737045984027.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 254199,
            "name": "24楼",
            "mv": 0,
            "pic": "http://p3.music.126.net/yp-brpxkNczcgOyZ9zm_Pw==/60473139540006.jpg",
            "singer": [
                "刘若英",
                "杨坤"
            ]
        },
        {
            "id": 176074,
            "name": "晚安",
            "mv": 0,
            "pic": "http://p4.music.126.net/IKlBVtLqtb6xzUFj8wDM7A==/96757023245210.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 29129422,
            "name": "今夜二十岁",
            "mv": 0,
            "pic": "http://p4.music.126.net/nYERX28s3bd_b3UDzO-vTA==/6670737045984027.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 176120,
            "name": "穷浪漫",
            "mv": 0,
            "pic": "http://p3.music.126.net/eq3ovPrC1d0C5hLl7e6COA==/602532372033020.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 36011209,
            "name": "兄弟 - 完整版",
            "mv": 0,
            "pic": "http://p4.music.126.net/jJCh99a-tQcvQCw9K2sqJg==/2539871863463767.jpg",
            "singer": [
                "杨坤",
                "邓超",
                "张涵予"
            ]
        },
        {
            "id": 213127,
            "name": "两个人的世界",
            "mv": 0,
            "pic": "http://p3.music.126.net/Zjpkm0zJE_suPYjcIXdqrA==/799344953393487.jpg",
            "singer": [
                "陈琳",
                "杨坤"
            ]
        },
        {
            "id": 29129428,
            "name": "答案",
            "mv": 0,
            "pic": "http://p3.music.126.net/nYERX28s3bd_b3UDzO-vTA==/6670737045984027.jpg",
            "singer": [
                "杨坤",
                "郭采洁"
            ]
        },
        {
            "id": 176182,
            "name": "里约热内卢",
            "mv": 0,
            "pic": "http://p3.music.126.net/zZ1lUJuTPNoT2wSJOQfSZw==/127543348822888.jpg",
            "singer": [
                "杨坤"
            ]
        },
        {
            "id": 310728,
            "name": "月亮可以代表我的心",
            "mv": 0,
            "pic": "http://p4.music.126.net/iqdzWmq9jyRyIwm32KFwNA==/30786325592300.jpg",
            "singer": [
                "萧蔷",
                "杨坤"
            ]
        }
    ],
    keyword:'',
}

const getters = {}

const actions = {
    search({state,commit}){
        const q = state.keyword
        return new Promise(function (resolve,reject) {
            api.get('search',{q}).then(function (result) {
                    if(result.body.err){
                        reject(result.body.msg)
                        return
                    }
                    commit('searchResult',result.body)
                    resolve(result.body)
                },
                function (err) {
                    console.log(err)
                    reject(err)
                }
            )
        })
    }
}

const mutations = {
    keyword(state,s){
        state.keyword = s
    },
    searchResult(state,re){
        state.result = re
    }
}


export default {
    state,
    getters,
    actions,
    mutations,
    modules:{
    }
}