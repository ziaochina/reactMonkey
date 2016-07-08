import * as vr from '../../templates/voucher/reducer'

/**
 * [控件值变化事件]
 * @param  {[type]} state    [旧状态]
 * @param  {[type]} path     [路径，例如voucherDemo.form.tabs.details.price,2]
 * @param  {[type]} oldValue [旧值]
 * @param  {[type]} newValue [新值]
 * @return {[type]}          [新状态]
 */
export function onFieldChange(state, path, oldValue, newValue) {
    let { existsParamsInPath, match, onFieldChange } = vr

    state = onFieldChange(state, path, oldValue, newValue)

    //路径当中带行index
    if (existsParamsInPath(path)) {
        //单价或者数量发生变化
        if (match(path, 'value', ['voucherDemo.form.tabs.details.price', 'voucherDemo.form.tabs.details.number'], 'value')) {
            state = priceOrNumberChange(state, path, oldValue, newValue)
        }
    }
    return state
}

/**
 * [价格或者数量录入发生变化]
 * @param  {[type]} state    [旧状态]
 * @param  {[type]} path     [路径]
 * @param  {[type]} oldValue [旧值]
 * @param  {[type]} newValue [新值]
 * @return {[type]}          [新状态]
 */
function priceOrNumberChange(state, path, oldValue, newValue) {
    let { parsePath, getter, setter } = vr,
        parsedPath = parsePath(path),
        pricePath = 'voucherDemo.form.tabs.details.price',
        numberPath = 'voucherDemo.form.tabs.details.number',
        amountPath = 'voucherDemo.form.tabs.details.amount',
        detailsPath = 'voucherDemo.form.tabs.details',
        index = parsedPath.vars[0],
        row = getter(state, `${detailsPath},${index}`, 'value'), //获取行数据
        price = row.get('price'), //获取单价
        number = row.get('number') //获取数量

    //联动设置金额=单价*数量
    return setter(state, `${amountPath},${index}`, 'value', price * number)
}


Object.assign(exports, {...vr,
    ...exports
})
