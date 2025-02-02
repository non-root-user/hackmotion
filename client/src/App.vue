<template>
  <div class="app">
    <Header />
    <Intro />
    <Video />
    <Footer />
  </div>
</template>
<script lang="ts">
  import Header from './components/Header.vue';
  import Intro from './components/Intro.vue';
  import Video from './components/Video.vue';
  import Footer from './components/Footer.vue';

  import { Analytics, EventTypes } from './services/analytics';

  export default {
    components: {
      Header,
      Intro,
      Video,
      Footer,
    },

    mounted() {
      Analytics.sendData(Analytics.gatherData(), EventTypes.PAGE_VIEW);
    },
  }
</script>
<style lang="scss">
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #e6e6e6;
    font-family: "IBM Plex Sans", sans-serif;
  }

  * {
    transition: all .1s ease;
  }
</style>

