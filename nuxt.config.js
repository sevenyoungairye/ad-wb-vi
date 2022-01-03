// Build Configuration: https://go.nuxtjs.dev/config-build
/**
 * 1. nuxt配置跨域
 * https://www.nuxtjs.cn/faq/http-proxy
 * 2. webpack dev 跨域配置
 * https://github.com/webpack/webpack-dev-server
 * https://cli.vuejs.org/config/#devserver-proxy
 * https://segmentfault.com/a/1190000016199721
 */

import { resolve } from 'path'

export default {
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0' // default: localhost
    },
    env: {
        baseUrl: process.env.BASE_URL || 'http://106.55.8.54:9999/api/'
    },
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    axios: {
        proxy: true,
    },
    proxy: {
        // 前端项目下/api/xx的接口, 代理到下面的接口.. 
        // '/api/': 'http://106.55.8.54:9999',
        // '/api/': 'http://localhost:9999',
        // '/api': {
        //     target: 'http://localhost:9999',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/api': '/api'
        //     }
        // }
    },
    css: [
        'element-ui/lib/theme-chalk/index.css'
    ],
    plugins: [
        { src: '~/plugins/Icon.js' },
        { src: '~/plugins/Axios.js' },
        { src: '~/plugins/DPlayer.js', mode: 'client' },
        { src: '~/plugins/ElementUI.js', ssr: true }, // ssr: true表示这个插件只在服务端起作用
    ],
    // 定义别名解析目录, 如~image/1.png, 就可以直接使用图片了
    alias: {
        'images': resolve(__dirname, './assets/images'),
        'style': resolve(__dirname, './assets/style'),
        'data': resolve(__dirname, './assets/data')
    },
    // 默认导入components目录下面的vue组件
    components: {
        dirs: [
            '~/components',
            '~/layouts'
        ]
    },
    build: {
        parallel: true,
        babel: {
            plugins: [
                ["@babel/plugin-proposal-private-methods", { "loose": true }],
                ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
            ]
        },
        transpile: ['vue-dplayer', 'axios'],
        extend(config, ctx) {
            // 用于加载svg文件
            const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
            svgRule.exclude = [resolve(__dirname, 'assets/icons/svg')]
            // Includes /icons/svg for svg-sprite-loader
            config.module.rules.push({
                test: /\.svg$/,
                include: [resolve(__dirname, 'assets/icons/svg')],
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]'
                }
            })
        },
    },
}