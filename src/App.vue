<template> 
  <router-view>
</router-view>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import {mapActions} from 'vuex'

const axios = require('axios');
import moment from "moment";
export default {
  name: 'App',
  components: {
    Navbar
  },
  created() {
    axios.get(process.env.VUE_APP_BACKEND_URL + "Products")
      .then(response => 
        this.addMenu(response.data)     
      )
      .catch(error => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    this.addDate(moment().format("YYYY-MM-DD"));
    this.getTvDataFromServer();
  },
  methods: {
    ...mapActions([
      'addMenu',
      'addDate', 
      'getTvDataFromServer',
    ]),
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@200;300;400;500;600&display=swap');
body{
  background-color: #e5e5e752;
}
h1{
  font-family: 'Poppins', sans-serif;
  font-size: 46px;
  letter-spacing: -0.5px;
}
h4{
  font-family: 'Open Sans', sans-serif;
  font-size: 33px;
  letter-spacing: 0.25px;
}
h5{
  font-family: 'Open Sans', sans-serif;
  font-size: 23px;
  letter-spacing: 0px;
}
h6{
  font-family: 'Open Sans', sans-serif;
  font-size: 19px;
  letter-spacing: 0.15px;
}
span{
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  letter-spacing: 0.25px;
}
button{
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  letter-spacing: 1.25px;
  font-weight: 500;
}
.th{
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  letter-spacing: 0.5px;
}
td{
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  letter-spacing: 0.4;
}
.title {
  margin-bottom: 5vh
}
.card {
  margin: auto;
  max-width: 950px;
  width: 90%;
  box-shadow: 0 6px 20px 0 rgb(0 0 0 / 4%);
  border-radius: 1rem;
  border: transparent;
  margin-bottom: 20px;
}
.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
  border-style: solid;
  border-width: thin;
  border-color: #e5e5e78a;
}
@media(max-width:767px) {
  .card {
    margin: 3vh auto
  }
}
.cart {
  padding: 4vh;
  border-bottom-left-radius: 1rem;
   border-top-right-radius: 1rem
}
.summary {
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 4vh;
}
.summary .col-10 {
  padding: 0
}
.row {
  margin: 0
}
.title b {
  font-size: 1.5rem
}
.main {
  margin: 0;
  padding: 2vh 0;
  width: 100%
}
.col-2,
.col {
  padding: 0 1vh
}
a {
  padding: 0 1vh
}
.close {
  margin-left: auto;
  font-size: 0.7rem
}
img {
  width: 3.5rem
}
.back-to-shop {
  margin-top: 4.5rem
}
form {
  padding: 2vh 0
}
.selectBox {
  border: 1px solid rgba(0, 0, 0, 0.137);
  padding: 1vh;
  margin-bottom: 2vh;
  outline: none;
  width: 100%;
  background-color: rgb(255 255 255);
  border-radius: 4px;
}
input {
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  background-color: rgb(247, 247, 247)
}
input:focus::-webkit-input-placeholder {
  color: transparent
}
.border{
  color: #02C9D0;
}
a {
  color: #02C9D0;
  text-decoration: none;
}
a:hover {
  color: #02C9D0;
}
.primary{
  color: #132A5E;
}
.secondary{
  color: #02C9D0;
}
.primaryBG{
  background-color: #132A5E;
}
.secondaryBG{
  background-color: #02C9D0;
}
.colorLight{
   color: #FFFFFF;
}
.colorDark{
   color: #000034;
}
.errorMessage{
	color: red;
	font-size: 14px;
}
textarea{
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 7px;
  height: 70px;
  padding: 5px;
}
</style>
