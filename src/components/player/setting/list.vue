<template>
    <div style="background-color:#eee;">
        <div class="group">
            <item class="item" v-for="item in items" :link="item"></item>
        </div>
    </div>
</template>
<style scoped>
    .group{
        padding:30px 0;
    }
    .item{
        border-top:1px solid #aaa;
    }
    .item:last-child{
        border-bottom:1px solid #aaa;
    }
</style>
<script>
    import item from './settingItem'
    export default{
        data(){
            return{
                items:[
                    {
                        text:'颜色',
                        to:'playerColor'

                    },
                    {
                        text:'颜色',
                        to:'playerColor'
                    }
                ]
            }
        },
        components:{
            item
        }
    }

</script>
