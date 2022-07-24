<template>
  <main>
    <v-card class="bloco1">
      <v-row class="mx-3">
        <v-col cols="12" sm="6" md="11">
          <v-card-title
            ><button @click="exibirFiltro = !exibirFiltro">
              Filtro <v-icon>mdi-menu-up</v-icon>
            </button></v-card-title
          >
        </v-col>
        <v-col cols="12" sm="6" md="1">
          <v-btn id="limparFiltro" color="none" @click="limparFiltro()">
            <v-icon>mdi-trash-can</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="exibirFiltro" class="mx-3">
        <v-col cols="12" sm="6" md="6">
          <label class="texto labels pb-3" for="FiltroName">Name</label>
          <v-text-field
            class="texto"
            v-model="FiltroName"
            id="FiltroName"
            dense
            plyaaceholder="Exp: Pilot"
            @input="filtrarArray()"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <label class="texto labels pb-3" for="filtroDimensão">
            Dimensão</label
          >
          <v-text-field
            class="texto"
            v-model="filtroDimensão"
            id="filtroDimensão"
            dense
            plyaaceholder="Exp: 1"
            @input="filtrarArray()"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="exibirFiltro" class="mx-3">
        <v-col cols="12" sm="6" md="6">
          <label class="texto labels pb-3" for="filtroTipo"> Tipo</label>
          <v-text-field
            class="texto"
            v-model="filtroTipo"
            id="filtroTipo"
            dense
            plyaaceholder="Exp: 1"
            @input="filtrarArray()"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-sheet elevation="6" v-if="pages">
        <v-tabs
          background-color="var(--color-background-nav)"
          dark
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab
            v-for="i in 7"
            :key="i"
            :href="'#tab-' + i"
            @click="paginaEscolhida(i)"
          >
            Page {{ i }}
          </v-tab>
        </v-tabs>
      </v-sheet>
    </v-card>
    <ul>
      <li class="itens" v-for="local of array_location" :key="local.id">
        <v-card class="bloco">
          <CardItens
            :character="true"
            :iten="
              passaInformacoesPricipal(local.name, local.type, local.residents)
            "
          ></CardItens>
          <v-btn
            color="primary"
            class="center"
            @click="(exibirDetalhes = true), passaInformacao(local.dimension)"
            >Detalhes</v-btn
          >
        </v-card>
      </li>
    </ul>
    <Btndetalhes
      :banana="informacoes"
      v-if="exibirDetalhes"
      @decricaoActive="exibirDetalhes = $event"
      id="detalhes"
    ></Btndetalhes>
  </main>
</template>
<script>
import api from "../services/api";
import CardItens from "../components/cardItens.vue";
import Btndetalhes from "../components/btn-detalhes.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "local",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CardItens,
    // eslint-disable-next-line vue/no-unused-components
    Btndetalhes,
  },
  data() {
    return {
      exibirFiltro: false,
      FiltroName: "",
      filtroTipo: "",
      filtroDimensão: "",
      array_location: [],
      progress: false,
      pages: true,
      informacoes: "",
      exibirDetalhes: false,
    };
  },
  mounted() {
    this.array_location = [];
    api.get("/location?page=").then((response) => {
      this.array_location = response.data.results;
      this.array_location.forEach((value, index) => {
        this.array_location[index].residents = this.indetificarPersonagens(
          value.residents
        );
      });
    });
  },
  methods: {
    filtrarArray() {
      this.progress = true;
      this.array_location = [];
      let maisDeUmFiltro = false;
      this.pages = false;
      let url = "";
      if (this.filtroTipo) {
        if (maisDeUmFiltro) {
          url += "&type=" + this.filtroTipo;
        } else {
          url += "/location/?type=" + this.filtroTipo;
          maisDeUmFiltro = true;
        }
      }
      if (this.filtroDimensão) {
        if (maisDeUmFiltro) {
          url += "&dimension=" + this.filtroDimensão;
        } else {
          url += "/location/?dimension=" + this.filtroDimensão;
          maisDeUmFiltro = true;
        }
      }
      if (this.FiltroName) {
        if (maisDeUmFiltro) {
          url += "&name=" + this.FiltroName;
        } else {
          url += "/location/?name=" + this.FiltroName;
          maisDeUmFiltro = true;
        }
      }
      if (url) {
        api.get(url).then((response) => {
          this.array_location = response.data.results;
          this.array_location.forEach((value, index) => {
            this.array_location[index].residents = this.indetificarPersonagens(
              value.residents
            );
          });
        });
      } else {
        this.pages = true;
        api.get("/location?page=").then((response) => {
          this.array_location = response.data.results;
          this.array_location.forEach((value, index) => {
            this.array_location[index].residents = this.indetificarPersonagens(
              value.residents
            );
          });
        });
      }
      this.progress = false;
    },
    limparFiltro() {
      this.filtroTipo = "";
      this.FiltroName = "";
      this.filtroDimensão = "";
      this.filtrarArray();
    },
    passaInformacoesPricipal(nome, texto, epsodio) {
      this.informacaoPricipl = {
        image:
          "https://static.wikia.nocookie.net/rickandmorty/images/c/c9/Neverpastbedtimeland.png/revision/latest?cb=20160113063035",
        titulo: nome,
        texto: "Tipo: " + texto,
        episode: epsodio,
      };
      return this.informacaoPricipl;
    },
    indetificarPersonagens(arr_character) {
      let character = "";
      let texto = [];
      arr_character.forEach((value, i) => {
        api.get(value).then((response) => {
          character = response.data.name;
          if (i == arr_character.length - 1) {
            texto.push(character);
          } else {
            texto.push(character);
          }
        });
      });
      console.log("texto: " + texto);
      return texto;
    },
    paginaEscolhida(i) {
      this.progress = true;
      this.array_location = [];
      api.get("/location?page=" + i).then((response) => {
        this.array_location = response.data.results;
        this.array_location.forEach((value, index) => {
          this.array_location[index].residents = this.indetificarPersonagens(
            value.residents
          );
        });
      });
      this.progress = false;
    },
    passaInformacao(dimension) {
      this.informacoes = [];
      let texto1 = "Dimensao: " + dimension;
      this.informacoes.push(" ");
      this.informacoes.push(" ");
      this.informacoes.push(texto1);
    },
  },
};
</script>

<style scoped>
</style>