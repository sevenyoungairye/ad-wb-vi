import request from '@/utils/request'

export function deleteById(data) {
    return request({
        url: '/v1/ad/ftDtls/delete',
        method: 'delete',
        data
    })
}

export function update(data) {
    return request({
        url: '/v1/ad/ftDtls/update',
        method: 'put',
        data
    })
}

export function save(data) {
    return request({
        url: '/v1/ad/ftDtls/save',
        method: 'post',
        data
    })
}

export function info(id) {
    return request({
        url: `/v1/ad/ftDtls/info/${id}`,
        method: 'get',
    })
}

export function getDataList(params) {
    return request({
        url: '/v1/ad/ftDtls/list/paging',
        method: 'get',
        params
    })
}