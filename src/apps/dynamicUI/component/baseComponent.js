import React from 'react'
import ReactDOM from 'react-dom'

export default class BaseComponent extends React.Component {
	constructor(props){
		super(props)

		let { _meta, _utils } = props

		this.meta = _meta
		this.runtime = _runtime
		this.bindField = _meta.get('bindField')
		this.valueGetter = _runtime.get('valueGetter')
		this.isFocus = _runtime.get('isFocus')

	}

	componentDidMount(){
		if(this.isFocus(this.bindField)){
			let e = ReactDOM.findDOMNode(this.refs.internal)
			e.getElementsByTagName('input')[0].focus()
		}
	}

	handleBlur(bindField, oldValue, e){
		let newValue = e
		if(e.target && e.target.value){
			newValue = e.target.value
		}
		if( oldValue !== newValue && this.props.onFieldChange) {
			this.props.onFieldChange(bindField, oldValue, newValue)
		}
	}

	handleFocus(bindField,e){

		if(!this.isFocus(this.bindField))
			this.props.onFieldFocus(this.bindField)
	}

	renderComponent(props, meta, runtime, bindField, handleFocus, handleBlur){
		return <div>no render component</div>
	}

    render() {
    	
    	let value = this.valueGetter(this.bindField)
        return this.renderComponent(value , this.handleFocus.bind(this, this.bindField), 
        	this.handleBlur.bind(this, this.bindField, value))
    }
}
