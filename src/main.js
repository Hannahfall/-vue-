import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router' 
import store from './store/index'
import './api/mock';
import Cookies from 'js-cookie';

Vue.use(ElementUI);

router.beforeEach((to, from, next) => { 
  const token = Cookies.get('token');
  console.log('000000000', token, to.name);
  if(!token && to.name !== 'login'){
    next({name: 'login'})
  }else if(token && to.name === 'login'){
    next({name: 'home'})
  }else{
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    this.$store.commit('setRouter', router)
  }
}).$mount('#app');