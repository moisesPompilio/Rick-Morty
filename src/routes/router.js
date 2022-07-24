import Vue from "vue";
import VueRouter from 'vue-router'


import Home from '@/pages/Home';
import Personagem from '@/pages/Personagem';
import Episodio from '@/pages/Episodio';
import Local from '@/pages/Local'

Vue.use(VueRouter);
const routes = [
    {
    path:'/',
    name:'home',
    component: Home
},
{
  path:'/personagem',
  name:'personagem',
  component: Personagem
},
{
  path:'/episodio',
  name:'episodio',
  component: Episodio
},
{
  path:'/local',
  name:'local',
  component: Local
},

];

const router = new VueRouter({
    mode: 'history',
    routes
  })

export default router;