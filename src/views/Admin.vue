<template>
<Navbar/>
  <div>
    <div class="card cart" >
        <div class="intro py-3 text-center">
            <nav class="secondary-nav">
              <a @click="swapComponent('menu-comp')" :class="{active:selected == 'menu-comp'}" href="" v-on:click.prevent>Daily Menu</a>
              <a @click="swapComponent('order-comp')" :class="{active:selected == 'order-comp'}" href="" v-on:click.prevent>Orders</a>
              <a @click="swapComponent('tv-comp')" :class="{active:selected == 'tv-comp'}" href="" v-on:click.prevent>Tv</a>
            </nav>              
            <component :is="currentComp"></component> 
        </div>
    </div>
 </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Menu from "@/components/Menu.vue"
import Order from "@/components/Order.vue"
import TvControl from "@/components/TvControl.vue"

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    'menu-comp' : Menu,
    'order-comp' : Order,
    'tv-comp' : TvControl,
    Navbar, 
  },  
  data() {
    return {
      currentComp: 'menu-comp',
      selected: 'menu-comp',
    };
  },
  computed: {
    ...mapGetters([
      'getDate',
      'getUser',
    ]),
  },
  created(){
    if(!this.getUser.isAdmin){
      this.$router.push({ name: 'Signin' })
    }
    this.addMenu()
    this.addOrders(this.getDate) 
    this.addOrderItems()  
  },
  methods:{  
    ...mapActions([
      'addMenu', 
      'addOrders',
      'addOrderItems',
    ]), 
    swapComponent: function(component)
    {
      this.currentComp = component;
      this.selected = component;
    }
  },
}
</script>

<style scoped>
  .active{
    border-bottom: 2px solid #02C9D0;
    padding-bottom: 4px;
  }
  .card{
    max-width: unset;
  }
  .secondary-nav{
    text-align: center;   
    max-width: 950px;
    width: 90%; 
    margin: 40px auto;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    letter-spacing: 0.5;      
  }
  .secondary-nav a{
    display: inline-block;
    text-decoration: none;
    margin: 0 10px;
    color: #2c3e50;
  }
  a.router-link-active{
    border-bottom: 2px solid #60c7c1;
    padding-bottom: 4px;
  }
</style>