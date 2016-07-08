import {Map} from 'immutable'
export function test(state = Map()){
	state = state.has('x') ? state : state.set('x',0)
	return state.update('x',x=>x+1)
}


export function fieldsChange(state, fields){
	return ()=>{
		state = state.set('fields',{...state.get('fields'), ...fields})
		if( !state.has('userName') )  state = state.set('userName',1)
		return state.set('userName' , state.get('userName') + 1)
	}
}