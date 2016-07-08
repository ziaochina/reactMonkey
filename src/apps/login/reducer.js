import * as dr from '../dynamicUI/reducer'

export function onEvent(state, eventName){
	state = dr.validate(state, 'login')
	return dr.onEvent(state, eventName)
}

export function onFieldChange(state, path, oldValue, newValue){
	return dr.onFieldChange(state, path, oldValue, newValue)
}

Object.assign(exports, {...dr,...exports})
