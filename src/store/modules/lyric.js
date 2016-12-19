const state = {

}

const getters = {
    lyricText(state,getters,rootState){
        console.log('root state: ' ,rootState);
        return getters.currentSong.lrc
    },

    rows(state,getters,rootState){
        console.log('compute lyric rows,rootStage: ',rootState);
        if (!getters.currentSong.lrc)return [];
        var rows = getters.currentSong.lrc.split('\n');
        //遍历,生成歌词节点
        var nodes = [];
        rows.forEach(function (row) {
            //抛弃非歌词
            if(!/^\[[0-5][0-9]:[0-5][0-9]\.[0-9][0-9][0-9]?\]/.test(row))return;
            //提取时间
            var temp = row.split(']')[0].split('[')[1].split(/:|\./);
            var time = temp[0]*60+temp[1]*1+('0.'+temp[2])*1;
            /**
             * 提取歌词文本
             * @todo 考虑歌词中含有']'的情况
             */
            var text = row.split(']')[1];
            nodes.push({time,text});
        });
        return nodes;
    },
    timeStage(state,getters,rootState){
        var time = getters.mediaState.currentTime;
        var nodes = getters.rows;
        if(nodes.length<2)return{time:0,range:0,index:0}
        if (nodes[0].time>0)nodes.unshift({time:0,text:''})
        for(var i=0;i<nodes.length;i++){
            if(!nodes[i])console.log('node '+i,nodes[i])
            if(nodes[i].time>time)break;
        }
        i--;
        var stageTime = nodes[i].time
        var nextStageTime  = nodes[i+1]?nodes[i+1].time:stageTime+3;
        var range = (nextStageTime-stageTime)?(time-stageTime)/(nextStageTime-stageTime):0
        return {time:stageTime,range,index:i}
    },
}

const mutations = {
}

export default {
    state,getters,mutations
}