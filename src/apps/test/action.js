export function test(){
	return ({reduce})=>{
		reduce('test')
	}
}

export function fieldsChange(fields){
	return ({reduce}) =>{
		reduce('fieldsChange',fields)
	}
}