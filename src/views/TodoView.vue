<template>
  <v-container>
    <div class="d-flex align-center my-3">
      <v-icon icon="mdi-white-balance-sunny"></v-icon>
      <p class="text-h6 px-3">Meu Dia</p>
    </div>

    <TaskForm />

    <v-list class="bg-transparent">
      <v-list-item-group v-if="allTasks.length > 0">
        <v-list-item
          class="d-flex flex-md-column py-0 my-3 align-center elevation-1 bg-white justify-space-between w-100 col-8"
          v-for="(task, index) in allTasks"
          :key="index"
        >
          <v-col cols="12" md="5" class="d-flex justify-md-start justify-center">
            <v-list-item-content class="d-flex align-center">
              <v-list-item-title>
                <p style="word-wrap: break-word" class="text-h6 text-lg-left text-center">
                  {{ task.name }}
                </p>
              </v-list-item-title>
            </v-list-item-content>
          </v-col>

          <v-col
            cols="12"
            md="7"
            class="d-flex flex-md-row align-center justify-sm-center justify-lg-end flex-column"
          >
            <div class="d-flex align-center">
              <v-icon v-if="task.completed">mdi-check</v-icon>
              <v-chip v-if="task.dueDate" class="ma-2"
                >Data de Conclusão | {{ task.dueDate }}</v-chip
              >
            </div>

            <v-list-item-action>
              <v-btn class="mx-2" @click="editTask(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="mx-2" @click="completeTask(index, task)">
                <v-icon>{{
                  task.completed
                    ? "mdi-check-circle"
                    : "mdi-check-circle-outline"
                }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-col>
        </v-list-item>
      </v-list-item-group>
      <v-list-item class="bg-white elevation-1" v-else>
        <v-list-item-content>Nenhuma tarefa adicionada!</v-list-item-content>
      </v-list-item>
    </v-list>

    <EditTaskModal />
  </v-container>
</template>

<script>
import TaskForm from "@/components/TaskForm.vue";
import EditTaskModal from "@/components/EditTaskModal.vue";

export default {
  computed: {
    allTasks() {
      return this.$store.getters.allTasks;
    },
    currentTask() {
      return this.$store.getters.currentTask;
    },
    editModalStatus() {
      return this.$store.getters.editModalStatus;
    },
  },
  components: {
    TaskForm,
    EditTaskModal,
  },
  data() {
    return {
      newTask: "",
    };
  },
  methods: {
    completeTask(index, task) {
      this.$store.dispatch("completeTask", { index, task });
    },

    editTask(index) {
      this.$store.dispatch("setCurrentTask", { ...this.allTasks[index] });
      this.$store.dispatch("openEditModal", true);
    },
  },
  mounted() {
    this.$store.dispatch("fetchTasks");
  },
};
</script>
