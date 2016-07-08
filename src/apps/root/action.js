export function auth (logined = true){
	/*
	Reduce函数是AppMiddleware中间件注入的
	执行reduce(‘reducer function name’, …args)会返回一个Action行为
	然后redux Dispatch接管调用到reducer
	*/
	return ({reduce})=>reduce('auth',logined)
}


export function setCurrentAppPath(currentAppPath){
	return ({reduce})=>reduce('setCurrentAppPath', currentAppPath)
}