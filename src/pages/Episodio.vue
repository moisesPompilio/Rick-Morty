<template>
  <main>
    <v-card class="bloco1">
      <v-row class="mx-3">
        <v-col cols="12" sm="6" md="11">
          <v-card-title
            ><button @click="exibirFiltro = !exibirFiltro">
              Filtro <v-icon>mdi-menu-up</v-icon>
            </button>
          </v-card-title>
        </v-col>
        <v-col cols="12" sm="6" md="1">
          <v-btn id="limparFiltro" color="none" @click="limparFiltro()">
            <v-icon>mdi-trash-can</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="exibirFiltro" id="filtroText" class="mx-3">
        <v-col cols="12" sm="6" md="6">
          <label class="labels pb-3" for="nameEpsodio">Name</label>
          <v-text-field
            v-model="nameEpsodio"
            id="nameEpsodio"
            dense
            plyaaceholder="Exp: Pilot"
            @input="filtrarArray()"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <label class="labels pb-3" for="numeroEpsodio"
            >Numero do Episodio</label
          >
          <v-text-field
            v-model="numeroEpsodio"
            id="numeroEpsodio"
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
            v-for="i in 3"
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
      <li
        class="itens"
        v-for="episodio of array_epsodio"
        v-bind:key="episodio.id"
      >
        <v-card>
          <CardItens
            :character="true"
            :iten="
              passaInformacoesPricipal(
                episodio.name,
                episodio.episode,
                episodio.characters
              )
            "
          ></CardItens>
          <v-btn color="primary" class="center" @click="exibirDetalhes = true, passaInformacao(episodio.id,episodio.air_date)"  >Detalhes</v-btn>
        </v-card>
      </li>
    </ul>
    <Btn-detalhes
      :banana="informacoes"
      v-if="exibirDetalhes"
      @decricaoActive="exibirDetalhes = $event"
      id="detalhes"
    ></Btn-detalhes>
  </main>
</template>

<script>
import api from "@/services/api";
import CardItens from "../components/cardItens.vue";
import Btndetalhes from "../components/btn-detalhes.vue"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "episodio",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CardItens,
    "Btn-detalhes": Btndetalhes
  },
  data() {
    return {
      nameEpsodio: "",
      numeroEpsodio: "",
      exibirFiltro: false,
      array_epsodio: [],
      pages: true,
      exibirDetalhes: false,
      informacoes:[],
    };
  },
  mounted() {
    this.array_epsodio = [];
    api.get("/episode?page=").then((response) => {
      this.array_epsodio = response.data.results;
      this.array_epsodio.forEach((value, index) => {
        this.array_epsodio[index].characters = this.indetificarPersonagens(
          value.characters
        );
      });
    });
  },
  methods: {
    filtrarArray() {
      this.progress = true;
      this.array_epsodio = [];
      let maisDeUmFiltro = false;
      this.pages = false;
      let url = "";
      if (this.numeroEpsodio) {
        if (maisDeUmFiltro) {
          url += "&episode=" + this.numeroEpsodio;
        } else {
          url += "/episode/?episode=" + this.numeroEpsodio;
          maisDeUmFiltro = true;
        }
      }
      if (this.nameEpsodio) {
        if (maisDeUmFiltro) {
          url += "&name=" + this.nameEpsodio;
        } else {
          url += "/episode/?name=" + this.nameEpsodio;
          maisDeUmFiltro = true;
        }
      }
      if (url) {
        api.get(url).then((response) => {
          this.array_epsodio = response.data.results;
          this.array_epsodio.forEach((value, index) => {
            this.array_epsodio[index].characters = this.indetificarPersonagens(
              value.characters
            );
          });
        });
      } else {
        this.pages = true;
        api.get("/episode?page=").then((response) => {
          this.array_epsodio = response.data.results;
          this.array_epsodio.forEach((value, index) => {
            this.array_epsodio[index].characters = this.indetificarPersonagens(
              value.characters
            );
          });
        });
      }
      this.progress = false;
    },
    limparFiltro() {
      this.numeroEpsodio = "";
      this.nameEpsodio = "";
      this.filtrarArray();
    },
    passaInformacoesPricipal(nome, texto, epsodio) {
      this.informacaoPricipl = {
        image:
          "https://c4.wallpaperflare.com/wallpaper/588/5/300/rick-and-morty-toilets-hd-wallpaper-preview.jpg",
        titulo: nome,
        texto: texto,
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
      this.array_epsodio = [];
      api.get("/episode?page=" + i).then((response) => {
        this.array_epsodio = response.data.results;
        this.array_epsodio.forEach((value, index) => {
          this.array_epsodio[index].characters = this.indetificarPersonagens(
            value.characters
          );
        });
      });
      this.progress = false;
    },
    passaInformacao( numeroEpsodioDeEpsodio,criacao){
      this.informacoes = [];
      let texto1 = "Numero do epsodio: " + numeroEpsodioDeEpsodio;
      let texto2 ="Data que foi ao ar: " + criacao;
      this.informacoes.push(" ");
      this.informacoes.push(texto1);
      this.informacoes.push(texto2)
    }
  },
};
</script>

<style scoped>
.filtro {
  margin: 20px;
  width: auto;
  height: auto;
}
.itens {
  flex: 0 0 25%;
  display: flex;
  justify-content: center;
  margin: 20px;
  display: inline-flex;
}
#filtroText{
  margin: 5px;

}
</style>