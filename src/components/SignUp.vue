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
				<h4 class="modal-title">Registration</h4>	
			</div>
			<div class="modal-body">
				<form @submit="signup" v-on:submit.prevent>
					<div class="form-group">
						<input type="email" class="form-control"  placeholder="Email" v-model="email" required autocomplete="on"/>		
					</div>
					<div class="form-group">
						<input type="name" class="form-control" placeholder="First Name" v-model="firstName" required autocomplete="on"/>	
					</div> 
          <div class="form-group">
						<input type="name" class="form-control"  placeholder="Last Name" v-model="lastName" required autocomplete="on"/>	
					</div> 
          <div class="form-group">
						<input type="password" class="form-control"  placeholder="Password" v-model="password" required autocomplete="on"/>	
					</div> 
          <div class="form-group">
						<input type="password" class="form-control"  placeholder="Password Confirm" v-model="confirmPassword" required autocomplete="on"/>	
					</div>      
					<div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg btn-block login-btn"> Sign up</button>						
					</div>
					<div class="form-group">
						<br>
            <p class="errorMessage">{{ errorMessage }} </p>						
					</div>    
				</form>
			</div>
            <div class="modal-footer">		
               Already have an account?<router-link :to="{name: 'Signin'}">Sign in</router-link>
			</div>             
		</div>
	</div>
</div>
</template>

<script>
const axios = require('axios')
import Navbar from "@/components/Navbar.vue"

export default {
	components: {
		Navbar
	},
	name: 'Signup',
	data() {
		return {
			email: null,
			firstName: null,
			lastName: null,
			password: null,
			confirmPassword: null,
			errorMessage: null
		}
	},
  methods : {
    signup() {      	
      const user = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        confirmPassword: this.confirmPassword
		  }
      axios({
        method : 'post',
        url : process.env.VUE_APP_BACKEND_URL + "Users/register",
        data : JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        this.$router.replace("/");        
        this.$router.push({path: 'signin'});
      })
      .catch(error => {
			  this.errorMessage = Object.values(error.response.data.errors).flat().join();
        this.$toast.error("Something went wrong, please try again.",
          {
            position:"bottom-right",
            duration: 4000,
          }
        );
      });      
    }
  }
}
</script>

<style scoped>
  .signup h2{
    text-align : center;
    font-size : 60px;
    margin : 30px 0;
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