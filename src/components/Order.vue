<template>
    <SendEmailModal v-model="showSendEmailModal" :to="to" @hide="showSendEmailModal = false"/>     
    <div class="container">
      <div class="row">
        <div class="col-2">
          <FilterByDateBtn/>
        </div>
        <div v-if="this.temporary.length >= 1" class="col">
          <button class="btn btn-info btn-block btnLight" @click="acceptOrder(this.temporary)">Accept All</button>
        </div>
        <div v-if="this.temporary.length >= 1" class="col">
          <button class="btn btn-danger btn-block btnBlue" @click="rejectOrder(this.temporary)">Reject All</button>
        </div>      
        <div class="col-6">
        </div>
      </div>
    </div>
  <div>
    <div class="d-flex justify-content-center row">
      <div class="col-md-10">
        <div class="rounded">
          <div class="table-responsive table-borderless">
            <table class="table">
              <thead>
                <tr>
                  <th class="filters">#</th>
                  <th class="filters text-left">Email</th>
                  <th class="filters text-left">Order type</th>
                  <th class="filters text-left">Status</th>
                  <th class="filters text-left">Price</th>
                  <th class="filters text-left">Items</th>
                  <th class="filters text-left">User Comment</th>
                  <th class="filters"></th>
                  <th class="filters"></th>
                  <th class="filters text-center">Mark<input type="checkbox" v-model="selectAll" @click="select"></th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-for="(order, index) in orderedOrders" v-bind:key="order.id" class="cell-1">
                  <td>{{ index + 1 }}</td>
                  <td class="text-left"><a class="" href="" @click="showSendEmailModal = true, this.to = order.email" v-on:click.prevent>{{ order.email.substring(0,14)+"..." }}</a></td>
                  <td class="text-left">{{ order.deliveryType }}</td>
                  <td class="text-left">
                    <span class="badge badge-info secondaryBG">{{ order.status }}</span>
                  </td>
                  <td><input class="price" type="text" v-if="order.deliveryType ==='Takeaway'" v-model="order.price"></td>
                  <td class="text-left">
                    <tr 
                    v-for="item in this.getOrderItems" 
                    v-bind:key="item.id" 
                    >  
                      <td style="border:none;"  v-if="item.orderId == order.id">{{ item.name }}</td>
                      <td style="border:none;"  v-if="item.orderId == order.id">{{ item.quantity }}</td>
                    </tr>
                  </td>
                  <td class="text-left">{{ order.userComment }}</td>
                  <td><a @click="acceptOrder(order)" href="#" v-on:click.prevent v-if="order.status=='New'" class="badge badge-success btnLight ">Accept</a></td>
                  <td><a @click="rejectOrder(order)" href="#" v-on:click.prevent v-if="order.status=='New'" class="badge badge-danger btnBlue">Reject</a></td>
                  <td><input type="checkbox" :value="order"  v-model="temporary" v-if="selectAll && order.status=='New'"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import FilterByDateBtn  from "@/components/FilterByDateBtn.vue"
import SendEmailModal from "@/components/SendEmailModal.vue"
import _ from 'lodash'

export default {
  name: "Order",
  components: {
    FilterByDateBtn,
    SendEmailModal
  },
  computed: {
    ...mapGetters([
      'getOrders',
      'getOrderItems',
      'getDate',
    ]),
    orderedOrders: function () {
    return _.orderBy(this.getOrders, 'createdAt')
  }
  },
  data() {
    return {
      scrollPosition: 1023.111083984375,
      date: moment().format("YYYY-MM-DD"),
      selected: [],
		  selectAll: false,
      items: [],
      temporary: [],
      showSendEmailModal: false,
      to: null,
      type : null,
      toEmails: []
    };
  },
  methods: {
    ...mapActions([
      'addOrders'
    ]),
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD hh:mm:ss A");
    },
    acceptOrder(order){
      if(order.length >= 1){
        order.forEach((value, index) => { 
          const item = {
            id: value.id,
            price: parseInt(value.price),
            status: "Accepted",
          }       
          this.items.push(item)
        });        
      } else {
        const item = {
          id: order.id,
          price: parseInt(order.price),
          status: "Accepted",
        }
        this.temporary.push(order)
        this.items.push(item)
      }
      this.type = 0;
      this.updateOrder(this.items, this.type);
    },
    rejectOrder(order){      
      if(order.length >= 1){
        order.forEach((value, index) => { 
          const item = {
            id: value.id,
            price: parseInt(value.price),
            status: "Cancelled",
          }       
          this.items.push(item)
        });        
      } else {
        const item = {
          id: order.id,
          price: parseInt(order.price),
          status: "Cancelled",
        }
        this.temporary.push(order)
        this.items.push(item)
      }
      console.log(this.items)
      this.type = 1;
      this.updateOrder(this.items, this.type);
    },
    updateOrder(items, type) {
      axios({
        method: 'patch',
        url: process.env.VUE_APP_BACKEND_URL + 'Orders',
        data: JSON.stringify(items),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          this.addOrders(this.getDate)
          this.sendEmailOrderStatus(type)
          this.temporary = []
          this.selected = []
          this.selectAll = false
          this.items = []          
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Something went wrong, please try again.",
            {
              position:"bottom-right",
              duration: 4000,
            }
          );
        })     
    },
    sendEmailOrderStatus(type){
      this.temporary.forEach((value, index) => { 
        const user = {
          recipient: value.email,
          id: value.id,
          price: parseInt(value.price),
          reminderTime: value.reminderTime
        };
        this.toEmails.push(user)        
      })
      axios({
        method: 'post',
        url: process.env.VUE_APP_BACKEND_URL + 'SendEmail/SendOrderEmail/' + type,
        data: JSON.stringify(this.toEmails),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          console.log(this.toEmails)  
          this.toEmails = [];               
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Something went wrong, please try again.",
            {
              position:"bottom-right",
              duration: 6000,
            }
          );
        }) 
    },
    select() {
			this.temporary = [];
			if (!this.selectAll) {
				for (let i in this.getOrders) {
          if(this.getOrders[i].status =='New'){
            this.temporary.push(this.getOrders[i]);
          }
				}
			}
		} 
  },
};
</script>

<style scoped>
  .price {
    text-align: center;
  }
  .filters{
    border-bottom: 0;
    border-top: 1px solid #dee2e6;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    letter-spacing: 0.25px;
  }
  .container{
    max-width: 83.333333%;
  }
  input{
    margin-bottom: 0;
  }
  .badge{
    display: revert;
  }
  .btnBlue{
    background-color: #132A5E;
    border-color: #060f25;
  }
  .btnLight{
    border-color: #0bbbc1;
    background-color: #02C9D0;
  }
  .badge-success[href]:focus, .badge-success[href]:hover{
    background-color: #0a9ca1;
  }
</style>