import request from '@/utils/request'

export function deleteById(data) {
    return request({
        url: '/v1/ftDtls/delete',
        method: 'delete',
        data
    })
}

export function update(data) {
    return request({
        url: '/v1/ftDtls/update',
        method: 'put',
        data
    })
}

export function save(data) {
    return request({
        url: '/v1/ftDtls/save',
        method: 'post',
        data
    })
}

export function info(id) {
    return request({
        url: `/v1/ftDtls/info/${id}`,
        method: 'get',
    })
}

export function getDataList(params) {
    return request({
        url: '/v1/ftDtls/list/paging',
        method: 'get',
        params
    })
}