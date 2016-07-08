import Immutable,{Map} from 'immutable'
import * as va from '../../templates/voucher/action'
import * as api from './api'

export function initView(id) {
    return injectFuns => {
    	let payload = api.voucherDemo
    	if(id)
    		api.voucherDemo.data.form = api.vouchers[parseInt(id)]
    	else
    		api.voucherDemo.data.form = api.addData
    	//injectFuns.reduce('initView', payload, va.getUtils(injectFuns, exports))
    	va.initView(payload, exports)(injectFuns)
    }
}


export function onEvent(eventName, option){	
	return (injectFuns) =>{
		if(eventName === "save"){
			let a = va.getJson('form')(injectFuns)
			alert( JSON.stringify(a))
			//va.validate(injectFuns,'cardDemo.form')
		}else if(eventName === "prevPage"){
			injectFuns.reduce('loadData', 'form', api.vouchers[0])

		}else if(eventName === "nextPage"){
			injectFuns.reduce('loadData', 'form', api.vouchers[1])			
		}else if(eventName === "add"){
			injectFuns.reduce('loadData', 'form', api.addData)			
		}
		else{
			va.onEvent(eventName, option)(injectFuns)
		}
	}	
}

Object.assign(exports, {...va,...exports})
