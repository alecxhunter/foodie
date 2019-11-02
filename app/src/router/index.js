import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Recipes from '@/components/Recipes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/recipes/:id',
      name: 'recipe-details',
      component: Recipes
    }
  ]
})
