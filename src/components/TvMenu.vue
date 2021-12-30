<template> 
  <div class="container text-left mt-5">
  <div class="row center" >
    <div class="col-sm-6 mb-5" v-for="product in this.getMenu" v-bind:key="product.id">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
name: 'Menu',
  computed: {
    ...mapGetters([
      'getMenu',
    ]),
  },
}
</script>

<style scoped>
  .center {
    color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%); /* for IE 9 */
    -webkit-transform: translate(-50%, -50%); /* for Safari */
  }
  h3{
    font-size: 38px;
  }
  p{
    font-size: 24px;
  }
</style>>
