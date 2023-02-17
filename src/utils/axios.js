import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;

//Http 拦截器
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {

        alert(JSON.stringify(error), '请求异常', {
            confirmButtonText: '确定',
            callback: (action) => {
                console.log(action)
            }
        });
    }
);

//封装Get、Post请求
export function request(url = '', params = {}, type = 'POST') {
    //设置 url params type 的默认值
    return new Promise((resolve, reject) => {
        let promise
        if (type.toUpperCase() === 'GET') {
            promise = axios({
                url,
                params,
                method: 'GET',
            })
        } else if (type.toUpperCase() === 'POST') {
            promise = axios({
                method: 'POST',
                url,
                data: params
            })
        }
        //处理返回
        promise.then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}





