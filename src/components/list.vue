<template>
    <div style="text-align:left;">
        <div class="name" @click="show=!show" :style="{color:show?'red':'black'}">{{name}}</div>
        <div class="children-list" v-if="show">
            <list v-for="item in children" :path="item"></list>
        </div>
    </div>
</template>
<style scoped>
    .children-list{
        padding-left:20px;
    }
</style>
<script>
    export default{
        props:['path'],
        name:'list',
        data(){
            return{
                show:false,
                children:[],
                name:'',
            }
        },
        created(){
            this.name = this.path
            setTimeout(function(){
                var obj = eval(this.name)
                if(typeof obj =="object"){
                    var arr =  []
                    for(let i in obj){
                        arr.push(this.name+'.'+i)
                    }
                    this.children = arr
                }
            }.bind(this),0)
            //console.log(this.children)
        },
        components:{

        },
        methods:{
        }

    }

</script>
