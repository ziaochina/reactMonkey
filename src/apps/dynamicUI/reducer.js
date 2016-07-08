import Immutable,{ Map, List } from 'immutable'
import * as util from './util'
import * as validate from './validate'

export function initView(state, payload, utils) {
    let meta = Immutable.fromJS(payload.meta),
        data = Immutable.fromJS(payload.data)
    
    utils = Immutable.fromJS(utils)
    
    state = state
        .set('meta', meta)
        .set('meta_runtime', meta)
        .set('data', data)
        .set('data_runtime', data)
        .set('utils', utils)
        .set('parsedMeta', util.parseMeta(meta))

    if(payload.config){
        state = state.set('config', Immutable.fromJS(payload.config))
    }
    return state
}

export function loadData(state, path, data){
    state = state.update('data', x => x.set(path, Immutable.fromJS(data)))
        .update('data_runtime', x => x.set(path,Immutable.fromJS(data)))
    return state
}

export function onFieldChange(state, path, oldValue, newValue) {
    return  util.setter(state, path, 'value', newValue)
}

export function dataLoader(state, path, runtimePropertyName, data) {
    return state.setIn((`data.${path}_runtime.${runtimePropertyName}`).split('.'), data)
}

export function onFieldFocus(state, path) {
    return focus(state, path) //通过路径设置焦点
}

export function onEvent(state, eventName, option) {
    if(eventName === 'onGridSelectAll'){
        //选中所有行
        state = util.selectAllRows(state, option.path, option.selected)
    }

    return focus(state, '') //取消焦点
}


export function getMessage(state){
    return state.getIn(['global','message'])
}

export function setMessage(state, type, title, content, onOk, onCancel) {
    return state.setIn(['global','message'], Map({ type, title, content, onOk, onCancel }))
}

export function clearMessage(state, path) {
    return state.setIn(['global','message'], undefined)
}

export function focus(state, path){
    return util.setter(state, 'meta', 'focusField', path) 
}

Object.assign(exports, {...util, ...validate, ...exports })
