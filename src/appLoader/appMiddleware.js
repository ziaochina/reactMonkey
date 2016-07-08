import parseUrl from './parseUrl'

export default (apps, injectFuns, injectFunsForReducer)=>({getState,dispatch})=>{
	return next => action => {
		if (typeof action === 'function') {
			let {path, query, actionCreator, args, reducer } = action()
			let reduce = (type, ...args) => {
				dispatch({
					type: '@@reduce',
					payload: {
						path, query, type, reducer, payload: args, injectFunsForReducer
					}
				})
			}
			let getStateByApp = ()=>  query !== '' ? getState().getIn([path, query]): getState().get(path) ;
			actionCreator(...args)({reduce,getState:getStateByApp,...injectFuns})

		} else if(action.type && action.type == '@@loadApp') {
			let path = action.payload.path
			let url = parseUrl(path)
			apps(url.path, (component, action, reducer)=>{
				return next({type:'@@loadAppReal', payload:{path: path, component, action, reducer}})
			})
		}
		else{
			return next(action)
		}
	}
}
