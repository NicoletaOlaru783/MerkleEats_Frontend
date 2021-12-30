<template>
  <div>
    <div class="container">
      <div class="intro py-3 text-center"></div>
      <ul class="list-group todos mx-auto">
        <a @click="publish()" v-if="this.getProducts.length<1" href="#" class="badge badge-dark btnBlu "><h6>Publish menu</h6></a>
        <a @click="unpublish()" v-if="this.getProducts.length >=1" href="#" class="badge badge-dark btnLight "><h6>Unpublish menu</h6></a>
        <li
          v-for="product in this.getMenu"
          v-bind:key="product.id"
          class="list-group-item"
          style=""
          :class="{ selected: product.edit }">
          <div v-if="!product.edit" @click="editProductMenu(product)">
            <span style="float: left"><b>{{ product.name }}</b></span><br />
            <span style="float: left">{{ product.description }}</span>
            <div style="float: right" v-if="this.getProducts.length <1">
              <i
                @click="removeProductMenuId(product.id)"
                v-on:click.prevent
                class="fa fa-trash-o"
                style="font-size: 20px; color: #132a5e">
              </i>
            </div>
          </div>
          <div v-if="product.edit && this.getProducts.length <1">
            <input style="float: left" v-model="product.name" /><br />
            <input style="float: left" v-model="product.description" />
            <div style="float: right">
              <button
                @click="updateProductMenu(product)"
                v-on:click.prevent
                class="btn btn-primary btn-sm btn-block btnBlu">
                Update
              </button>
            </div>
          </div>
        </li>
      </ul>
      <form
        @submit="createProduct"
        v-on:submit.prevent
        v-if="this.getProducts.length <1"
        class="text-center my-5">
        <div class="intro pb-3 text-center"><h5>Add a new menu item...</h5></div>        
        <div class="form-group pt-4">
          <input
            class="form-control"
            name="title"
            placeholder="Title"
            v-model="title"
            required
            autocomplete="on"/>
        </div>
        <div class="form-group">
          <input
            class="form-control"
            name="description"
            placeholder="Description"
            v-model="description"
            required
            autocomplete="on"/>
        </div>
        <div class="form-group">          
          <button type="submit" class="btn btn-primary btn-lg btnBlu" >CREATE</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
const axios = require('axios');

export default {
  name: 'Menu',
  computed: {
    ...mapGetters([
      'getMenu',
      'getProducts',
    ]),
  },
  data() {
    return {
      id: null,
      title: null,
      description: null,
      toPublish: []
    };
  },  
  created() {
    this.getMenu.forEach((element, index, array) => {
      element.edit = false;
    });
  },
  methods: {
    ...mapActions([
      'addProductMenu', 
      'removeProductMenu', 
      'removeProducts', 
      'addProducts'
    ]),
    createProduct() {
      const item = {
        name: this.title,
        description: this.description,
      };
      this.addProductMenu( item);
      this.resetForm();
    },
    removeProductMenuId(productId) {
      this.removeProductMenu(productId);
    },
    editProductMenu(product) {
      this.getMenu.filter((p) => p != product).forEach((s) => (s.edit = false));
      product.edit = true;
    },
    updateProductMenu(product) {
      const item = {
        id: product.id,
        name: product.name,
        description: product.description,
      };
      this.$store.dispatch('updateProductMenu', item, product.id);
      product.edit = false;
    },
    resetForm() {
      this.title = '';
      this.description = '';
    },
    publish(){
      this.getMenu.forEach((element) => { 
        const item = {
          name: element.name,
          description: element.description,
        };        
        this.toPublish.push(item)
      });
      axios({
        method: 'post',
        url: process.env.VUE_APP_BACKEND_URL + 'SaveMenu',
        data: JSON.stringify(this.toPublish),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(() => {
          this.addProducts();
          this.toPublish = []
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Something went wrong, please try again.",
            {
              position:"bottom-right",
              duration: 4000,
            }
          );
        });
    },
    unpublish(){
      this.getMenu.forEach((element) => { 
        const item = {
          id: element.id
        };        
        this.toPublish.push(item)
      });
      axios({
        method: 'delete',
        url: process.env.VUE_APP_BACKEND_URL + 'SaveMenu',
        data: JSON.stringify(this.toPublish),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(() => {
          this.toPublish = []
          this.removeProducts() 
        })
        .catch((error) => {
          console.error(error);
          this.$toast.error("Something went wrong, please try again.",
            {
              position:"bottom-right",
              duration: 4000,
            }
          );
        });  
    }
  },
};
</script>

<style scoped>
  .list-group-item {
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,.125);
    border-left: none;
    border-right: none;
  }
  .selected {
    background-color: #02c9d01f;
  }
  input{
    background-color: white;
    margin-bottom: 0;
  }
  .btnBlu{
    margin-top: 10px;
    background-color: #132A5E;
  }
  .btnLight{
    border-color: #0bbbc1;
    background-color: #02C9D0;
  }
</style>
