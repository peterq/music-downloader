<template>
  <div id="app">

      <transition name="slide" mode="out-in">
          <router-view>
              路由出口
          </router-view>
      </transition>
    <!--<img src="./assets/logo.png">-->
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: transform .3s,opacity .2s;;
}
.slide-enter, .slide-leave-active {
  transform: translate(-80vw,0);
  opacity: 0;
}
</style>
