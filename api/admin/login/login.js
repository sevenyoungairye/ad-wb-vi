import request from "@/utils/request.js"

export function login(data) {
    return new request({
        url: '/v1/login/',
        method: 'post',
        data
    })
}