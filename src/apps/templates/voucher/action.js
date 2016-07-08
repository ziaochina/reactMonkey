import Immutable from 'immutable'
import * as da from '../../dynamicUI/action'
import * as api from './api'

export function initViewById(sysId, mId, id) {
    return injectFuns => {
        da.initView(api[mId], exports)(injectFuns)
    }
}

export function getter(path, property) {
    return (injectFuns) => {
        let { getter, getterByField } = da

        if (property === 'dataSource') { //判断属性
            let dataSource = getter(path, 'dataSource')(injectFuns)
            if (typeof dataSource === 'string' && /rest/i.test(dataSource)) {
                return getterByField(['dataSource', dataSource])(injectFuns) //从state获取数据
            }
        }

        if (property === 'dropDataSource') {
            let dropDataSource = getter(path, 'dropDataSource')(injectFuns)
            if (typeof dropDataSource === 'string' && /rest/i.test(dropDataSource)) {
                return getterByField(['dataSource', dropDataSource])(injectFuns)
            }
        }

        return getter(path, property)(injectFuns)
    }
}


export function lazyLoad(path, property, options) {
    return (injectFuns) => {
        let { getter } = da, { reduce } = injectFuns
        if (property === 'dataSource') { //判断属性
            let dataSource = getter(path, 'dataSource')(injectFuns)
            if (typeof dataSource === 'string' && /rest/i.test(dataSource)) {
                reduce('setterByField', ['dataSource', dataSource], Immutable.fromJS(restCall(dataSource))) //更新state
            }
        }

        if (property === 'dropDataSource') {
            let dropDataSource = getter(path, 'dropDataSource')(injectFuns)
            if (typeof dropDataSource === 'string' && /rest/i.test(dropDataSource)) {
                reduce('setterByField', ['dataSource', dropDataSource], Immutable.fromJS(restCall(dropDataSource)))
            }
        }
    }
}

function restCall(url) {
    if (url == 'rest://bizTypes') {
        return api.bizTypes
    }

    if (url == 'rest://goodsReference')
        return api.goodsReference
}


export function onEvent(eventName, option) {
    return (injectFuns) => {
        let { getter, delRow, addRow, insertRow, delAllRow, delSelectedRow } = da, { reduce } = injectFuns

        if (eventName === "onDelRow") {
            delRow(option.path)(injectFuns) //删行，path:voucherDemo.form.tabs.details,0
        } else if (eventName === 'onAddRow') {
            addRow(option.path, getter(option.path, 'emptyRow')(injectFuns))(injectFuns) //增行
        } else if (eventName === 'onAddTenRow') {
            let emptyRow = getter(option.path, 'emptyRow')(injectFuns)
            for (let i = 0; i < 10; i++)
                addRow(option.path, emptyRow)(injectFuns) //增加行，path:voucherDemo.form.tabs.details
        } else if (eventName === 'onInsertRow') {
            insertRow(option.path, da.getter(option.path, 'emptyRow')(injectFuns))(injectFuns) //插入行，path:voucherDemo.form.tabs.details,1
        } else if (eventName === 'onDelAllRow') {

            delAllRow(option.path)(injectFuns) //删除所有行，path:voucherDemo.form.tabs.details
        } else if (eventName === 'onDelSelectedRow') {

            delSelectedRow(option.path)(injectFuns) //删除选中行，path:voucherDemo.form.tabs.details
        } else if (eventName === 'save') {
            alert(eventName)
                //da.validate(injectFuns,'sa03.form')
        } else {
            da.onEvent(eventName, option)(injectFuns)
        }
    }
}


Object.assign(exports, {...da, ...exports })
