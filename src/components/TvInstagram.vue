<template>
 <div class="container">
  <div id="myCarousel" class="carousel slide center" data-ride="carousel" data-interval="30000">
    <!-- Wrapper for slides -->
    <div class="carousel-inner">
      <div v-for="(image, index) in this.data" v-bind:key="image.id"  :class="['item',{ 'active' : index === 0 }]">
        <div v-if="image.media_type =='IMAGE'">
          <img :src="image.media_url" alt="Image" style="width:800px;">
          <div class="carousel-caption">
            <h3 style="margin-bottom: 20px;">{{ image.caption }}</h3>
          </div>
        </div>
        <div v-if="image.media_type =='CAROUSEL_ALBUM'">
          <div v-for="(x, index) in image.children.data" v-bind:key="x.id" >
            <div class="col-sm album" v-if="index === 0 || index === 1">
              <img v-if="x.media_type =='IMAGE'" :src="x.media_url" alt="Image" style="width:100%">
              <video v-if="x.media_type =='VIDEO'" :src="x.media_url" controls autoplay muted style="width:100%"></video>
            </div>
          </div> 
          <div class="carousel-caption2">
          <h3 style="margin-bottom: 20px;">{{ image.caption }}</h3>
        </div>         
        </div>        
      </div>
    </div>
  </div>
</div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'Instagram',
  data(){
    return {
      expires_in: null,
      access_token: null,
      data: null
    }
  },
  created(){
    axios
      .get(process.env.VUE_APP_BACKEND_URL + 'TV/GetToken')
      .then((response) =>{
        var now = Date.now() / 1000;
        var expire = response.data.expiresIn / 2;
        if(expire + now < now){
          this.refreshAccessToken(response.data.access_token)
          console.log("Expired")
        }
        else{
          this.getImagesFromInstagram(response.data.access_token)
          console.log("Active")
        }        
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
  methods:{
    getImagesFromInstagram(token){
      axios
      .get('https://graph.instagram.com/me/media?fields=caption,media_url,timestamp,media_type,children{media_url,media_type}&access_token=' + token + '&limit=200')
      .then((response) =>{
        this.data = response.data.data.filter((item) => item.media_type !=="VIDEO");
        console.log(this.data)
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
    refreshAccessToken(token){
      axios
      .get('https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=' + token)
      .then((response) =>{
        this.updateToken(response.data)
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
    updateToken(data){
      const item = {
        id: 1,
        access_token : data.access_token,
        expiresIn: data.expires_in
      }
      axios({
        method: 'patch',
        url: process.env.VUE_APP_BACKEND_URL + 'Tv/RefreshToken',
        data: JSON.stringify(item),
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        this.getImagesFromInstagram(response.data.access_token)
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
}
</script>

<style scoped>
.center{
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%); /* for IE 9 */
  -webkit-transform: translate(-50%, -50%); /* for Safari */
}
.carousel-caption{
  padding: 0;
  margin: 0;
  right: 0%;
  left: 0%;
  bottom: 0%;
  background-color: #cbcdd087;
}

.carousel-caption2{
  padding: 15px;
  margin: 15px;
  right: 0%;
  left: 0%;
  bottom: 0%;
  background-color: #cbcdd087;
}
.album{
  float: left;
  width: 50%;
  margin-bottom: 15px;
  background-color: #12285D;
}


</style>