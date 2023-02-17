import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import login from '../views/login/login.vue'
import home from '../views/home/home.vue'
import { userStore } from '../store/userStore'
const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        { path: '/login', name: 'Login', component: login },
        { path: '/home', name: 'Home', component: home },
        { path: '/', name: 'Home', component: home }
    ]
})

router.beforeEach(async (to, from) => {
    let loginInfo = userStore()
    console.log(loginInfo.loginInfo)
    if (
        // 检查用户是否已登录
        !loginInfo.loginInfo &&
        // ❗️ 避免无限重定向
        to.name !== 'Login'
    ) {
        console.log("没登录嗷")
        // 将用户重定向到登录页面
        return { name: 'Login' }
    }
})

export default router