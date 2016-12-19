<template>
    <div>
        <mt-header fixed title="调试">
            <router-link slot="left" to="/me">
                <i class="iconfont icon-fanhui"></i>
            </router-link>
        </mt-header>
        <div style="margin-top:200px;">
            <textarea v-model="code">

            </textarea>
            <mt-button type="danger" style="display:block;width:100%;" @click="exe" class="out-btn">execute</mt-button>
        </div>
        <div style="border:1px solid #aaa;width:100%;overflow-x:scroll;">
            <list path="window"></list>
            <list path="window.navigator"></list>
            <list path="window.plugin"></list>
        </div>
    </div>
</template>
经过近一个月的开发leo music终于得以完成第一个预览版本, 此版本存在以下问题
<ol style="padding-left:30px;">
    <li>缓存问题,基于url自动缓存,由于歌曲资源链接每20分钟更新一次,故相隔20分钟播放同一首歌曲将被 <span style="color:red;">缓存2次</span>,所以请定期在手机设置中清除缓存</li>
    <li>分享到其他应用是只能进行文字链接分享,不能进行图文分享</li>
    <li>没有自动判断手机网络状态,当无网络下打开app时,会认为尚未登录,并转跳到登录页面,此时需联网后重启app</li>
    <li>搜索页面的默认测试数据在发布时忘记去掉了,导致每次打开app时搜索页都显示杨坤的歌</li>
    <li>收藏的歌曲暂时无法查看(但数据存在)</li>
    <li>more...</li>
</ol>
下一个版本
<ol style="padding-left:30px;">
    <li>解决上述提到的所有问题</li>
    <li>加入qq一键登录功能</li>
    <li>完善广场机制,只有好友可见分享的歌曲</li>
    <li>自定义个人资料,头像昵称等可设置</li>
    <li>more...</li>
</ol>
<style scoped>
    textarea{
    display: block;
    resize: vertical;
    padding: 5px 7px;
    line-height: 1.5;
    width: 100%;
    font-size: 14px;
    color: #1f2d3d;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 4px;
}
</style>
<script>
    import {native} from '../call'
    import list from './list'
    export default{
        data(){
            return{
               code:'alert()'
            }
        },
        created(){
            alert(plugins.socialsharing.share)
            native.notify('debug','notification test','alert',['hello cordova'])
        },
        components:{
            list
        },
        computed:{
        },
        methods:{
            exe(){
                eval(this.code)
            }
        }
    }

</script>
