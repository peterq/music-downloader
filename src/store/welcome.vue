<template>
    <div class="page" :class="{go}">
        <h2>{{msg}}</h2>
    </div>
</template>
<style scoped>
    .page{
        position:fixed;
        display:flex;
        flex-direction:column;
        justify-content:center;
        width:100%;
        height:100%;
        left:0;
        z-index:100;
        background:#40a2a2;
        top:0;
        left:0;
        text-align:center;
        color:white;
        padding:0 30px;
        transition:all .6s;
    }
    .go{
        top:-90vh;
        opacity:0;
    }
</style>
<script>
    import loveWords from './loveWords'
    export default{
        data(){
            return{
                go:false,
                msg:'',
            }
        },
        mounted(){
            this.msg = this.getMessage();
            setTimeout(function(){
                this.go = true;
            }.bind(this),3000)
            setTimeout(function(){
                var el = this.$el
                console.log('this',this)
                el.parentNode.removeChild(el)
                this.$destroy()
            }.bind(this),4000)
        },
        components:{
        },
        methods:{
            getMessage(){
                var s = localStorage.welcomeIndex||0
                var index = parseInt(s);
                if(index==loveWords.length)index=0;
                const msg = loveWords[index];
                localStorage.welcomeIndex = index+1
                return msg
            }
        }
    }

</script>
