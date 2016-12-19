<template>
    <div class="share-item">
        <div class="header">
            <img class="avatar" :src="userAvatar">
            <div>
                <p class="nickname">{{user.nickname}}</p>
                <p class="time">{{item.time}}</p>
            </div>
        </div>
        <div>
            <p class="msg">{{item.msg}}</p>
        </div>
        <share-song :song-id="item.song_id"></share-song>
        <div>
            <input @keyup.enter="submitComment" v-model="comment" placeholder="评论" type="text">
        </div>
        <div>
            <comment v-for="comment in item.comments" :comment="comment"></comment>
        </div>
    </div>
</template>
<style scoped>
    .avatar{
        display:block;
        width:35px;
        height:35px;
        border-radius:50%;
        margin-right:10px;
    }
    .share-item{
        border-radius:5px;
        border:1px solid #ddd;
        padding:5px;
        margin:15px 10px;
    }
    .msg{
        padding:10px 0 ;
    }
    .header{
        display:flex;
        height:50px;
        align-items:center;
    }
    p{
        text-align:left;
    }
    .time{
        color:#aaa;
    }
</style>
<style scoped>
    input{
        display:block;
        margin:10px 0;
        width:100%;
        height:25px;
        outline:0;
    }
</style>
<script>
    import shareSong from './shareSong'
    import comment from './comment'
    export default{
        props:['item'],
        data(){
            return{
                user:{
                    nickname:'名称加载中',
                    id:1
                },
                comment:''
            }
        },
        created:function(){
            this.$store.dispatch('getUser',this.item.user_id).then(function(user){
                this.user = user;
            }.bind(this))

        },
        components:{
            shareSong,
            comment
        },
        computed:{
            userAvatar(){
                return '/static/image/avatar/'+this.user.id%8+'.jpg'
            }
        },
        methods:{
            submitComment(){
                if(!this.comment)return
                this.$indicator.open({text:'提交中'})
                this.$store.dispatch('comment',{msg:this.comment,share_id:this.item.id}).then(
                    res=>{
                        this.$indicator.close()
                        this.item.comments = this.item.comments.concat([res])
                        this.comment=""
                        this.$toast="评论成功"
                    },
                    err=>{
                        this.$indicator.close()
                        this.$toast('评论失败')
                    }
                )
            }
        }
    }

</script>
