<template>
    <div>
        <div>
            <share-song :song-id="task.id"></share-song>
            <p class="percent"><span>{{percent}}</span></p>
        </div>
    </div>
</template>
<style scoped>
    .cover{
        width:30px;
        height:30px;
    }
    .percent{
        position:absolute;
        right:10px;
        height:100%;
        top:0;
        display:flex;
        align-items:center;
    }
</style>
<script>
    import shareSong from '../main/shareSong.vue'
    export default{
        props:['task'],
        data(){
            return{
            }
        },
        components:{
            shareSong
        },
        computed:{
            percent(){
                return ~~(this.task.range*100)+'%'
            }
        }
    }

</script>
