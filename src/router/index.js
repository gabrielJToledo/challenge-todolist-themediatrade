import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'
import LogView from '@/views/LogView.vue'

const routes = [
  { path: '/', component: TodoView, name: 'home'},
  { path: '/log', component: LogView, name: 'log'}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
