import { defineStore } from "pinia";

export const userStore = defineStore('userInfo', {
    state: () => {
        return {
            loginInfo: false,
        }
    },
    persist: {
        //默认名称为当前store唯一标识 这里即home
        key: 'userInfo',
        //默认localStorage 本地储存 
        //这里建议临时储存sessionStorage 也可写成window.sessionStorage
        storage: sessionStorage,
        //默认当前store里的所有变量都持久化
        paths: ['loginInfo']
    }
})