<template>
    <div>
        <div class="tab" :class="{off:tab=='notification'}">
            <div class="tab-button" @click="tab='square'" :class="{current:tab=='square'}">广场</div>
            <div class="tab-button" @click="tab='notification'"  :class="{current:tab=='notification'}">通知</div>
        </div>
        <mt-loadmore v-show="tab=='square'" bottom-pull-text="上拉加载更多"  :auto-fill="false" style="padding-bottom:55px;padding-top:50px;" :top-method="freshSquare" :bottom-method="loadSquare" :bottom-all-loaded="squareNoMore" ref="squareLoadMore">
            <share-item :item="item" v-for="item in shares" :key="item.id"></share-item>
        </mt-loadmore>
        <mt-loadmore v-show="tab=='notification'" bottom-pull-text="上拉加载更多" :auto-fill="false" style="padding-bottom:55px;padding-top:50px;min-height:100vh;" :top-method="freshNotification" :bottom-method="loadNotification" :bottom-all-loaded="$store.state.notification.noMore" ref="notificationLoadMore">
            <notification :notification="item" v-for="item in $store.state.notification.data" :key="item.id"></notification>
        </mt-loadmore>
    </div>
</template>
<style scoped>
    .tab{
        display:flex;
        background:#eee;
        z-index:5;
        position:fixed;
        width:100%;
    }
    .tab:after{
        display:block;
        content:'';
        bottom:0;
        position:absolute;
        width:50%;
        left:0;
        height:3px;
        background:blue;
        transition:all .5s,background 3s;
    }
    .off:after{
        left:50%;
        background:green;
    }
    .tab-button{
        width:50%;
        height:50px;
        font-size:23px;
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
    .tab-button.current{
        //border-bottom:3px solid blue;
    }
</style>
<script>
    import shareItem from './shareItem'
    import notification from './notification'
    export default{
        data(){
            return{
                tab:'notification'
            }
        },
        created(){
            if(!this.$store.state.square.page)
                this.$store.dispatch('loadSquare')
            if(!this.$store.state.notification.page)
                this.$store.dispatch('loadNotification')
        },
        components:{
            shareItem,
            notification
        },
        methods:{
            freshSquare(id){
                this.$store.dispatch('loadSquare',{refresh:true}).then(re=>this.$refs.squareLoadMore.onTopLoaded(id),err=>{
                    this.$toast(err)
                    this.$refs.squareLoadMore.onTopLoaded(id)
                })
            },
            loadSquare(id){
                this.$store.dispatch('loadSquare').then(re=>this.$refs.squareLoadMore.onBottomLoaded(id),err=>{
                    this.$toast(err)
                    this.$refs.squareLoadMore.onBottomLoaded(id)
                })
            },
            freshNotification(id){
                this.$store.dispatch('loadNotification',{refresh:true}).then(re=>this.$refs.notificationLoadMore.onTopLoaded(id),err=>{
                    this.$toast(err)
                    this.$refs.notificationLoadMore.onTopLoaded(id)
                })
            },
            loadNotification(id){
                this.$store.dispatch('loadNotification').then(re=>this.$refs.notificationLoadMore.onBottomLoaded(id),err=>{
                    this.$toast(err)
                    this.$refs.notificationLoadMore.onBottomLoaded(id)
                })
            },
        },
        computed:{
           squareNoMore(){
               return this.$store.state.square.noMore
           },
           shares(){
               return this.$store.state.square.data;
           },
        }
    }
</script>
