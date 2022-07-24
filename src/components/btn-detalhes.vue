<template>
  <div>
    <div
      id="descricao-overlay"
      @click="descricaoactive()"
    ></div>

    <div id="descricao-items" class="active" >
      <v-row class="texto" v-for="item of banana" v-bind:key="item">
        <v-col  
          ><p>{{ item }}</p>
        </v-col>
       </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "btn-detalhes",
  props: ["banana", "exibir"],
  data() {
    return {
      informacao: this.banana,
    };
  },
  methods: {
    descricaoactive() {
      this.$emit("decricaoActive", false);
      
    },
  },
};
</script>
<style scoped>
p{
  width: 100%;
  
  margin-top: 0;
  margin-left: 35%;
  font-size: 25px;
  color: aliceblue;
  border: 1px;
  height: 20px;
}

#descricao-button {
  width: 80px;
}
#descricao-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: 0;
}

#descricao-logo {
  width: 110px;
  margin-top: 30px;
  margin-bottom: 10px;
  z-index: 1;
}
#descricao-items {
  position: fixed;
  top: 60vh;
  left: 25vh;
  right: 25vh;
  background-color: var(--color-background-nav);
  border-radius: 20px 20px 0 0;
  width: 150vh;
  height: 40%;
  display: none;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1;
}
#descricao-items.active {
  display: inline-block;
  z-index: 1;
}
</style>