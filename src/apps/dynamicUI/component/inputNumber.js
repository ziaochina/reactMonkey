import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {InputNumber} from 'xComponent'

export default class InputNumberComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-input-number'
  	}

  	state = {
  		data : Map({
  			path: '',
  			value:'',
  			step: 1,
  			isFocus: false,
			className:'',
  			style: {}
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
	}

	componentDidMount() {
		if(this.get('isFocus')){
    		let domNode = ReactDOM.findDOMNode(this.refs.internal).getElementsByTagName('input')[0]
    		domNode.focus()
    		domNode.value = ''
    		domNode.value = this.get('value')
    	}
  	}


	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	let b = !this.state.data.equals(nextState.data)
    	return b
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, _isFocus, style, className } = props,
			pValus = _getter(_path, ['value', 'precision', 'isFocus', 'width']),
			value = pValus.get('value') + '' || '',
			precision = pValus.get( 'precision') || 0,
			isFocus = _isFocus || pValus.get( 'isFocus') || false,
			width = pValus.get('width'),
			step =1

		if(!style && width){
      		style = {width}
    	}

		step = this.calculateSetp(precision)
		this.oldValue = value
		data = this.set(null, {path:_path, value, step, isFocus, className, style })
		return {data}
	}

	calculateSetp(precision){
		if(!precision) 
			return 1
		if(precision === '' || precision === 0)
			return 1
		return 1/Math.pow(10, precision)
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


	handleBlur(e){
		let newValue = e.target.value,
			oldValue = this.oldValue,
			path = this.get('path')

		this.setState({data:this.set('value', newValue)})

		if( this.props.onFieldChange && oldValue != newValue) {
			this.props.onFieldChange(path, oldValue, newValue)
		}
	}



	handleFocus(e){
		e.preventDefault()
		if(!this.get('isFocus'))
			this.props.onFieldFocus(this.get('bindField'))
	}

	handleChange(e){
		if( e + '' === this.get('value')) return
		this.setState({data:this.set('value', e + '')})
	}


	render(){
		let className = classNames({
			[this.props.prefixCls]: true,
			[this.props.className]: !!this.get('className'),
		})
		return (
			 <InputNumber 
			 	ref='internal' 
            	value={this.get('value')} 
            	className={className}
            	style={this.get('style') && this.get('style').toJS()}
            	step={this.get('step')}
            	onBlur={::this.handleBlur} 
            	onFocus={::this.handleFocus} 
            	onChange={::this.handleChange}
            />
		)
	}
}

