<template>
    <div class="layout" :class="{setting}">
        <div class="player-view">
            <player class="player" @setting="setting=!setting"></player>
        </div>
        <div class="color-tab">
            <color-tab :current="currentSettingColor" @select="selectSettingColor"></color-tab>
        </div>
        <div class="color-box">
            点击色块以选择颜色
            <div class="scroll">
                <color @select="selectColor"></color>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .layout{
        height:100vh;
        width:100vw;
        background:#444;
        display:flex;
        overflow:hidden;
    }
    .player-view{
        width:100vw;
        height:100vh;
        transition:all 1s;
    }
    .player{
        transition:all 1s;
        transition-delay:.3s;
        transform-origin: 0 0;
    }
    .setting .player{
        transform: scale(.5);
        transition-delay:0s;
    }
    .setting .player-view{
        width:50%;
        height:50%;
    }
</style>
<style scoped>
    .color-tab{
        width:50vw;
        height:50vh;
        position:absolute;
        right:-50vw;
        transition:all 1s;
        padding:0 20px;
    }
    .color-box{
        width:100vw;
        height:50vh;
        position:absolute;
        bottom:-50vh;
        left:0;
        padding:1vw 1vh;
        color:#fff;
        transition:all 1s;
    }
    .setting .color-box{
         bottom:0;
         transition-delay:.3s;
    }
    .setting .color-tab{
        right:0;
    }
    .scroll{
        overflow-y:scroll;
        height:45vh;
    }
</style>
<script>
    import color from './setting/color'
    import colorTab from './setting/colorTab'
    import player from './player'
    export default{
        data(){
            return{
                setting:false,
                currentSettingColor:'background'
            }
        },
        components:{
            player,
            color,
            colorTab
        },
        methods:{
            selectSettingColor(s){
                this.currentSettingColor = s
            },
            selectColor(color){
                //console.log(c)
                this.$store.commit('changePlayerColor',{
                    name:this.currentSettingColor,
                    color
                })
            }
        }
    }

</script>
