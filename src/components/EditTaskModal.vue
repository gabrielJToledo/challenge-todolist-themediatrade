<template>
  <v-dialog v-model="editModalStatus" max-width="400">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center w-100">
        <p class="text-h6">Editar Tarefa</p>
        <v-btn icon @click="closeEditModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="currentTask.name"
          label="Nome da Tarefa"
        ></v-text-field>
        <v-date-picker v-model="newTaskDueDate"></v-date-picker>
      </v-card-text>
      <v-card-actions class="mx-2 my-2">
        <v-btn class="bg-primary text-white" @click="updateTask" color="white">Adicionar</v-btn>
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
    };
  },
  computed: {
    editModalStatus() {
      return this.$store.getters.editModalStatus;
    },
    currentTask() {
      return this.$store.getters.currentTask;
    },
    allTasks() {
      return this.$store.getters.allTasks;
    },
  },
  methods: {
    openEditModal() {
      this.$store.dispatch("openEditModal", true);
    },
    closeEditModal() {
      this.$store.dispatch("closeEditModal");
    },
    updateTask() {
      const currentTaskMock = { ...this.currentTask };

      currentTaskMock.dueDate = this.newTaskDueDate
        ? moment(this.newTaskDueDate).format("DD-MM-YYYY")
        : null;

      this.$store.dispatch("updateTask", {
        index: this.allTasks.findIndex(
          (task) => task.id === this.currentTask.id
        ),

        updatedTask: currentTaskMock,
      });

      this.$store.dispatch("closeEditModal");
    },
  },
};
</script>