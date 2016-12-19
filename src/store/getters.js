import config from '../config'
export default {
    avatar(state){
        return config.staticRoot+'image/avatar/'+state.user.id%8+'.jpg'
    }
}