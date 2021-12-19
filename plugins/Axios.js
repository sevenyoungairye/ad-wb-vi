import { Notification, MessageBox, Message } from 'element-ui';

// 文档地址：https://axios.nuxtjs.org/extend/
export default ({ $axios }, inject) => {

    const api = $axios.create({
        headers: {
            common: {
                Accept: 'text/plain, */*'
            }
        }
    })

    // 基本配置
    api.defaults.timeout = 10000

    // 请求拦截器
    api.onRequest((config) => {
        console.log('Making request to ' + config.url)
        config.timeout = 1000;
        config.baseURL = process.env.baseUrl;

        // get请求映射params参数
        if (config.method === 'get' && config.params) {
            let url = config.url + '?';
            for (const propName of Object.keys(config.params)) {
                const value = config.params[propName];
                var part = encodeURIComponent(propName) + "=";
                if (value !== null && typeof (value) !== "undefined") {
                    if (typeof value === 'object') {
                        for (const key of Object.keys(value)) {
                            let params = propName + '[' + key + ']';
                            var subPart = encodeURIComponent(params) + "=";
                            url += subPart + encodeURIComponent(value[key]) + "&";
                        }
                    } else {
                        url += part + encodeURIComponent(value) + "&";
                    }
                }
            }
            url = url.slice(0, -1);
            config.params = {};
            config.url = url;

            console.log('req url is : ', config.url)
        }

        return config;
    });

    // 响应拦截器
    api.onResponse((resp) => {

        // 未设置状态码则默认成功状态
        const code = resp.data.code || 200 || "200";
        // 获取错误信息
        const msg = resp.data.data || resp.data.msg;

        if (code === 401) {
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
            ).then(() => {
                window.location.href = "/";
                console.log("登出...")
            })
        } else if (code === 500) {
            Message({
                message: msg,
                type: 'error'
            })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            Notification.error({
                title: msg
            })
            return Promise.reject('error')
        }

        return Promise.resolve(resp.data);
    });

    api.onError((error) => {
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        }
        else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    });

    inject('api', api);
};
