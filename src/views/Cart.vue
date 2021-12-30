<template>
  <Navbar/>
    <div>
      <div class="card cart" >
        <div class="">
          <div class="intro py-3 text-center"><h1>CHECKOUT</h1></div>
          <ul class="list-group todos mx-auto">
            <li
            v-for="(product) in this.getCart"
            v-bind:key="product.id"
            class="list-group-item">
              <div>
                <span style="float: left"><b>{{ product.name }}</b></span><br />
                <span style="float: left">{{ product.description }}</span>
                <div class="quantityBtn">                  
                  <div>                    
                    <!-- <a @click="incrementItemQuantity(product)" href="#" v-on:click.prevent class="badge badge-success btnLight">Add to cart</a> -->
                      <div class="col" >
                        <a href="#" @click="decrementItemQuantity(product)" v-on:click.prevent><i class="fas fa-minus" style="font-size: 10px; color: #132a5e"></i></a>
                        <a href="#" class="border quantity" >{{ product.quantity }}</a>
                        <a href="#" @click="incrementItemQuantity(product)" v-on:click.prevent><i class="fas fa-plus" style="font-size: 10px; color: #132a5e"></i></a>
                      </div>                 
                  </div>    
                </div>
              </div>
            </li>
          </ul>
        </div>      
      </div>
      <div class="card cart" v-if="this.getCart.length >=1">
        <div class="text-center">
          <div class="row checkoutContainer">              
            <div class="col-sm-6">
              <input class="checkoutInput text-box" type="text" @click="writeEmail()" id="text-box"  v-model="emailDomain" placeholder="Your email address here:">
            </div>                     
            <div class="col-sm-6">                
              <input v-model="userComment" class="checkoutInput" type="text" placeholder="Any comments for the kitchen (e.g. allergies)?">
            </div>            
          </div>                    
        </div>
        <div class="text-center">
          <div class="row checkoutContainer">              
            <div class="col-sm-12 ">              
              <label class="text-box" v-if="checked === true" for="checkbox">Click me if you don't need a reminder to pick up your order</label>              
              <label class="text-box" v-else for="checkbox">Click me if you need a reminder to pick up your order</label>
              <input style="display:none" type="checkbox" id="checkbox" v-model="checked">              
            </div> 
            <div class="col-sm-12" v-if="checked === true">
              <input type="time" id="time" v-model="reminderTime">
              <label v-if="this.reminderTime < this.minReminderTime" style="color:#F33B1F;" for="time" >{{minReminderTime }} Reminder can be sent between 14:30 - 23:30 only</label>
            </div>            
          </div>                    
        </div>        
        <div>
          <a href="#" @click="goHome" v-on:click.prevent><i class="fa fa-long-arrow-left text-left py-4" style="font-size: 50px; color: #132a5e; float: left;"></i></a>
          <a href="#" @click="checkout" v-on:submit.prevent v-if="this.emailDomain && this.emailDomain != 'YourEmailHere@emea.merkleinc.com' && this.reminderTime > this.minReminderTime"><i class="fa fa-long-arrow-right text-right py-4" style="font-size: 50px; color: #132a5e; float: right;"></i></a>
        </div>
      </div>      
    </div>
</template>


<script>
const axios = require('axios');
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import moment from "moment";

export default {
  name : 'Cart',
  components: {
    Navbar,
  }, 
  data() {
		return {
      checked: true,
      time: '13:20',
			deliveryType: null,
			userComment: null,
			userId: null,
      deliveries: [
        {id: 1, name: 'Takeaway'},
        {id: 2, name: 'Late lunch'},
        {id: 3, name: 'Meeting'}  
      ],
      selectedDeliveryType: null,
      errorMessage: null,
      emailDomain: 'YourEmailHere@emea.merkleinc.com',
      reminderTime: '16:30',
      minReminderTime: '13:59',
      validReminder: true,
		}
	},
  computed: {
    ...mapGetters([
      'getCart',
      'getOrder',
    ])
  }, 
  methods: {
    ...mapActions([
      'addOrder',
      'removeProducts'
    ]),
    ...mapMutations([
      'incrementItemQuantity',
      'decrementItemQuantity'
    ]),
    goHome(){
      this.$router.push({ name: 'Home' })
    },
    changeDeliveryType(event) {
      this.selectedDeliveryType = event.target.options[event.target.options.selectedIndex].text
    },
    writeEmail(){
      const input = document.getElementById('text-box');
      input.setSelectionRange(0, 13);   
      },
    checkout() {  
      if(!this.checked){
        this.reminderTime = null
      }
      else{
        this.reminderTime = moment().format("YYYY-MM-DDT") + this.reminderTime
      }	
      const order = {
        deliveryType: this.getOrder.deliveryType,
        userComment: this.userComment,
        email: this.emailDomain,
        reminderTime: this.reminderTime,
        id: null
      }
      console.log(order);
      this.createOrder(order);        
    },
    createOrder(order){
      axios({
        method : 'post',
        url : process.env.VUE_APP_BACKEND_URL + "Orders",
        data : JSON.stringify(order),
        headers: {'Content-Type': 'application/json'},           
      })
        .then(res => {                
          this.addOrder(res.data);
          this.removeProducts();
          this.$router.push({path: "/checkout"});
        })
        .catch(error => {
		  	  console.error(error);  
          this.$toast.error("Something went wrong, please try again.",
            {
              position:"bottom-right",
              duration: 4000,
            }
          );                      
        }); 
    },           
  },
}
</script>

<style scoped>
  label{
    font-weight: unset;
  }
  label:hover {
    cursor:pointer;
  }
  .quantityBtn{
    float: right;
  }
  .list-group-item {
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,.125);
    border-left: none;
    border-right: none;
  }
  .checkoutInput{
    border-radius: unset;  
    border: unset;
    background-color: white;
    border-bottom: 1px solid #02C9D0;
  }
  .checkoutContainer{
    padding: 40px;
  }
  input:focus {
    border-radius: unset;  
    border: unset;
    outline: none !important;
    border-bottom: 1px solid #02C9D0;
  }
  input[type=time] {
    border: none;
    color: #2a2c2d;
    font-size: 14px;
    font-family: helvetica;
    width: 100px;
  }

  /* The naming convention for the hour, minute, second, and am/pm field is
  `-webkit-datetime-edit-{field}-field` */

  /* Hour */
  input[type=time]::-webkit-datetime-edit-hour-field {
    background-color: #f2f4f5;
    color: #02C9D0;
  }

  /* Minute */
  input[type=time]::-webkit-datetime-edit-minute-field {
    background-color: #f2f4f5;
    color: #02C9D0;
  }

  input[type="time"]::-webkit-calendar-picker-indicator{
  filter: invert(56%) sepia(91%) saturate(1867%) hue-rotate(140deg) brightness(99%) contrast(102%);
  cursor:pointer;
  }

  .text-box{
    color: #757575;
  }
  @media (max-width: 768px) and (min-width: 481px) {
  .checkoutContainer{
    padding-left: 0;
    padding-right: 0;
  }
}
  @media (max-width: 480px) {
  .checkoutInput{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .checkoutContainer{
    padding: 0;
  }
  .quantityBtn{
  float: left;
  margin-top: 20px;
  margin-right: 50%;
  }
}
</style>