<template>
  <select class="selectBox" @change="filterOrdersByDate" :dateNow="date">
    <option :value="date.value" v-bind:key="date.id" v-for="date in dates">{{ date.name }}</option>
  </select>
</template>

<script>

import {mapGetters, mapActions } from 'vuex'
import moment from "moment";

export default {
  data(){
    return{
      dates: [
        {id: 1, name: 'Today', value: moment().format("YYYY-MM-DD")},
        {id: 2, name: 'This month', value: moment().startOf('month').format("YYYY-MM-DD")}, 
        {id: 3, name: 'This year', value: moment().startOf('year').format("YYYY-MM-DD")} 
      ],
      date: null,
    }
  },
  methods: {
    ...mapActions([
      'addOrders', 
      'addDate'
    ]),
    filterOrdersByDate(event){
      this.date = event.target.options[event.target.options.selectedIndex].value
      this.addOrders(this.date)
      this.addDate(this.date)
    },
  }
}
</script>