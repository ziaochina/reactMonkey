import Immutable,{Map} from 'immutable'
import * as la from '../../templates/list/action'
import * as api from './api'

export function initView(id) {
    return injectFuns => {
    	la.initView(api.listDemo, exports)(injectFuns)
    }
}


export function onEvent(eventName, option){
	return (injectFuns) =>{
		if(eventName === "delete"){
			let selectedRows = la.getSelectedRows('listDemo.form.tabs.details.select')(injectFuns) //获取选中行
			alert( JSON.stringify(selectedRows.map(r=>r.get('id')).toJS()))
		}
		else{
			la.onEvent(eventName, option)(injectFuns)
		}
	}	
}


Object.assign(exports, {...la,...exports})
