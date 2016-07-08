import Immutable, { Map, List } from 'immutable'
import * as util from './util'

/**
 * [初始化视图]
 * @param  {[type]} payload [description]
 * @param  {[type]} exps    [description]
 * @return {[type]}         [description]
 */
export function initView(payload, exps) {
    return (injectFuns) => {
        injectFuns.reduce('initView', payload, getUtils(exps, injectFuns))
    }
}

function getUtils(exps, injectFuns) {
    return {
        getter: (path, propertys) => {
            return exps.getter(path, propertys)(injectFuns)
        },
        getterByField: (fieldPath) => {
            return exps.getter(fieldPath)(injectFuns)
        }
    }
}


/**
 * [通过控件路径获取元数据或者值]
 * @param  {[type]} path      [路径]
 * @param  {[type]} propertys [要获取哪些哪些属性值]
 * @return {[type]}           [如果获取的是多个属性返回类型immutable map]
 */
export function getter(path, propertys) {
    return ({ getState }) => {
        return util.getter(getState(), path, propertys)
    }
}

/**
 * [通过字段路径获取值]
 * @param  {[type]} fieldPath [字段路径]
 * @return {[type]}           [值]
 */
export function getterByField(fieldPath) {
    return ({ getState }) => {
        return util.getterByField(getState(), fieldPath)
    }
}

/**
 * [字段录入修改事件]
 * @param  {[type]} path     [路径]
 * @param  {[type]} oldValue [旧值]
 * @param  {[type]} newValue [新值]
 * @return {[type]}          [无]
 */
export function onFieldChange(path, oldValue, newValue) {
    //console.log(path + '-' + oldValue + '-' + newValue)
    return ({ reduce }) => {
        reduce('onFieldChange', path, oldValue, newValue)
    }
}

/**
 * [字段焦点发生变化事件]
 * @param  {[type]} path [路径]
 * @return {[type]}      [无]
 */
export function onFieldFocus(path) {
    return ({ reduce }) => {
        reduce('onFieldFocus', path)
    }
}

/**
 * [事件]
 * @param  {[type]} eventName [事件名]
 * @param  {[type]} option    [参数]
 * @return {[type]}           [无]
 */
export function onEvent(eventName, option) {
    return ({ reduce, getState }) => {
        //getChangeset(getState)
        reduce('onEvent', eventName, option)
    }
}

/**
 * [手动触发校验]
 * @param  {[type]} path [校验路径]
 * @return {[type]}      [description]
 */
export function validate(path) {
    return (injectFuns) => {
        let { reduce, getState } = injectFuns
        clearValidate(path)(injectFuns)
        let oldState = getState()
        reduce('validate', path)
        let newState = getState()
        return oldState === newState
    }
}

/**
 * [设置消息]
 * @param {[type]} type     [description]
 * @param {[type]} title    [description]
 * @param {[type]} content  [description]
 * @param {[type]} onOk     [description]
 * @param {[type]} onCancel [description]
 */
export function setMessage(type, title, content, onOk, onCancel) {
    return ({ reduce }) => {
        reduce('setMessage', type, title, content, onOk, onCancel)
    }
}

/**
 * [设置校验信息]
 * @param {[type]} path    [description]
 * @param {[type]} message [description]
 */
export function setValidate(path, message) {
    return ({ reduce }) => {
        reduce('setValidate', path, message)
    }
}

/**
 * [清空校验信息]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function clearValidate(path) {
    return ({ reduce }) => {
        reduce('clearValidate', path)
    }
}

/**
 * [清空消息]
 * @return {[type]} [description]
 */
export function clearMessage() {
    return ({ reduce }) => {
        reduce('clearMessage')
    }
}

/**
 * [懒加载]
 * @param  {[type]} path     [路径]
 * @param  {[type]} property [属性]
 * @return {[type]}          [description]
 */
export function lazyLoad(path, property) {
    return ({ reduce }) => {
        //reduce('setter', path, property, List())
    }
}

/**
 * [获取state toJson]
 * @param  {[type]} path [路径]
 * @return {[type]}      [json]
 */
export function getJson(path) {
    return ({ getState }) => {
        return util.getJson(getState(), path)
    }
}


/**
 * [增行]
 * @param {[type]} path    [description]
 * @param {[type]} rowData [description]
 */
export function addRow(path, rowData) {
    return ({ reduce }) => {
        reduce('addRow', path, rowData)
    }
}

/**
 * [插入行]
 * @param  {[type]} path    [description]
 * @param  {[type]} rowData [description]
 * @return {[type]}         [description]
 */
export function insertRow(path, rowData) {
    return ({ reduce }) => {
        reduce('insertRow', path, rowData)
    }
}

/**
 * [删除行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function delRow(path) {
    return ({ reduce }) => {
        reduce('delRow', path)
    }
}

/**
 * [删除所有行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function delAllRow(path) {
    return ({ reduce }) => {
        reduce('delAllRow', path)
    }
}

/**
 * [删除选中行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function delSelectedRow(path) {
    return ({ reduce }) => {
        reduce('delSelectedRow', path)
    }
}

/**
 * [获取选中行]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
export function getSelectedRows(path) {
    return ({ getState }) => {
        return util.getSelectedRows(getState(), path)
    }
}

Object.assign(exports, { match: util.match, ...exports })


/*
function getChangeset(getState, path){
	let v = getState().getIn(['data','saleDelivery']),
		status = getState().getIn(['data','saleDelivery_runtime', 'status'])
	if(isChanged(status)){
		let result = getChangesetJson( v, status)
		alert(JSON.stringify(result))
	}
	else{
		alert('没更改')
	}

}

function getChangesetJson(value, status){
	if(value instanceof Map){
		let result = {id: value.get('id'), status}
		value.keySeq().forEach(k => {
			let rv = value.get(k+"_runtime"),
				s = calcStatus(status, rv? rv.get('status') : null),
				c = isChanged(s),
				v = rv? (rv.get('value')||value.get(k)) : null
			if(c) {
				result[k] = getChangesetJson(v, s)
			}
		})
		return result
	}
	else if(value instanceof List){
		let result = []
		value.forEach(v=>{
			let rv = v.get('_runtime'),
				s = calcStatus(status, rv ? rv.get('status') : null),
				c = isChanged(s)
			if(c){
				result.push(getChangesetJson(v, s))
			}
		})
		return result
	}
	else{
		return value
	}
}

function calcStatus(oldStatus, newStatus){
	if(oldStatus === 'deleted' || oldStatus === 'added') return oldStatus
	return newStatus
}

function isChanged(status){
	return !(!status || status === 'nochanged' || status === 'empty')
}

*/
