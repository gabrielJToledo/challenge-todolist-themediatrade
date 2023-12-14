<template>
  <v-navigation-drawer v-model="drawer">
    <v-list class="bg-blue-darken-1">
      <v-list-item prepend-icon="mdi-widgets" title="To Do"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        @click="$router.push({ name: 'home' })"
        prepend-icon="mdi-home"
        title="Início"
      ></v-list-item>
      <v-list-item
        @click="$router.push({ name: 'log' })"
        prepend-icon="mdi-history"
        title="Histórico"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-btn class="toggle-btn-nav d-flex align-center" color="primary" @click.stop="drawer = !drawer">  <v-icon>mdi-menu</v-icon> </v-btn>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
    };
  },
};
</script>


<style scoped>
.toggle-btn-nav {
  position: absolute;
  z-index: 2000;
  top: 10px;
  right: 10px;
}

</style>

