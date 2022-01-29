import request from "@/utils/request.js"

export function downloadData() {
    return request({
        url: `/h/d`,
        method: 'get'
    })
}

export function redisAsync() {
    return request({
        url: `/h/final`,
        method: 'get'
    })
}

export function chromeOps() {
    return request({
        url: `/h/refreshM3u8`,
        method: 'get'
    })
}

export function getPlayKey() {
    return request({
        url: `/h/playKey`,
        method: 'get'
    })
}

export function crawlData(catalogId) {
    return request({
        url: `/h/run?catalogId=` + catalogId,
        method: 'get'
    })
}