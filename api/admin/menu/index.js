import request from "@/utils/request.js"

export default {
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

