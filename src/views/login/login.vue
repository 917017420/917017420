<template>
    <div class="login-hole" v-loading="loading" element-loading-text="正在验证登录...">
        <div class="login-hole-panel">
            <div class="row">
                <div class="logo-hole">
                    <h1>
                        <img class="logo" src="../../assets/img/logo.png" />
                    </h1>
                </div>
                <div>
                    <h4>
                        欢迎使用
                        <strong>探索式分析 后台管理系统</strong>
                    </h4>
                </div>
            </div>
            <el-form :model="form" ref="ruleFormRef" :rules="rules" class="login-form">
                <div>
                    <span class="label">用户登录</span>
                </div>

                <el-form-item prop="username">
                    <el-input v-model="form.username" class="w-50 m-2" placeholder="用户名">
                        <template #suffix>
                            <el-icon class="el-input__icon icon">
                                <Avatar />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>


                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" class="w-50 m-2" placeholder="密码">
                        <template #suffix>
                            <svg class="icon password" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2919">
                                <path
                                    d="M800.421 436.525h-63.661v-148.673c0-124.507-100.762-225.757-224.732-225.757-123.98 0-224.857 101.25-224.857 225.766v148.662h-63.593c-30.667 0-55.532 24.952-55.532 55.752v407.048c0 30.848 24.865 55.82 55.532 55.82h576.9c30.667 0 55.465-24.97 55.465-55.82v-407.048c0-30.802-24.855-55.752-55.532-55.752zM543.203 706.409v88.88c-0.016 4.026-3.264 7.287-7.282 7.325h-47.733c-4.039-0.022-7.307-3.287-7.334-7.322v-88.882c-22.423-11.518-37.953-34.602-37.953-61.659 0-38.288 30.945-69.425 69.070-69.425 38.183 0 69.138 31.136 69.138 69.415 0.057 27.067-15.473 50.152-37.905 61.659zM650.514 436.525h-276.989v-144.986c0-76.691 62.196-139.146 138.552-139.146 76.366 0 138.447 62.454 138.447 139.146v144.986z"
                                    p-id="2920"></path>
                            </svg>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="validateCode" class="verificationCodeHole">
                    <div style="display: flex;">
                        <div class="verificationCodeDiv">
                            <el-input style="padding-right: 15px;" v-model="form.validateCode" placeholder="验证码" />
                        </div>

                        <div class="verificationCodeImg">
                            <el-image @click="refrashVerificationImage()" style="width:85%;cursor:pointer"
                                :src="verificationImage" />
                        </div>

                    </div>
                </el-form-item>

                <div>
                    <el-checkbox v-model="form.rememberMe" label="记住我" />
                </div>

                <el-form-item style="width: 100%;">
                    <el-button @click="login(ruleFormRef)" style="width: 100%;" type="primary">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, onBeforeMount, ref } from 'vue';
import loginAPI from '../../utils/login/loginAPI'
import { userStore } from '../../store/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const verificationImage = ref('')
const captchaType = 'math'
const ruleFormRef = ref()

onBeforeMount(() => {
    verificationImage.value = '/api/captcha/captchaImage?type=math'
})


const loading = ref(false)

const form = reactive({
    username: '',
    password: '',
    validateCode: '',
    rememberMe: false
})

const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ],
    validateCode: [
        { required: true, message: '验证码不能为空', trigger: 'blur' },
    ],
})

async function login(formEl) {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            loading.value = true
            loginAPI.login(form).then(res => {
                if (res.data.code === 0) {
                    let loginInfo = userStore()
                    loginInfo.$patch({
                        loginInfo: true,
                    })
                    successMessage()
                    loading.value = false
                    router.push({ name: 'Home' })
                } else {
                    errorMessage(res.data.msg)
                    refrashVerificationImage()
                    loading.value = false
                }
            })
        } else {
            console.log('error submit!', fields)
        }
    })

}

function refrashVerificationImage() {
    verificationImage.value = '/api/captcha/captchaImage?type=math&s=' + Math.random();
}

const errorMessage = (text) => {
    ElNotification({
        title: 'Error',
        message: text,
        type: 'error',
    })
}

const successMessage = () => {
    ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success',
    })
}

</script>

<style lang="less" scoped>
.login-hole {
    background: url(../../assets/img/login-background.jpg) no-repeat center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: rgba(255, 255, 255, .95);
    height: 100%;
    overflow: hidden; //目的是清除margin折叠

    h1 {
        margin-top: 20px;
        margin-bottom: 15px;
    }

    h4 {
        font-size: 14px;
        margin-top: 5px;
        font-weight: 600;
        line-height: 1.1;
    }



    &-panel {
        width: 750px;
        margin: 10% auto 0;
        display: flex;
    }

    .row {
        width: 55%;
        height: 300px;
        padding-right: 15px;
        padding-left: 15px;


        .logo-hole {
            float: none;
            width: auto;
            padding: 0;
            background: 0;
        }
    }

    .login-form {
        width: 30%;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(255, 255, 255, .3);
        -moz-box-shadow: 0 3px 0 rgba(12, 12, 12, .03);
        -webkit-box-shadow: 0 3px 0 rgb(12 12 12 / 3%);
        box-shadow: 0 3px 0 rgb(12 12 12 / 3%);
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        padding: 25px 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .label {
            font-size: 14px;
            font-weight: 600;
            margin: 0;
            line-height: 1.1;
            color: #515151;
            margin-bottom: 10px;
            display: block;
        }

        .icon {
            font-size: 18px;
            color: #1b6fff;
        }

        .password {
            color: rgb(27, 111, 255);
            width: 18px;
            height: 18px;
            vertical-align: middle;
            fill: currentcolor;
            overflow: hidden;
        }

        .verificationCodeHole {
            display: flex;
            // margin-bottom: 0;
        }

        .verificationCodeDiv {
            width: 50%;
        }

        .verificationCodeImg {
            width: 50%;
            padding-right: 15px;
            padding-left: 15px;
            height: 31px;
        }
    }

    .logo {
        width: 50%;
        margin-left: -18px;
        vertical-align: middle;
    }
}
</style>