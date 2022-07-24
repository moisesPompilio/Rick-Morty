<template>
  <main>
    <v-alert
      v-if="alerta"
      prominent
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          Ainda estamos em construção, provavelmente nunca iremos acabar!!
        </v-col>
        <v-col class="shrink">
          <v-btn @click="alerta = false">Fechar</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-row>
      <v-col>
        <h1>
          BEM VINDOS A CIDADELA DOS RICKS OBS: estamos em Construção!! Droga
          Morty cada você
        </h1>
      </v-col>
    </v-row>
    <v-row id="curiosidades">
      <h2 class="texto">Curiosidades</h2>
    </v-row>
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
          <v-btn
            id="limparFiltro"
            color="none"
            @click="alerta = true"
            v-if="exibirFiltro"
          >
            <v-icon>mdi-magnify</v-icon></v-btn
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
            >Numero da curiosidade</label
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
    <ul>
      <li
        class="itens"
        v-for="detalhes of array_informacoes"
        v-bind:key="detalhes.id"
      >
        <v-card>
          <CardItens
            :home="true"
            :iten="
              passaInformacoesPricipal(
                detalhes.image,
                detalhes.nome,
                detalhes.numberCuriosidade,
                detalhes.detalhes
              )
            "
          ></CardItens>
        </v-card>
      </li>
    </ul>
  </main>
</template>

<script>
import CardItens from "../components/cardItens.vue";
import Btndetalhes from "../components/btn-detalhes.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    "Btn-detalhes": Btndetalhes,
    CardItens,
  },
  data() {
    return {
      alerta:false,
      sheet: false,
      exibirFiltro: false,
      array_informacoes: [
        {
          image:
            "https://super.abril.com.br/wp-content/uploads/2018/07/roiland-e-harmon.png",
          nome: "Criadores se conhecem",
          numberCuriosidade: "1",
          detalhes:
            "Os responsáveis por Rick e Morty, Dan Harmon e Justin Roiland, se tornaram próximos a partir de um festival de curta-metragem organizado pelo próprio Harmon. Roiland submeteu alguns projetos “para chocar as pessoas”, mas o seu futuro parceiro apenas achou tudo muito engraçado. Eventualmente, Harmon foi contratado pelo Adult Swin para criar uma série e pensou em Roiland por lembrar que ele era apaixonado por histórias.",
        },
        {
          image:
            "https://img.ibxk.com.br/2020/04/01/01185356185439.jpg?ims=704x",
          nome: "Inspiração da série",
          numberCuriosidade: "2",
          detalhes:
            "A relação de Rick e Morty é bem familiar para quem conhece a franquia De volta para o Futuro, mas tem uma grande contribuição do próprio Roiland com a história The Real Animated Adventures of Doc and Mharti. Ele a escreveu quando se sentia perdido e enviou para grandes estúdios como forma de brincar com eles, pois a história era confusa e extremamente pesada. Foram passados uns filtros e acabou casando perfeitamente com a proposta de Rick e Morty. A música tema da animação foi inspirada, principalmente, por Doctor Who e Farscape para chegar ao conjunto de notas que remete à ficção científica.",
        },
        {
          image:
            "https://bienaldolivro.com.br/wp-content/uploads/2021/07/The-old-man-and-the-seat.png",
          nome: "Teorias sobre Rick",
          numberCuriosidade: "3",
          detalhes:
            "Harmon afirmou em um vídeo que um dos principais pontos da animação é o embate entre criador e criatura, mostrado principalmente através de Rick e sua apatia pelas coisas que desenvolve. Além disso, o criador também comentou que vê a imagem de Rick como um limiar entre a figura do homem e de deus, mas discorda do pensamento niilista do cientista de que nada importa.",
        },
        {
          image: "https://i.ytimg.com/vi/NR8EjXXoPsM/maxresdefault.jpg",
          nome: "Erros que deram certo",
          numberCuriosidade: "4",
          detalhes:
            "O hábito que Rick tem de arrotar, tão característico, surgiu de um erro cometido por Roiland enquanto ele gravava as vozes de sua própria animação. Quando Harmon surgiu com a ideia da série que eles poderiam criar juntos, o arroto veio como um complemento perfeito para a construção do personagem. Além disso, o bordão de Rick, “wubba lubba dub dub”, também foi um erro. Originalmente, deveria ser “wub wub wub wub wub” em referência a uma piada do grupo Three Stooges, mas Roiland se atrapalhou enquanto estava lendo a fala e surgiu o bordão perfeito para Rick, mesmo que não fosse a intenção.",
        },
        {
          image:
            "https://www.absolut.com/globalassets/images/products/absolut-citron/absolut-citron_1x1.jpg",
          nome: "O que tem na garrafa de Rick?",
          numberCuriosidade: "5",
          detalhes:
            "Apesar de muitos fãs desenvolverem teorias complexas, Harmon afirmou durante uma entrevista que, particularmente, acredita que é vodca. Quando questionado o motivo que o levou a começar a beber, o criador da animação disse com convicção que não poderia revelar porque é mais interessante assim.",
        },
        {
          image:
            "https://filmschoolrejects.com/wp-content/uploads/2017/04/0O7GzC__J_WB_SWiy.jpg",
          nome: "O piloto da série",
          numberCuriosidade: "6",
          detalhes:
            "O primeiro episódio de Rick e Morty foi escrito em seis horas por Harmon e Roiland, pouco tempo após a ideia deles ser comprada pelo Adult Swin. Harmon estava trabalhando também em Community quando a série ainda estava indo ao ar, então, a dupla precisava adiantar a produção da animação o máximo possível.",
        },
      ],
    };
  },
  methods: {
    passaInformacoesPricipal(image, nome, texto, epsodio) {
      this.informacaoPricipl = {
        image: image,
        titulo: nome,
        texto: "Curiosidade: " + texto,
        episode: epsodio,
      };
      return this.informacaoPricipl;
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
  border: black;
}
main {
  background-image: url("@/assets/Rick-and-Morty-Citadel.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: block;
  width: 100vw;
  padding: 0;
  text-align: center;
  color: white;
  background-color: black;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
  background-attachment: fixed;
}
h2 {
  color: white;
  margin-left: 30px;
  font-size: 30px;
}
#curiosidades {
  width: 100%;
}
</style>