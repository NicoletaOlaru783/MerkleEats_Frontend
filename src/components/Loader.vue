<template>
<div class="message">
  <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
  </div>
  <div>
    <h3 style="margin-top: 40px">{{message}}</h3>
  </div>
</div>  
</template>

<script>
const messages = [
        "Locating the required gigapixels to render...",
        "Spinning up the hamster...",
        "Shovelling coal into the server...",
        "Please wait while the little elves draw your map",
        "...at least you're not on hold...",
        "We're testing your patience",
        "As if you had any other choice...",
        "While the satellite moves into position",
        "Just count to 10",
        "It's not you. It's me...",
        "Don't panic...",
        "We're making you a cookie.",
        "Don't break your screen yet!",
        "I swear it's almost done.",
        "Let's take a mindfulness minute...",
        "Unicorns are at the end of this road, I promise.",
        "Get some coffee and come back in ten minutes...",
        "We are not liable for any broken screens as a result of waiting.",
        "Well, this is embarrassing...",
        "Dividing by zero...",
        "Web developers do it with <style>",
        "Hold on while we wrap up our git together...sorry",
        "Please hold on as we reheat our coffee",
        "Kindly hold on as we convert this bug to a feature...",
        "Installing dependencies...",
        "Switching to the latest JS framework...",
        "@todo Insert witty loading message",
        "Let's hope it's worth the wait...",
        "Aw, snap! Not...",
        "Updating dependencies...",
        "Feel free to spin in your chair",
        "Go ahead, hold your breath and do an ironman plank till loading complete",
        "What is the difference btwn a hippo and a zippo? One is really heavy, the other is a little lighter",
        "Downloading more RAM..",
        "Optimizing the optimizer...",
        "Pushing pixels...",
        "Downloading Downloader...",
        "Debugging Debugger...",
        "Reading Terms and Conditions for you...",
        "Digested cookies being baked again.",
        "Still faster than Windows update...",
        "Please wait while the minions do their work",
        "Grabbing extra minions",
        "We're working very Hard ... Really",
        "Waking up the minions",
        "You are number 2843684714 in the queue",
        "Please wait while we serve other customers...",
        "Our premium plan is faster...",
      ];

export default {
  name: 'Loader',
  data: function() {
    return {
      message: ""
    };
  },
  methods: {
    updateMessage: function() {
      this.message = messages[Math.floor(Math.random() * messages.length)];
    }
  },

  mounted: function() {
    this.updateMessage();
    setInterval(this.updateMessage, 5000);
  }
}

</script>

<style scoped>
  .spinner {
    margin-top: 15%;
    margin-right: auto;
    margin-left: auto;
    width: 70px;
    height: 70px;
    position: relative;
    text-align: center;
  
    -webkit-animation: sk-rotate 2.0s infinite linear;
    animation: sk-rotate 2.0s infinite linear;
  }

  .message {
    text-align: center;
  }

.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #02c9d0;
  border-radius: 100%;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
 