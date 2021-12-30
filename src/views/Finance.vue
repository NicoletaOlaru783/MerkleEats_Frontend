<template>
<Navbar/>
 <div>
    <div class="card cart" >
      <div class="intro py-3 text-center">
        <div class="container">
          <div class="row">
            <div class="col-2">
              <FilterByDateBtn />
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
                          <th class="filters text-center">#</th>
                          <th class="filters text-center">Email</th>
                          <th class="filters text-center">Price</th>
                        </tr>
                      </thead>
                      <tbody class="table-body">
                        <tr v-for="(order, index) in this.groupedOrders" v-bind:key="order.id" class="cell-1">
                          <td>{{ index + 1 }}</td>
                          <td class="text-center"><a  href="#"  v-on:click.prevent>{{ order.email }} </a></td>                          
                          <td> {{ order.price }} </td>              
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
 </div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FilterByDateBtn  from "@/components/FilterByDateBtn.vue"
import Navbar from "@/components/Navbar.vue"
import moment from "moment";

export default {
  name: 'Finance',
  components: {
    FilterByDateBtn, Navbar
  },
    data() {
      return { 
        groupedOrders : null
    }
  },
  computed: {
    ...mapGetters([
      'getOrders',
      'getUser',
      'getDate'
    ]),
    filteredOrders: function() {
      return _.filter(this.getOrders, {'status': 'Accepted'})
    },
    groupedOrders: function(){
      //Group orders by email 
    var holder = {};
    this.filteredOrders.forEach(function(d) {
      if (holder.hasOwnProperty(d.email)) {
        holder[d.email] = holder[d.email] + d.price;
      } else {
        holder[d.email] = d.price;
      }      
    });
    //Recreate the array 
    var obj2 = [];
    for (var prop in holder) {
      obj2.push({ email: prop, price: holder[prop] });
    }    
    return obj2
    }
  },  
  data() {
    return {
      token: null,
      date: moment().format("YYYY-MM-DD"),
    }
  },
  created(){
    if(!this.getUser.isFinance){
      this.$router.push({ name: 'Signin' })
    }
    this.addOrders(this.getDate) 
  },
  methods: {
    ...mapActions([
      'addOrders', 
    ]), 
    dateTime(value) {
      return moment(value).format("YYYY-MM-DD hh:mm:ss A");
    },
  },
}
</script>

<style scoped>
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
  .card{
    max-width: unset;
  }
</style>