import { bindActionCreators } from 'redux'
import parseUrl from './parseUrl'

export default function wrapMapDispatchToProps(appPath, actionCreators, reducer){
	let url = parseUrl(appPath)

	var wrapActionCreators = {}
	let keys = Object.keys(actionCreators)
	for (let i = 0; i < keys.length; i++) {
    	let key = keys[i]
	   	let wrapActionCreator = wrapAction(actionCreators[key], reducer, url.path, url.query )
	   	wrapActionCreators[key] = wrapActionCreator
	}

	return dispatch=>({...bindActionCreators(wrapActionCreators, dispatch)})
}

function wrapAction(actionCreator,reducer, path, query) {
	return (...args) => {
		return function() {
			return {
				path,
				query,
				actionCreator,
				reducer,
				args
			}
		}
	}
}