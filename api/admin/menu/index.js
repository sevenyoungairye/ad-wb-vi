import request from "@/utils/request.js"

export default {
    removeByIds(data) {
        return request({
            url: 'v1/menu/delete',
            method: 'delete',
            data
        })
    },
    save(data) {
        return request({
            url: 'v1/menu/save',
            method: 'post',
            data
        })
    },
    updateById(data) {
        return request({
            url: 'v1/menu/update',
            method: 'put',
            data
        })
    },
    info(id) {
        return request({
            url: `v1/menu/info/${id}`,
            method: 'get',
        })
    },
    getMenuList() {
        return request({
            url: `v1/menu/list`,
            method: 'get'
        })
    }
}

