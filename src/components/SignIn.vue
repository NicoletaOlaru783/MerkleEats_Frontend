<template> 
<Navbar />   
    <!-- Modal HTML -->
<div id="myModal" class="">
	<div class="modal-dialog modal-login">
		<div class="modal-content">
			<div class="modal-header">
				<div class="avatar">
					<img src="https://www.tutorialrepublic.com/examples/images/avatar.png" alt="Avatar">
				</div>				
				<h4 class="modal-title">Login</h4>	
			</div>
			<div class="modal-body">
				<form @submit="signin" v-on:submit.prevent>
					<div class="form-group">
						<input type="username" class="form-control" name="username" placeholder="Username" v-model="username" required autocomplete="on"/>		
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="password" placeholder="Password" v-model="password" required autocomplete="on"/>	
					</div> 
          <div class="pass">
            <router-link style="color: #999;"  :to="{ name: 'Signup' }">Forgot password?</router-link>
          </div>       
					<div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg btn-block login-btn"> Login <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div></button>						
					</div>
					<div class="form-group">
					<br>
            <p class="errorMessage">{{ errorMessage }} </p>						
					</div>    
				</form>
			</div>
      <!-- <div class="modal-footer">				
        Don't have an account? <router-link  :to="{ name: 'Signup' }">Sign up</router-link>
			</div>              -->
		</div>
	</div>
</div>  
</template>

<script>
const axios = require('axios');
import Navbar from "@/components/Navbar.vue"
import { mapActions } from 'vuex'

export default {
	components: {
		Navbar
	},
	name: 'Signin',
	emits: ['refreshNav'],
	data() {
		return {
		username: null,
		password: null,
		loading: null,
		token: null,
		errorMessage: null
		};
  },
  methods: {
	...mapActions([
    'addUser',
  ]),
  signin() {		
    this.loading = true;
    const user = {
      username: this.username,
      password: this.password,
    };
    axios({
			method: 'post',
			url: process.env.VUE_APP_BACKEND_URL + 'Users/authenticate',
			data: JSON.stringify(user),
			headers: {
					'Content-Type': 'application/json',
			},
      })
      .then((res) => {
        this.$emit('refreshNav');
		    this.addUser(res.data);
        this.$router.push(this.$route.query.redirect || '/')
      })
      .catch((error) => {
        this.errorMessage = Object.values(error.response.data.errors).flat().join();
        console.error(this.errorMessage);
        this.$toast.error("Something went wrong, please try again.",
          {
            position:"bottom-right",
            duration: 4000,
          }
        );
      })		
    },
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style scoped>
  .signin h2 {
    text-align: center;
    font-size: 60px;
    margin: 30px 0;
  }
  .modal-login {		
    color: #636363;
    width: 350px;
  }
  .modal-login .modal-content {
    padding: 20px;
    border-radius: 5px;
    border: none;
  }
  .modal-login .modal-header {
    border-bottom: none;   
    position: relative;
    justify-content: center;
  }
  .modal-login h4 {
    text-align: center;
    font-size: 26px;
    margin: 30px 0 -15px;
  }
  .modal-login .form-control:focus {
    border-color: #02C9D0;
  }
  .modal-login .form-control, .modal-login .btn {
    min-height: 40px;
    border-radius: 3px; 
  }
  .modal-login .close {
    position: absolute;
    top: -5px;
    right: -5px;
  }	
  .modal-login .modal-footer {
    background: #ecf0f1;
    border-color: #dee4e7;
    text-align: center;
    justify-content: center;
    margin: 0 -20px -20px;
    border-radius: 5px;
    font-size: 13px;
  }
  .modal-login .modal-footer a {
    color: #999;
  }		
  .modal-login .avatar {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: -70px;
    width: 95px;
    height: 95px;
    border-radius: 50%;
    z-index: 9;
    background: #02C9D0;
    padding: 15px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  }
  .modal-login .avatar img {
    width: 100%;
  }
  .modal-login.modal-dialog {
    margin-top: 80px;
  }
  .modal-login .btn, .modal-login .btn:active {
    color: #fff;
    border-radius: 4px;
    background: #02C9D0 !important;
    text-decoration: none;
    transition: all 0.4s;
    line-height: normal;
    border: none;
  }
  .modal-login .btn:hover, .modal-login .btn:focus {
    background: #45aba6 !important;
    outline: none;
  }
  .form-control{
      margin-bottom: 20px;
  }
  .pass{
      text-align: right;
      padding-bottom: 20px;
  }
  .btn {
    min-height: 40px;
    border-radius: 3px; 
  }	
    .btn, .btn:active {
      color: #fff;
      border-radius: 4px;
      background: #02C9D0 !important;
      text-decoration: none;
      transition: all 0.4s;
      line-height: normal;
      border: none;
  }
    .btn:hover, .btn:focus {
      background: #02C9D0 !important;
      outline: none;
  }
    
</style>
