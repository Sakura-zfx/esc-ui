import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import { routerDir } from './constant'

Vue.use(Router)

// interface Route {
//   path: string,
//   name: string,
// 	component: AsyncComponent
// }

// const composeRoute = (name: string): Route => ({
// 	path: `/${name}`,
// 	name: `/${name}`,
// 	component: () => import(`@/views/MarkdownTransfer.vue`)
// })

// const routes: Route[] = []
// const routes: Route[] = routerDir.reduce(
//   (sum: Route[], x: PackageItemGroup): Route[] => {
//     x.items.forEach((item: PackageItem): void => {
// 	    sum.push(composeRoute(item.name))
//     })
//   },
//   []
// )
// routerDir.forEach(x => {
//   x.items.forEach(item => {
// 	  routes.push(composeRoute(item.name))
//   })
// })

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // ...routes
    {
      path: '/:name',
      name: 'mark-docs',
      component: () => import(`@/views/MarkdownTransfer.vue`)
    }
  ]
})
