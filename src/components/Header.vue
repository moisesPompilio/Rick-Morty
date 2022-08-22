<template>
  <div>
    <header>
      <nav class="container">
        <a @click="redirectToHome()"><img src="http://assets.stickpng.com/images/58f37720a4fa116215a9240f.png"
            alt="Logo" id="logo" /></a>

        <img @click="menuactive()"
          src="https://raw.githubusercontent.com/william-costa/wdev-mock-site-resources/master/assets/images/menu.svg"
          alt="Abrir menu" id="menu-button" />

        <div id="menu-overlay" v-if="menuActive" @click="menuactive()"></div>

        <div id="menu-items" :class="{ active: menuActive }">
          <img src="http://assets.stickpng.com/images/58f37720a4fa116215a9240f.png" alt="WDEV" id="menu-logo" />
          <ul>
            <li><a @click="redirectToPersonagem()">Personagem</a></li>
            <li><a @click="redirectToEpsidio()">Episodio</a></li>
            <li><a @click="redirectToLocal()">Local</a></li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    menuactive() {
      this.menuActive = !this.menuActive;
    },
    redirectToHome() {
      this.$router.push("/").catch(() => { });
      this.menuactive();
    },
    redirectToLocal() {
      this.menuactive();
      this.$router.push("/local").catch(() => { });
    },
    redirectToPersonagem() {
      this.menuactive();
      this.$router.push("/personagem").catch(() => { });
    },
    redirectToEpsidio() {
      this.menuactive();
      this.$router.push("/episodio").catch(() => { });
    },
  },
};
</script>
<style scoped>
header {
  background-color: var(--color-background-nav);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: space-between;
}

#logo {
  margin-left: 0;
  margin-top: 12px;
  width: auto;
  height: 65px;
}

#menu-button {
  width: 30px;
}

nav {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}

#menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 40%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.8;
}

#menu-logo {
  width: 110px;
  margin-top: 30px;
  margin-bottom: 10px;
}

#menu-items {
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--color-background-nav);
  width: 60%;
  height: 100vh;
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#menu-items.active {
  display: flex;
}

ul {
  list-style-type: none;
  text-align: center;
}

ul li {
  margin: 20px 0px;
}

ul li a {
  color: var(--color-text-light);
}

@media (min-width: 500px) {

  #menu-button,
  #menu-logo,
  #menu-overlay {
    display: none;
  }

  #menu-items {
    display: flex;
    position: static;
    height: 60px;
    width: auto;
    z-index: 1;
  }

  ul {
    display: flex;
    flex-direction: row;
    height: 60px;
    align-items: center;
  }

  ul li {
    margin: 0%;
    margin-left: 20px;
  }
}
</style>
