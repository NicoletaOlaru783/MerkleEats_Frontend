<template>
  <div class="center">
     <h3>{{ this.getTv[0].message }}</h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
name: 'Menu',
  computed: {
    ...mapGetters([
      'getTv',
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
    font-size: 64px;
    text-align: center;
  }
</style>
 