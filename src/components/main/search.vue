<template>
    <div style="padding-bottom:60px;">
        <mt-search
                v-model="keyword"
                cancel-text="取消"
                placeholder="搜索音乐"
                @keyup.enter.native="search">
        </mt-search>
        <transition-group tag="p" name="list" style="padding-top:60px;">
            <song-item v-for="song in searchResult" :song="song"  :key="song.id"></song-item>
        </transition-group>
    </div>
</template>
<style>

    .mint-search{
        position:fixed;
        width:100%;
        height:auto;
        z-index:5;
    }
    .mint-search .mint-searchbar-core{
        width:100%;
    }


</style>
<script>
    import {mapState} from 'vuex'
    import SongItem from './searchResultItem'
    export default{
        data(){
            return{

            }
        },
        computed:{
            searchResult(){
                return this.$store.state.search.result
            },
            keyword:{
                get(){
                    return this.$store.state.search.keyword
                },
                set(s){
                    this.$store.commit('keyword',s)
                }
            }

        },
        components:{
            SongItem,

        },
        methods:{
            search(){
                let vm = this
                if(this.keyword=='')return
                this.$indicator.open({
                    text:'搜索中...',
                    spinnerType:'triple-bounce'
                })
                this.$store.dispatch('search').then(
                    function(result){
                        vm.$indicator.close()
                    },
                    function(err){
                        if(err)vm.$messagebox(err)
                        vm.$indicator.close()
                        vm.$toast('searching error, try it later')
                    }
                )
            },

        }
    }
</script>
