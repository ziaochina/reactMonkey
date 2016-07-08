//引用单据action（单据action做了针对单据类录入app，封装了共用的函数）
import * as va from '../../templates/voucher/action'
//引用api
import * as api from './api' 

/**
 * [初始化视图]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function initView(id) {
	//函数柯里化处理，函数返回值是函数，app middleware会对返回的函数注入app需要的函数（高阶函数） --这块不用太关注，照样写就行
	//injectFuns中包含的常用函数
	//getState:获取状态
	//reducer：执行reduce函数
	//get:ajax get函数
	//post：ajax post函数
    return injectFuns => { 
    	//调用reducer的initView函数
    	//第一个参数包含了元数据，数据
    	//第二个参数写死都是一样
    	va.initView(api.cardDemo, exports)(injectFuns)
    }
}


/**
 * [事件处理]
 * @param  {[type]} eventName [description]
 * @param  {[type]} option    [description]
 * @return {[type]}           [description]
 */
export function onEvent(eventName, option){
	return (injectFuns) =>{
		//事件名为save
		if(eventName === "save"){
			let a = va.getJson('form')(injectFuns)
			alert( JSON.stringify(a))
			//va.validate(injectFuns,'cardDemo.form')
		}else if(eventName === "prevPage"){
			injectFuns.reduce('loadData', 'form', api.cards[0])

		}else if(eventName === "nextPage"){
			injectFuns.reduce('loadData', 'form', api.cards[1])			
		}else if(eventName === "add"){
			injectFuns.reduce('loadData', 'form', api.addData)			
		}
		else{
			va.onEvent(eventName, option)(injectFuns)
		}
	}	
}

/**
 * [getter重写]
 * @param  {[type]} path      [description]
 * @param  {[type]} propertys [description]
 * @return {[type]}           [description]
 */
export function getter(path, propertys){
	return (injectFuns)=>{
		//匹配备注,value属性获取，给value后面加"-aaa"
		if(va.match(path, propertys, 'cardDemo.form.fromItems.memo1', 'value') ){
			let result =  va.getter(path, propertys)(injectFuns) ,
				value = ''

			if(typeof result === 'string') {
				value = result
				value = value ? value : ''
				return `${value}-aaa`
			}
			else{
				value = result.get('value') 
				value = value ? value : ''
				return result.set('value',  `${value}-aaa`)
			}
		}
		else{
			return va.getter(path, propertys)(injectFuns)
		}
	}
}

//../../templates/voucher/action和当前的exports函数合并成新的action，重名函数当前覆盖原来的
Object.assign(exports, {...va,...exports})
