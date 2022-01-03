import request from '@/utils/request'

export function deleteByIds(data) {
    return request({
        url: '/v1/ftData/delete',
        method: 'delete',
        data
    })
}

export function save(data) {
    return request({
        url: '/v1/ftData/save',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/v1/ftData/update',
        method: 'put',
        data
    })
}

export function info(id) {
    return request({
        url: `/v1/ftData/info/${id}`,
        method: 'get',
    })
}

export function getDataList(params) {
    return request({
        url: '/v1/ftData/list/paging',
        method: 'get',
        params
    })
}