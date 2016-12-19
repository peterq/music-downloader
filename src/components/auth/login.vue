<template>
    <div>
        <mt-header fixed title="login">
            <div slot="left">
                Music for Leo
            </div>
            <div slot="right" @click="register">
                register
            </div>
        </mt-header>
        <div class="form-wrapper">
            <div>
                <div class="field">
                    <span class="field-text">Account</span>
                    <input v-model="email" placeholder="email address in peterq.cn domain" type="text">
                </div>
                <div class="field">
                    <span class="field-text">Password</span>
                    <input v-model="password" placeholder="input your password" type="password">
                </div>
            </div>
            <mt-button plain @click="login">sign in</mt-button>
        </div>
    </div>
</template>
<style scoped>
    .form-wrapper{
        height:100vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        padding:0 10vw;
    }
    .field{
        display:flex;
        align-items:center;
        border-bottom:1px solid #999;
        margin:20px 0;
    }
    .field-text{
        width:25%;
        text-align:left;
    }
    .field input{
        display:block;
        border:none;
        width:75%;
        height:30px;
        outline:0;
    }
</style>
<script>
    export default{
        data(){
            return{
                remember:true,
                email:'',
                password:''
            }
        },
        created:function(){
            //return if the user has singed in
            if(this.$store.state.hasGotSelf&&this.$store.state.user.login)
                this.$router.push('/');
        },
        components:{
        },
        methods:{
            register(){
                this.$messagebox('please contact peter(me@peterq.cn)');
            },
            login(){
                if(!this.email||!this.password){
                    this.$messagebox('please input your account credential');
                    return
                }
                this.$indicator.open({
                    text: 'login...',
                    spinnerType: 'fading-circle'
                })
                this.$store.dispatch('login',{
                    email:this.email,
                    password:this.password,
                    remember:this.remember,
                }).then(function(res){
                    this.$indicator.close()
                    this.$toast('login success')
                    this.$store.commit('setUser',res)
                    this.$router.push('/')
                }.bind(this),function(msg){
                    this.$indicator.close()
                    this.$messagebox(msg)
                }.bind(this))
            }
        }
    }

</script>
