<template>
  <div class="tv">
    <component :is="IsTimeToBeDisplayed"/>
    </div>
  
</template>

<script>
import moment from "moment";
import { mapGetters } from 'vuex'
import TvMenu from "@/components/TvMenu.vue"
import TvInstagram from "@/components/TvInstagram.vue"
import TvMessage from "@/components/TvMessage.vue"


export default {
  components: {
    TvMenu, TvInstagram, TvMessage
  },
  name: 'Tv',  
  data() {
    return {
      timeNow:  null,
      menuStart: null,
      menuEnd: null,
      messageStart: null,
      messageEnd: null
    }
  },
  computed: {
    ...mapGetters([
      'getTv',
      'getProducts'
    ]),
    IsTimeToBeDisplayed(){
      if (this.messageStart < this.timeNow && this.messageEnd > this.timeNow && this.messageEnabled) {
        return TvMessage;
      }
      if (this.menuStart < this.timeNow && this.menuEnd > this.timeNow && this.getProducts.length >=1 && this.menuEnabled) {
        return TvMenu;        
      } 
      return TvInstagram;
    }
  },
  created() {    
    this.timeNow = moment().format("HH:mm")
    this.messageStart = this.getTv[0].start
    this.messageEnd = this.getTv[0].finish
    this.messageEnabled = this.getTv[0].enabled
    this.menuStart = this.getTv[1].start
    this.menuEnd = this.getTv[1].finish
    this.menuEnabled = this.getTv[1].enabled
  }
}
</script>

<style scoped>
.tv{
  background-color: #12285D;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
