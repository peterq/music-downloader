<template>
    <div class="comment-item">
        <span class="user">{{user.nickname}} : </span>
        <span class="comment">{{comment.msg}}</span>
    </div>
</template>
<style scoped>
    .comment-item{
        text-align:left;
        margin-bottom:8px;
    }
    .user{
        color:blue;
    }
</style>
<script>
    export default{
        props:[
            'comment'
        ],
        created:function(){
            this.$store.dispatch('getUser',this.comment.user_id).then(user=>{this.user = user;})
        },
        data(){
            return{
                user:{
                    nickname:'加载中'
                }
            }
        },
        components:{
        }
    }

</script>
