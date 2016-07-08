import {Map , List} from 'immutable'
import * as util from './util'

export function validate(state, path){
	let meta = util.getter(state, path),
		value = util.getter(state, path, 'value')
	state =  validateByMeta(state, path, meta, value)
	return state
}

export function setValidate(state, path, message){
	let result = util.getter(state, path, 'validate.result')
	if(!result)
		return util.setter(state, path, 'validate.result', List([message]))

	if(result.findIndex(x=>x === message) !== -1){
		return state
	}

	return util.setter(state, path, 'validate.result', List([message]).concat(result))
}

export function clearValidate(state, path){
	let meta = util.getter(state, path),
		value = util.getter(state, path, 'value')
	
	return  clearValidateByMeta(state, path, meta, value)
}

function validateByMeta(state, path, meta, value){
	let rules = meta.getIn(['validate','rules'])
	state = validateByRules(state, path, rules, value)
	let test = List(['a','b'])
	let b = test instanceof List

	let childrens = meta.get('childrens')
	if(childrens){
		childrens.forEach((children, index) =>{

			if( value instanceof List ){
				value.forEach((v,i)=>{
					let currentPath = path + '.' + children.get('name') + ',' + i,
						currentValue = util.getter(state, currentPath, 'value')
					state = validateByMeta(state, currentPath, children, currentValue)
				})
			}
			else{
				let currentPath = path + '.' + children.get('name'),
					currentValue = util.getter(state, currentPath,'value')

				state = validateByMeta(state, currentPath, children, currentValue)
			}
		})
	}
	return state
}


function validateByRules(state, path, rules, value){
    if(!rules || rules.size === 0) 
    	return state

    rules.forEach(rule=>{
    	state = validateByRule(state, path, rule, value)
    })
	return state
}

function validateByRule(state, path, rule, value){
    let required = rule.get('required'),
    	message = rule.get('message')
    
    if(required)
    	return validateRequied(state, path, value, message)

}

function validateRequied(state, path, value, message){
	if(!value)
		return setValidate(state, path, message)
	return state
}



function clearValidateByMeta(state, path, meta, value){
	let rules = meta.getIn(['validate','rules'])

	state = clearValidateByRules(state, path, rules, value)

	let childrens = meta.get('childrens')
	if(childrens){
		childrens.forEach((children, index) =>{
			if( value instanceof List ){
				value.forEach((v,i)=>{
					let currentPath = path + '.' + children.get('name') + ',' + i,
						currentValue = util.getter(state, currentPath, 'value')
					state = clearValidateByMeta(state, currentPath, children, currentValue)
				})
			}
			else{
				let currentPath = path + '.' + children.get('name'),
					currentValue = util.getter(state, currentPath,'value')

				state = clearValidateByMeta(state, currentPath, children, currentValue)
			}
		})
	}

	return state
}

function clearValidateByRules(state, path, rules, value){
    if(!rules || rules.size === 0) 
    	return state
     return util.setter(state, path, 'validate.result', undefined)
}

