import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Detail from '../views/DetailPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Create from '@/views/Create.vue'
import Update from '@/views/Update.vue'

const routes = [
  { path: '/', component: Home,name:"notes" },
  { path: '/notes/:_id', component: Detail,name:"notes.show" },
  { path: '/create', component: Create,name:"notes.create" },
  { path: '/up-note/:_id', component: Update,name:"notes.update" },
  {path: '/:pathMatch(.*)*',component:NotFoundPage,name:"notFound"}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
