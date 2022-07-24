<template>
  <div>
    <v-col cols="12" md="4">
      <v-skeleton-loader
        class="image-titulo"
        v-bind="attrs"
        type="card-avatar, article, actions"
        ><img class="imagem-iten" :src="iten.image" alt="aleatoria" />
        <h1>{{ iten.titulo }}</h1>
      </v-skeleton-loader>

      <v-skeleton-loader class="decricao" v-bind="attrs" type="date-picker">
        <v-row>
          <v-col cols="12" md="3"
            ><p class="texto">{{ iten.texto }}</p></v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <p id="epsodeo">
              {{ epsidiosCorrigir(iten.episode) }}
            </p></v-col
          >
        </v-row>
      </v-skeleton-loader>
    </v-col>
  </div>
</template>
<script>
//import api from '@/services/api';
export default {
  name: "cardItens",
  data(){
    return{
      texto:"",
    }
  },
  props: {
    iten: {
     type: Object,
      required: true,
    },
    character: {
      type: Boolean,
      default: true,
    },
    home: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    epsidiosCorrigir(arr_episodios) {
      if (this.character) {
        this.texto = "Personagens: " + arr_episodios.join(", ");
      }
      else if(this.home){
        this.texto = arr_episodios
      } else {
        this.texto = "Epsodeos: " + arr_episodios.join(", ")
      }
      return this.texto;
    },
  },
};
</script>

<style scoped>
#pagina.opacidade {
  background-color: black;
  opacity: 0.3;
}
h1 {
  margin: 0%;
  width: 250px;
  height: auto;
  text-align: center;
}
.texto {
  white-space: nowrap;
  margin: 0%;
  width: 250px;
  overflow: hidden;
}
#epsodeo{
  white-space: inherit;
  width: 250px;
  max-height: 100px;
  overflow: hidden;
}
#epsodeo:hover{
  overflow: auto;
}
.texto:hover {
  overflow: auto;
  text-overflow: none;
}
.centralizado {
  text-align: center;
}
.itens-fotos {
  list-style: none;
}
.itens-fotos .itens-fotos-item {
  display: inline-block;
}
.imagem-iten {
  margin: 10px;
  max-width: 250px;
  max-height: 240px;
}
</style>