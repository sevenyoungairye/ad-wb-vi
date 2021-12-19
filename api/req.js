import request from '@/utils/request'

export default {
    // https://dev.ningjitea.com/bmm/captchaImage
    getCaptchaImg() {
        return request({
            url: 'bmm/captchaImage',
            method: 'get'
        })
    }
}