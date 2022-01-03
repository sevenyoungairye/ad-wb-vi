// 文档地址：https://axios.nuxtjs.org/extend/
export default function ({ $axios }, inject) {
    // Create a custom axios instance
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'text/plain, */*'
            }
        }
    })

    $axios.onError(error => {
        nuxtError({
            statusCode: error.response.status,
            message: error.message,
        });
        return Promise.resolve(false);
    })

    // 请求拦截器
    api.onRequest((config) => {
        console.log('Making request to ' + config.url)
        config.timeout = 2000;
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


    // Set baseURL to something different
    api.setBaseURL(process.env.baseUrl)

    // Inject to context as $api
    inject('api', api)
}