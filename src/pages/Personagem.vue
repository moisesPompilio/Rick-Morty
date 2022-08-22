<template>
  <main>
    <v-card class="bloco1">
      <v-row class="mx-3">
        <v-col cols="12" sm="6" md="11">
          <v-card-title @click="exibirFiltro = !exibirFiltro"><button>
              Filtro <v-icon>mdi-menu-up</v-icon>
            </button></v-card-title>
        </v-col>
        <v-col cols="12" sm="6" md="1">
          <v-btn id="limparFiltro" color="none" @click="limparFiltro()">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="exibirFiltro" class="mx-3">
        <v-col cols="12" sm="6" md="6">
          <label class="texto labels pb-3" for="FiltroName">Name</label>
          <v-text-field class="texto" v-model="filtroName" id="FiltroName" dense plyaaceholder="Exp: Pilot"
            @input="filtrarArray()" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <label class="texto labels pb-3" for="filtroSpecies"> Specie</label>
          <v-text-field class="texto" v-model="filtroSpecies" id="filtroSpecies" dense plyaaceholder="Exp: 1"
            @input="filtrarArray()" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row v-if="exibirFiltro" class="mx-3">
        <v-col cols="12" sm="6" md="4">
          <label class="texto labels pb-3" for="filtroType"> Tipo</label>
          <v-text-field class="texto" v-model="filtroType" id="filtroType" dense plyaaceholder="Exp: 1"
            @input="filtrarArray()" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select plyaaceholder="Exp: male" :items="gender" label="Genero" v-model="filtroGender"
            @input="filtrarArray()"></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-select plyaaceholder="Exp: human" :items="status" label="Status" v-model="filtroStatus"
            @input="filtrarArray()"></v-select>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-sheet elevation="6" v-if="pages">
        <v-tabs background-color="var(--color-background-nav)" dark next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="i in 42" :key="i" :href="'#tab-' + i" @click="paginaEscolhida(i)">
            Page {{ i }}
          </v-tab>
        </v-tabs>
      </v-sheet>
    </v-card>
    <ul>
      <li class="itens" v-for="personagem of arr_personagem" :key="personagem.id">
        <v-card class="bloco">
          <Card-Itens :character="false" :home="false" :iten="
            passaInformacoesPricipal(
              personagem.image,
              personagem.name,
              personagem.origin.name,
              epsidiosCorrigir(personagem.episode)
            )
          "></Card-Itens>
          <v-btn color="primary" class="center" @click="
            (exibirDetalhes = true),
            passaInformacao(
              personagem.location.name,
              personagem.status,
              personagem.type,
              personagem.gender,
              personagem.species
            )
          ">Detalhes</v-btn>
        </v-card>
      </li>
    </ul>
    <Btn-detalhes :banana="informacoes" v-if="exibirDetalhes" @decricaoActive="exibirDetalhes = $event" id="detalhes">
    </Btn-detalhes>
  </main>
</template>

<script>
import api from "@/services/api";
import Btndetalhes from "../components/btn-detalhes.vue";
import CardItens from "../components/cardItens.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Personagem",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    "Btn-detalhes": Btndetalhes,
    // eslint-disable-next-line vue/no-unused-components
    "Card-Itens": CardItens,
  },
  data() {
    return {
      filtroName: "",
      filtroStatus: null,
      filtroSpecies: "",
      filtroType: "",
      filtroGender: null,
      status: ["alive", "dead", "unknown"],
      gender: ["female", "male", "genderless", "unknown"],
      arr_personagem: [],
      sheet: false,
      filtro: "",
      decricaoActive: false,
      informacoes: [],
      ativado: false,
      informacaoPricipal: {},
      exibirDetalhes: false,
      pages: true,
      exibirFiltro: true,
      progress: true,
    };
  },
  methods: {
    paginaEscolhida(i) {
      this.progress = true;
      this.arr_personagem = [];
      api.get("/character?page=" + i).then((response) => {
        this.arr_personagem = response.data.results;
      });
      this.progress = false;
    },
    filtrarArray() {
      this.progress = true;
      this.arr_personagem = [];
      let maisDeUmFiltro = false;
      this.pages = false;
      let url = "";
      if (this.filtroName) {
        if (maisDeUmFiltro) {
          url += "&name=" + this.filtroName;
        } else {
          url += "/character/?name=" + this.filtroName;
          maisDeUmFiltro = true;
        }
      }
      if (this.filtroSpecies) {
        if (maisDeUmFiltro) {
          url += "&species=" + this.filtroSpecies;
        } else {
          url += "/character/?species=" + this.filtroSpecies;
          maisDeUmFiltro = true;
        }
      }
      if (this.filtroStatus) {
        if (maisDeUmFiltro) {
          url += "&status=" + this.filtroStatus;
        } else {
          url += "/character/?status=" + this.filtroStatus;
          maisDeUmFiltro = true;
        }
      }
      if (this.filtroGender) {
        if (maisDeUmFiltro) {
          url += "&gender=" + this.filtroGender;
        } else {
          url += "/character/?gender=" + this.filtroGender;
          maisDeUmFiltro = true;
        }
      }
      if (this.filtroType) {
        if (maisDeUmFiltro) {
          url += "&type=" + this.filtroType;
        } else {
          url += "/character/?type=" + this.filtroType;
          maisDeUmFiltro = true;
        }
      }
      console.log("URL: " + url);
      if (url) {
        api.get(url).then((response) => {
          this.arr_personagem = response.data.results;
          this.progress = false;
        });
      } else {
        api.get("/character?page=").then((response) => {
          this.arr_personagem = response.data.results;
          this.pages = true;
          this.progress = false;
        });
      }
    },
    limparFiltro() {
      this.filtroName = "";
      this.filtroStatus = null;
      this.filtroSpecies = "";
      this.filtroType = "";
      this.filtroGender = null;
      this.filtrarArray();
      this.pages = true;
    },
    epsidiosCorrigir(arr_episodios) {
      arr_episodios.forEach((value, index) => {
        let epsodio = value.split("/").reverse();
        arr_episodios[index] = epsodio[0];
      });
      return arr_episodios;
    },
    descricaoactive() {
      this.decricaoActive = !this.decricaoActive;
    },
    passaInformacao(a, b, c, d, e) {
      this.informacoes = [];
      a = "Local onde vive: " + a;
      b = "Status: " + b;
      c = "tipo: " + c;
      d = "Genero: " + d;
      e = "Especie: " + e;
      this.informacoes.push(a);
      this.informacoes.push(b);
      this.informacoes.push(d);
      this.informacoes.push(e);
      this.informacoes.push(c);
      return this.informacoes;
    },
    passaInformacoesPricipal(image, nome, texto, epsodio) {
      this.informacaoPricipal = {
        image: image,
        titulo: nome,
        texto: texto,
        episode: epsodio,
      };
      return this.informacaoPricipal;
    },
  },
  computed: {},
  mounted() {
    this.progress = true;
    this.arr_personagem = [];
    api.get("/character?page=").then((response) => {
      this.arr_personagem = response.data.results;
    });
    this.progress = false;
  },
};
</script>

<style scoped>
</style>