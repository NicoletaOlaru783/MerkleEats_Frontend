import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Finance from '../views/Finance.vue'
import NotFound from '../views/NotFound.vue'
import NotAllowed from '../views/NotAllowed.vue'
import Cart from '../views/Cart.vue'
import TV from '../views/TV.vue'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Checkout from '../components/Checkout.vue'
import OrderConfirmed from '../views/OrderConfirmed.vue'
import OrderCancelled from '../views/OrderCancelled.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/finance',
    name: 'Finance',
    component: Finance
  },
  {
    path: '/tv',
    name: 'TV',
    component: TV
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SignIn
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/orderConfirmed/o/:orderId',
    name: 'OrderConfirmed',
    component: OrderConfirmed
  },  
  {
    path: '/orderCancelled/o/:orderId',
    name: 'OrderCancelled',
    component: OrderCancelled
  },
  {
    path: '/notAllowed',
    name: 'NotAllowed',
    component: NotAllowed
  },
  //catch 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
