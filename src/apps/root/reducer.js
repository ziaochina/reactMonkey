/*
reducer函数，状态变化的处理函数
函数第一参数是旧的state,后面的是参数
函数返回新的state给redux,通知component重新render
 */
export function auth(state,logined){
	state = state.set('auth', logined)
	return setCurrentAppPath(state, logined?"apps/portal" : "apps/login")
}


export function setCurrentAppPath(state, currentAppPath){
	if(currentAppPath === 'apps/login' && state.get('auth')){
		currentAppPath = 'apps/portal'
	}
	return state.set('currentAppPath', currentAppPath)
}