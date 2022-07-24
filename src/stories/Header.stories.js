import MyHeader from '../components/Header.vue';


export default {
  title: 'Componets/Header',
  component: MyHeader,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: Object.keys(argTypes),
  components: { MyHeader },
  template:
    '<my-header/>',
});

export const MenuMobile = Template.bind({});
MenuMobile.args = {
  menuActive: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
