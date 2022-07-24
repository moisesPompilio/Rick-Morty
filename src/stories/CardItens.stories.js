import CardItens from '../components/cardItens.vue'


export default {
    title: 'Example/CardItens',
    component: CardItens,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        iten: {
            type: Array[Object],
            default: {
              image:
                "http://www.w3.org/2000/svg",
              titulo: "Criadores se conhecem",
              texto: "1",
              episode:
                "Os responsáveis por Rick e Morty, Dan Harmon e Justin Roiland, se tornaram próximos a partir de um festival de curta-metragem organizado pelo próprio Harmon. Roiland submeteu alguns projetos “para chocar as pessoas”, mas o seu futuro parceiro apenas achou tudo muito engraçado. Eventualmente, Harmon foi contratado pelo Adult Swin para criar uma série e pensou em Roiland por lembrar que ele era apaixonado por histórias.",
            },
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
  };
  
  // More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
  const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { CardItens },
    template: '<CardItens v-bind="$props"   ></CardItens>',
  });
  export const Home = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Home.args = {
  iten: [
    {
      image:
        "http://www.w3.org/2000/svg",
      titulo: "Criadores se conhecem",
      texto: "1",
      episode:
        "Os responsáveis por Rick e Morty, Dan Harmon e Justin Roiland, se tornaram próximos a partir de um festival de curta-metragem organizado pelo próprio Harmon. Roiland submeteu alguns projetos “para chocar as pessoas”, mas o seu futuro parceiro apenas achou tudo muito engraçado. Eventualmente, Harmon foi contratado pelo Adult Swin para criar uma série e pensou em Roiland por lembrar que ele era apaixonado por histórias.",
    }],
    home:true,
    character:false
};