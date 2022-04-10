import { Message } from 'element-ui'

/**
 * 返回当前元素的文本内容
 * @parm {DOM} element 当前DOM元素
 */
export function selectText(element) {
    return element.innerText;
}
/**
 * @param {String} text 需要复制的内容
 * @return {Boolean} 复制成功:true或者复制失败:false  执行完函数后，按ctrl + v试试
*/
export function copyText(text) {

    navigator.clipboard.writeText(text).then(
        function () {
            Message.success({
                showClose: true,
                message: 'copy success!',
                type: 'success'
            });
            return true;
        }
    ).catch(
        function () {
            console.log('copy error!')
            return false;
        }
    ).finally(() => {

    });
}

/**
 * 复制函数
 * @param {object} e  this对象
 */
export function doCopy(e) {
    copyText(selectText(e));
}


/**
 * 去重
 * @param {object} arr 数组
 * @param {string} key 按指定的属性去重
 */
export function arrayDiff(arr, key) {
    const res = new Map();
    return arr.filter((item) => {
        let arrayKeyVal = item[key];
        return !res.has(arrayKeyVal) && res.set(arrayKeyVal, 1)
    })
}