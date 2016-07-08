import parseUrl from './parseUrl'
import { Map } from 'immutable'

export default function wrapMapStateToProps(appPath) {
	let url = parseUrl(appPath)
	return state => {
		return {
			appPath: url.path,
			appSource: url.source,
			appQuery: url.query,
			appParams: url.params,
			payload: url.query !== '' ? state.getIn([url.path, url.query]): state.get(url.path)
		}
	}
}