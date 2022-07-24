<template>
  <v-app>
    <Header/>
    <router-view path="$router.key"/>
  </v-app>
</template>

<script>
import './styles/global.css'
import Header from './components/Header.vue';

export default {
  name: 'App',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header
  },

  data: () => ({
    //
  }),
};
</script>
