<template>
  <v-form class="my-5" @submit.prevent="addTask">
    <v-row>
      <v-col cols="12" lg="8">
        <v-text-field
          v-model="newTask"
          label="Adicionar uma tarefa"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="4" class="d-flex justify-lg-end justify-md-start py-0 py-lg-3">
        <v-btn class="h-100 py-lg-0 py-4" @click="openFormModal" color="primary"
          >Adicionar <br> Data de conclusão</v-btn
        >
        <v-btn class="h-100 ml-3 py-lg-0 py-4" type="submit" color="primary"><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-dialog v-model="formModalStatus" max-width="400">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center w-100">
        <p class="text-h6">Adicionar Data de Conclusão</p>
        <v-btn icon @click="closeFormModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-date-picker v-model="newTaskDueDate" scrollable></v-date-picker>
      </v-card-text>
      <v-card-actions class="d-flex mx-2">
        <v-btn class="bg-primary text-white" @click="closeFormModal" color="white">Adicionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import moment from "moment";

export default {
  data() {
    return {
      newTaskDueDate: null,
      newTask: ''
    };
  },
  computed: {
    formModalStatus() {
      return this.$store.getters.formModalStatus;
    },
  },

  methods: {
    addTask() {
      if (this.newTask.trim() !== "") {
        this.$store.dispatch("addTask", {
          name: this.newTask,
          createdDate: new Date().toLocaleString(),
          completed: false,
          dueDate: this.newTaskDueDate
            ? moment(this.newTaskDueDate).format("DD-MM-YYYY")
            : null,
        });
        this.newTask = "";
        this.newTaskDueDate = null;
      }
    },
    openFormModal() {
      this.$store.dispatch("openFormModal", true);
    },
    closeFormModal() {
      this.$store.dispatch("closeFormModal");
    },
  },
};
</script>