<template>
    <div class="box">
        <div class="color" v-for="color in colors">
            <div style="padding-top:100%;" @click="$emit('select',color)" :style="{'background-color':color}">
            </div>
        </div>
    </div>
</template>
<style scoped>
    .box{
        display:flex;
        flex-wrap:wrap;
    }
    .color{
         width:16.666%;

    }
</style>
<script>
    import colors from './colors'
    export default{
        data(){
            return {

            }
        },
        mounted(){
            console.log('color vue mounted')
            this.$emit('setting-title','设置颜色')
        },
        components:{

        },
        computed:{
            colors(){
                return colors;
            }
        }
    }

</script>
