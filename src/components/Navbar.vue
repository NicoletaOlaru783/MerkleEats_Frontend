<template>
  <nav class="main-nav container">
    <router-link :to="{name: 'Home'}" v-if="this.getUser.isAdmin || this.getUser.isFinance">Home</router-link> <span v-if="this.getUser.isAdmin || this.getUser.isFinance">|</span> 
    <router-link :to="{name: 'Admin'}" v-if="this.getUser.isAdmin">Admin</router-link> <span v-if="this.getUser.isAdmin">|</span> 
    <router-link :to="{name: 'Finance'}" v-if="this.getUser.isFinance">Finance</router-link> <span v-if="this.getUser.isFinance">|</span> 
    <router-link :to="{name: 'TV'}" v-if="this.getUser.isAdmin">TV</router-link> <span v-if="this.getUser.isAdmin">|</span> 
    <router-link :to="{name: 'Signin'}" v-if="!this.getUser.token"><i class="fas fa-users-cog"></i></router-link>
        <a v-if="this.getUser.token" href="#" @click="signout">Sign out</a>
  </nav>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['key'],
  computed: {
    ...mapGetters([
      'getUser',
    ])
  },
  methods: {
    ...mapActions([
      'removeUser'
    ]),
    signout() {
      this.removeUser();
      this.$router.push({name:'Home'});
    },
  },
}
</script>
<style scoped>
  .main-nav{
    text-align: right;   
    max-width: 950px;
    width: 90%; 
    margin: 40px auto;    
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    letter-spacing: 0.5;    
  }
  .main-nav a{
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