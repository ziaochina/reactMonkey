import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {DatePicker} from 'xComponent'


export default class DatePickerComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-datepicker'
  	}

 	state = {
  		data : Map({
  			path: '',
  			value:'',
  			isFocus: false,
  			className:'',
  			style:{}
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
		if(this.get('isFocus')){
			this.refs.internal.toggleOpen({open:true})
    	}
  	}


	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, style, className } = props,
			pValus = _getter(_path, ['bindField', 'value', 'isFocus', 'width']),
			bindField = pValus.get('bindField'),
			value = pValus.get('value') || '',
			isFocus = pValus.get( 'isFocus') || false,
			width = pValus.get('width')
			
		this.oldValue = value

		if(!style && width){
      		style = {width}
    	}

		data = this.set(null, {path:_path, value, isFocus, className,  style})

		return {data}
	}


	get(propertyName) {
		if (!propertyName || propertyName === '') {
			return this.state.data
		}
		return this.state.data.getIn(propertyName.split('.'))
	}

	set(propertyName, value) {
		let data = this.state.data
		if (!propertyName || propertyName === '') {
			return data.merge(value)
		}
		if(typeof value === 'object'){
			return data.mergeIn(propertyName.split('.'), value)	
		}
		else{
			return data.setIn(propertyName.split('.'), value)			
		}
	}
/*
	componentDidMount(){
		let { _meta,_runtime } = this.props,
			{ bindField } = _meta
		if( _runtime.isFocus(bindField)){
			this.refs.internal.toggleOpen({open:true})
		}
	}


	handleFocus(bindField,e){
		let { _meta, _runtime} = this.props
		if(!_runtime.isFocus(bindField))
			this.props.onFieldFocus(bindField)
	}*/

	

	handleChange(e){
		let newValue = e,
			oldValue = this.oldValue,
			path = this.get('path')
		
		this.setState({data:this.set('value', newValue)})

		if( oldValue !== newValue && this.props.onFieldChange) {
			this.props.onFieldChange(path, oldValue, newValue)
		}
	}

	handleVisibleChange(e){
		alert()
	}

	handleFocus(e){
		if(!this.get('isFocus'))
			this.props.onFieldFocus(this.get('bindField'))
	}

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.props.className]: !!this.get('className'),
		})

		return (
			<div onFocus={::this.handleFocus}>
			   	<DatePicker ref='internal' 
				   	value={this.get('value')} 
				   	className={className}
		        	style={this.get('style') && this.get('style').toJS()}
		        	format="yyyy-MM-dd"
		        	onChange={::this.handleChange} 
		        	//toggleOpen={::this.handleFocus} 
		        	onVisibleChange={::this.handleVisibleChange}
	        	/>
        	</div>
		)
	}
}

