import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
const axios = require('axios');
import moment from "moment";

export default createStore({
  state: {
    cart: [],
    user: {},
    order: {},
    products: [],
    //Admin
    menu: {},
    orders: {},
    orderItems: {},
    filteredDate: '',
    tv: [],
  },
  plugins: [createPersistedState()],

  getters: {
    getCart: (state) => state.cart,
    getCartLength: (state) => state.quantity,
    getOrder: (state) => state.order,
    getUser: (state) => state.user,

    //Homepage
    getProducts: (state) => state.products,

    //Admin
    getMenu: (state) => state.menu,
    getOrders: (state) => state.orders,
    getOrderItems: (state) => state.orderItems,
    getDate: (state) => state.filteredDate,
    getTv: (state) => state.tv,
  },


  actions: {
    emptyCart({ commit }) {
      commit('emptyCart');
    },
    emptyOrder({ commit }) {
      commit('emptyOrder');
    },
    addUser({ commit }, user) {
      commit('saveUser', user);
    },
    removeUser({ commit }) {
      commit('removeUser');
    },
    addOrder({ commit }, order) {
      commit('saveOrder', order);
    },

    //Homepage    
    addProducts({commit}){
      axios
      .get( process.env.VUE_APP_BACKEND_URL + 'SaveMenu')
      .then((response) => commit('saveProducts', response.data))
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    },
    removeProducts({ commit }) {
      commit('emptyProducts');      
    },


    //Admin Menu Tab
    addMenu({ commit }) {
      axios 
      .get( process.env.VUE_APP_BACKEND_URL + "Products")
      .then(response => commit('saveMenu', response.data))
      .catch(error => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
      
    },
    addProductMenu({ commit }, item) {
      axios({
        method: 'post',
        url: process.env.VUE_APP_BACKEND_URL + 'Products',
        data: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => commit('saveProductMenu', response.data))
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    },
    removeProductMenu({ state, commit }, productId) {
      axios({
        method: 'delete',
        url: process.env.VUE_APP_BACKEND_URL + 'Products/' + productId,
        data: JSON.stringify(productId),
        headers: { 'Content-Type': 'application/json' },
      }) 
      .then(() => {
        var index = state.menu.findIndex(
          (product) => product.id === productId
        );
        commit('delProductMenu', index);
      })
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    },
    updateProductMenu(item, productId) {
      axios({
        method: 'patch',
        url: process.env.VUE_APP_BACKEND_URL + 'Products/' + productId,
        data: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      })
      .then()
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    },

    //Admin Order Tab
    addOrders({ commit }, createdAt) {
      axios
      .get( process.env.VUE_APP_BACKEND_URL + 'Orders/ReadByDate/' + createdAt)
      .then((response) => {
        var data = response.data.filter((order) => order.confirmedAt !== null)
        commit('saveOrders', data)
      })
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    },
    addOrderItems({ commit }) {
      axios
      .get( process.env.VUE_APP_BACKEND_URL + 'OrderItems')
      .then((response) => commit('saveOrderItems', response.data))
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    },
    addDate({ commit }, filteredDate) {
      commit('saveDate', filteredDate);
    },

    //Admin TV Tab
    getTvDataFromServer({ commit }) {
      axios
      .get( process.env.VUE_APP_BACKEND_URL + 'TV')
      .then((response) => commit('saveTv', response.data))
      .catch((error) => {
        console.error(error);
        this.$toast.error("Something went wrong, please try again",
          {
            position:"bottom-right",
            duration: 3000,
          }
        );
      });
    },
  },

  
  mutations: {
    setCart: (state, cart) => (state.cart = cart),
    removeProductFromCart: (state, productId) =>
      (state.cart = state.cart.filter((product) => product.id !== productId)),
    incrementItemQuantity: (state, product) => {
      const cartItem = state.cart.find((item) => item.id === product.id);
      const productItem = state.products.find((item) => item.id === product.id);
      productItem.qty = productItem.qty + 1;

      if (!cartItem) {
        product.quantity = 1;
        state.quantity++;
        state.cart.unshift(product);
      } else {
        cartItem.quantity = cartItem.quantity + 1;
        state.quantity = state.quantity + 1;
      }
    },
    decrementItemQuantity: (state, product) => {
      const cartItem = state.cart.find((item) => item.id === product.id);
      const productItem = state.products.find((item) => item.id === product.id);
      productItem.qty = productItem.qty - 1;

      if (cartItem.quantity == 1) {
        state.cart = state.cart.filter((product) => product.id !== cartItem.id);
        state.order = []
      } else {
        cartItem.quantity = cartItem.quantity - 1;
        state.quantity = state.quantity - 1;
      }
    },
    emptyCart: (state) => ((state.cart = []), (state.quantity = 0)),
    emptyOrder: (state) => (state.order = []),
    saveUser: (state, user) => (state.user = user),
    removeUser: (state) => (state.user = {}),
    saveOrder: (state, order) => (state.order = order),

    //Homepage
    saveProducts: (state, products) => (state.products = products),
    emptyProducts: (state) => (state.products = []),

    //Admin Order Menu
    saveMenu: (state, menu) => (state.menu = menu),
    saveProductMenu: (state, item) => state.menu.push(item),
    delProductMenu: (state, index) => state.menu.splice(index, 1),

    //Admin Order Tab
    saveOrders: (state, orders) => {
      orders.forEach((element, index, array) => {
        element.edit = false;
      });
      state.orders = orders;
    },
    saveOrderItems: (state, orderItems) => (state.orderItems = orderItems),
    saveDate: (state, filteredDate) => (state.filteredDate = filteredDate),

    //Admin Tv Tab
    saveTv: (state, tv) => (state.tv = tv),
    updateTv: (state, index, item) => state.tv.splice(index, 1).push(item),
  },
});
