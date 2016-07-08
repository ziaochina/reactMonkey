import * as dr from '../dynamicUI/reducer'
import { Map,List } from 'immutable'

export function setMenus(state, menus){
	return state.set('menus',menus)
}

export function setMessages(state, messages){
	return state.set('messages', messages)
}

export function setTodos(state, todos){
	return state.set('todos', todos)
}

export function setAlarms(state, alarms){
	return state.set('alarms', alarms)
}

export function addTab(state, title, url){
	let tabs = dr.getter(state, "portal.tabs", 'value') //通过控件path
	//let tabs = dr.getterByField(state,['tabs']) //通过field path
	let index = tabs.findIndex(t=>t.get('url') === url || t.get('title') === title)

	if(index >= 0){
		tabs = tabs.update(index, tab=>tab.set('url',url))
		state = dr.setter(state, "portal.tabs", 'value', tabs) //通过控件path
		//state = dr.setter(state, "tabs", 'value', tabs) //通过field path
		return dr.setter(state, "portal.currentTab", 'value', tabs.get(index))	
	}

	let tab = Map({ title, url}) 
	state = dr.addRow(state, "portal.tabs", tab)
	return dr.setter(state, "portal.currentTab", 'value', tab)
}

export function selectTab(state, url){
	let currentTab = dr.getter(state, "portal.tabs", 'value').find(tab=>tab.get('url') === url)
	return dr.setter(state, "portal.currentTab", 'value', currentTab)
}

export function delTab(state, url){
	let currentTab = dr.getter(state, "portal.currentTab", 'value')
	if(currentTab.get('url') === url) 
		state = dr.setter(state, "portal.currentTab", 'value', undefined)

	state = dr.delRow(state, "portal.tabs", (v)=> v.get('url') === url)
	state = dr.setter(state,"portal.currentTab", 'value',  dr.getter(state, 'portal.tabs', 'value').last())
	return state
}

Object.assign(exports, {...dr,...exports})