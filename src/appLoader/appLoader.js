import React from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import parseUrl from './parseUrl'
import pubsub from './pubsub'

import wrapMapStateToProps from './wrapMapStateToProps'
import wrapMapDispatchToProps from './wrapMapDispatchToProps'
import createReduxConnector from './createReduxConnector'

class AppLoader extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		let { path, payload } = this.props
		if( !payload.getIn([ '@@require', path]) ){
			this.props.loadApp(path)
		}
	}

	componentWillReceiveProps(nextProps){
		let { path, payload } = nextProps
		if( !payload.getIn([ '@@require', path]) ){
			this.props.loadApp(path)
		}

	}

	shouldComponentUpdate(nextProps, nextState){
    	return true
    }

	render(){
		let { path, payload } = this.props
		if(payload.getIn(['@@require', path]) ){
			let ReduxConnector = payload.getIn(['@@require', path])
			return <ReduxConnector key={path}  ref='connector' {...this.props} />
		}
		else{
			return <div></div>
		}
	}
}

export default connect((state, props) => {
        let url = parseUrl(props.path),
        	payload = state.get(url.path)
        return {
            payload: payload || Map()
        }
    },
    dispatch => ({...bindActionCreators(actions, dispatch)}), null, {
        withRef: true,
        pure: true
    }
)(AppLoader)