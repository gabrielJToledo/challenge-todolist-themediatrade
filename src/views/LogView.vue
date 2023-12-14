<template>
  <v-container>
    <div class="d-flex align-center my-3">
      <v-icon icon="mdi-history"></v-icon>
      <p class="text-h6 px-3">Registros</p>
    </div>

    <v-list class="bg-transparent">
      <v-list-item-group v-if="logs.length > 0">
        <v-list-item
          class="d-flex py-0 my-3 align-center elevation-1 bg-white justify-space-between w-100 col-8"
          v-for="(log, index) in logs"
          :key="index"
        >
          <v-list-item-content class="w-100">
            <v-list-item-title
              class="d-flex align-center justify-space-between flex-md-row flex-column"
            >
              <div class="d-flex flex-column">
                <div class="d-flex justify-center justify-md-start">
                  <v-chip class="ma-2">ID da Tarefa | {{ log.taskId }}</v-chip>
                </div>

                <div>
                  <p class="text-h6 text-center text-md-left mx-3">{{ log.taskName }}</p>
                </div>
              </div>

              <div class="d-flex flex-column">
                <v-chip class="ma-2"
                  >Data do Evento | {{ log.timestamp }}</v-chip
                >

                <v-chip class="ma-2 d-flex justify-center"
                  >Tipo do Evento | {{ log.action }}</v-chip
                >
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-list-item class="bg-white elevation-1" v-else>
        <v-list-item-content>Nenhuma tarefa adicionada!</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>
    
  <script>
export default {
  computed: {
    logs() {
      return this.$store.getters.logs;
    },
  },

  mounted() {
    this.$store.dispatch("fetchLogs");
  },
};
</script>
    