import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Main from '../views/Main.vue'

import CargoShip from '../components/CargoShip.vue'
import CargoShipList from '../components/CargoShipList.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'signIn',
    component: SignIn
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/cargoship',
    name: 'cargoship',
    component: CargoShip,
    children: [{
      path: 'list',
      name: 'cargoShipList',
      component: CargoShipList
    }
  ]}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router