import axios from 'axios';
import moment from 'moment';

const baseURL = 'http://localhost:3001';

const state = {
  tasks: [],
  currentTask: null,
  log: [],
};

const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks.reverse();
  },
  setLogs(state, log) {
    state.log = log.reverse();
  },
  addTask(state, task) {
    state.tasks.push(task);
  },
  completeTask(state, index) {
    state.tasks[index].completed = !state.tasks[index].completed;

    const updatedTask = state.tasks[index];
    state.log.push({
      timestamp: new Date(),
      action: 'completeTask',
      taskId: updatedTask.id,
      taskName: updatedTask.name,
    });
  },
  updateTask(state, { index, updatedTask }) {
    state.tasks[index] = updatedTask;
  },
  setCurrentTask(state, currentTask) {
    state.currentTask = currentTask;
  },
  addToLog(state, logEntry) {
    state.log.push({ timestamp: new Date(), ...logEntry });
  },
};

const actions = {
  async fetchLogs({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/log`);
      commit('setLogs', response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  },

  async fetchTasks({ commit }) {
    try {
      const response = await axios.get(`${baseURL}/tasks`);
      commit('setTasks', response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },

  async addTask({ commit, dispatch }, task) {
    try {
      const response = await axios.post(`${baseURL}/tasks`, task);
      commit('addTask', response.data);
      await dispatch('addToLogServer', { action: 'Adicionar Tarefa', taskId: response.data.id });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },
  async completeTask({ commit, dispatch }, { index, task }) {
    try {
      const updatedTask = { ...task, completed: !task.completed };

      const actionStatus = updatedTask.completed === true ? 'Tarefa Completa' : 'Tarefa Não Completa'
      const response = await axios.put(`${baseURL}/tasks/${updatedTask.id}`, updatedTask);
      commit('updateTask', { index, updatedTask: response.data });

      dispatch('addToLogServer', { action: actionStatus, taskId: task.id, taskName: task.name });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  async updateTask({ commit, dispatch }, { index, updatedTask }) {
    try {
      const response = await axios.put(`${baseURL}/tasks/${updatedTask.id}`, updatedTask);
      commit('updateTask', { index, updatedTask: response.data });
      const taskId = index + 1
      await dispatch('addToLogServer', { action: 'Tarefa Atualizada', taskId });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },

  async setCurrentTask({ commit }, currentTask) {
    commit('setCurrentTask', currentTask);
  },

  async addToLogServer({ state, commit }, logEntry) {
    try {
      const task = state.tasks.find(task => task.id === logEntry.taskId);
      const formattedLogEntry = {
        timestamp: moment().format('DD-MM-YYYY HH:mm:ss'),
        taskName: task ? task.name : logEntry.taskName || 'Task not found',
        ...logEntry,
      };

      await axios.post(`${baseURL}/log`, formattedLogEntry);

      commit('addToLog', formattedLogEntry);
    } catch (error) {
      console.error('Error adding log entry:', error);
    }
  },

};

const getters = {
  allTasks: state => state.tasks,
  currentTask: state => state.currentTask,
  logs: state => state.log,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
