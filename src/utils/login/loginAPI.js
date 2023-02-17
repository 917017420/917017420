import { request } from "../axios";

export default  {

    async login(params) {
        return request('/api/login', params, 'post')
    },
    
    async getcaptchaImage(params){
        return request('/api/captcha/captchaImage?type=' + params, '', 'get')
    }
}