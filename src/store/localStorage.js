const base = {
    write(mutation,state) {
        window.localStorage['mutation_'+mutation.type] = JSON.stringify(mutation.payload)
    },

    read({commit},type) {
        if(!window.localStorage['mutation_'+type])return
        let payload = JSON.parse(window.localStorage['mutation_'+type])
        commit(type,payload)
    }
}
const playListStore = {
    read({commit}, type){
        if (!window.localStorage['playList'])return
        let songs = JSON.parse(window.localStorage['playList'])
        commit('addManyToPlayList', {songsMeta: songs})
    },
    write(mutation, state){
        //store the play list
        const songsMeta = [];
        state.player.playList.forEach(id=> {
            songsMeta.push(state.player.songMeta[id])
        })
        window.localStorage['playList'] = JSON.stringify(songsMeta)
    },
}
const storeList = {
    changePlayerColor:{
        write(mutation,state){
            //console.log(JSON.stringify(state.player.color));
            window.localStorage['mutation_'+mutation.type] = JSON.stringify(state.player.color)
        },
        read({commit},type){
            if(!window.localStorage['mutation_'+type])return
            let color = JSON.parse(window.localStorage['mutation_'+type])
            for(let name in color){
                commit(type,{name,color:color[name],noStore:1})
            }
        },
    },
    addToPlayList:playListStore,
    deleteSongInPlayList:{write:playListStore.write,read(){}},
    clearPlayList:{
        write(mutation,state){
            playListStore.write('',state)
            base.write({type:'setSongIndex',payload:-1},state)
        },
        read(){}
    },
    setSongIndex:{write:base.write,
        read({commit,dispatch,state},type){
            if(window.localStorage['mutation_setSongIndex']){
                const index = JSON.parse(window.localStorage['mutation_setSongIndex'])
                setTimeout(function () {
                    dispatch('loadSongDataByMeta',state.player.songMeta[state.player.playList[index]]).then(s=>{
                        commit('setSongIndex',index)
                        state.player.media.src = s.url
                    })
                },0)
            }

    }},
    setDownloadList:{read:base.read,write(mutation,state){
        var data = {}
        for(let i in mutation.payload){
            if( mutation.payload[i].state =='success')
                data[i] = mutation.payload[i]
        }

        window.localStorage['mutation_'+mutation.type] = JSON.stringify(data)
    }}
}
//read the other list
const otherList = (function() {
    return window.localStorage['otherMutations']?JSON.parse(window.localStorage['otherMutations']):[]
})()
function storeOther(mutation) {

    // if the mutation is not recorded,recode it
    if(!otherList.includes(mutation.type)){
        otherList.push(mutation.type)
        window.localStorage['otherMutations'] = JSON.stringify(otherList)
    }
    //store the payload
    window.localStorage['mutation_'+mutation.type] = JSON.stringify(mutation.payload)
}
const storeToLocalPlugin = store=>{
    console.log('local storage plugin is working')
    //get data from local storage
    for(let mutationType in storeList){
        storeList[mutationType].read(store,mutationType)
    }
    for(let mutationType in otherList){
        base.read(store,mutationType)
    }
    //subscribe the mutations
    store.subscribe(function (mutation,state) {
        if(mutation.payload&&mutation.payload.noStore)return
        if(storeList[mutation.type]){
            storeList[mutation.type].write(mutation,state)
        }else if(mutation.payload&&mutation.payload.storeToLocal){
            storeOther(mutation)
        }
    })                                                                                                                                                                                                          
}

export default storeToLocalPlugin