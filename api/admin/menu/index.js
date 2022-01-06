import request from "@/utils/request.js"

export default {
    removeByIds(data) {
        return request({
            url: 'v1/ad/menu/delete',
            method: 'delete',
            data
        })
    },
    save(data) {
        return request({
            url: 'v1/ad/menu/save',
            method: 'post',
            data
        })
    },
    updateById(data) {
        return request({
            url: 'v1/ad/menu/update',
            method: 'put',
            data
        })
    },
    info(id) {
        return request({
            url: `v1/ad/menu/info/${id}`,
            method: 'get',
        })
    },
    getMenuList() {
        return request({
            url: `v1/ad/menu/list`,
            method: 'get'
        })
    }
}

