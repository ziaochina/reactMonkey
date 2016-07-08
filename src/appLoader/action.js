export function loadApp(path){
	return {
		type:'@@loadApp',
		payload:{path}
	}
}

