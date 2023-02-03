import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/',  component: App, name: 'Login'}
    ]
})

// router.beforeEach(async (to, from) => {
//     if (
//       // 检查用户是否已登录
//       !isAuthenticated &&
//       // ❗️ 避免无限重定向
//       to.name !== 'Login'
//     ) {
//       // 将用户重定向到登录页面
//       return { name: 'Login' }
//     }
//   })

export default router