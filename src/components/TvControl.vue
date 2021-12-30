<template>
  <div>
    <div class="d-flex justify-content-center row">
      <div class="col-md-10">
        <div class="rounded">
          <div class="table-responsive table-borderless">
            <table class="table">
              <thead>
                <tr>
                  <th class="filters text-left">Control</th>
                  <th class="filters">Time Start</th>
                  <th class="filters">Time End</th>
                  <th class="filters">Message</th>
                  <th class="filters text-center">Active</th>
                  <th class="filters">Action</th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr v-bind:key="item.id" v-for="(item) in this.getTv">
                  <td class="text-left">{{ item.name }}</td>               
                  <td class="text-center"><input  @change="item.active = true" type="time" v-model="item.start" v-if="item.id!=3"></td>               
                  <td class="text-center"><input  @change="item.active = true" type="time" v-model="item.finish" v-if="item.id!=3"></td>               
                  <td class="text-center"><textarea @change="item.active = true" cols="10" type="text" v-model="item.message" v-if="item.id==1"></textarea></td>               
                  <td class="text-center"><input type="checkbox" @change="item.active = true" v-model="item.enabled"></td>               
                  <td class="text-center">
                    <a @click="updateTv(item)" v-on:click.prevent v-if="item.active" class="badge badge-success btnLight" href="#" >Save Changes</a>
                  </td>               
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
const axios = require('axios');
import { mapGetters, mapActions, } from 'vuex'

export default {
  name: 'TvControl',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'getTv'
    ]),
  },
  methods: {
    updateTv(item){      
       axios({
        method: 'patch',
        url: process.env.VUE_APP_BACKEND_URL + 'Tv',
        data: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(console.log(JSON.stringify(item)))
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
       item.active = false;     
    }
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
</style>