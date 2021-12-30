<template>
  <vue-final-modal  classes="modal-container" content-class="modal-content">      
    <h6 class="modal__title text-left">To: {{this.to}}</h6>
    <div class="modal__content">
      <form  @submit="sendEmail()" v-on:submit.prevent>
        <div class="form-group">
          <input v-model="subjectline" type="text" class="form-control" placeholder="Subjectline" required autocomplete="on">
        </div>
        <div class="form-group">
          <textarea v-model="message" type="text" class="form-control" placeholder="Message" required autocomplete="on"></textarea>
        </div>
        <div class="form-group"><br>
          <p class="errorMessage">{{ errorMessage }}</p>						
				</div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-lg btnBlu">Send Email</button>
        </div>
      </form>
    </div>      
  </vue-final-modal>  
</template>

<script>
const axios = require('axios');
import {VueFinalModal, ModalsContainer } from 'vue-final-modal'

export default {
  components: {
    VueFinalModal,
    ModalsContainer
  },
  props: ['to'],
  data(){
    return{
      subjectline: null,
      message: null,
      errorMessage: null
    }
  },
  methods: {
    sendEmail() {
      const email =  {
        recipient: this.to,
        subject: this.subjectline,
        text: this.message,
        html: null
      }
      axios({
				method: 'post',
				url: process.env.VUE_APP_BACKEND_URL + 'SendEmail/SendCustomEmail',
				data: JSON.stringify(email),
				headers: {'Content-Type': 'application/json',},
      	})
        .then((response) => {
          this.resetForm();
          this.$emit('hide');
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
    resetForm() {
      this.email = '';
      this.subjectline = '';
      this.message = '';
    },
  },
}
</script>

<style scoped>
  :deep .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :deep .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 90%;
    margin: 0 1rem;
    padding: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: #fff;
    width: 500px;
  }
  .modal__title {
    margin: 0 2rem 0 0;
  }
  .modal__action {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    padding: 1rem 0 0;
  }
  .modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .btnBlu{
    margin-top: 10px;
    background-color: #132A5E;
  }
</style>