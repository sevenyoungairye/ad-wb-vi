import request from '@/utils/request'

export function deleteByIds(data) {
    return request({
        url: '/v1/ad/ftData/delete',
        method: 'delete',
        data
    })
}

export function save(data) {
    return request({
        url: '/v1/ad/ftData/save',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/v1/ad/ftData/update',
        method: 'put',
        data
    })
}

export function info(id) {
    return request({
        url: `/v1/ad/ftData/info/${id}`,
        method: 'get',
    })
}

export function getDataList(params) {
    return request({
        url: '/v1/ad/ftData/list/paging',
        method: 'get',
        params
    })
}