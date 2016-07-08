import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import assign from 'object-assign'
import {Map} from 'immutable'
import {Input} from 'xComponent'

export default class InputComponent extends React.Component {
	static defaultProps = {
      	prefixCls: 'z-input'
  	}

  	state = {
  		data : Map({
  			path: '',
  			value:'',
  			isFocus: false,
  			disabled:false,
  			visible:true,
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
    	return !this.state.data.equals(nextState.data)
    }

	calculateState(props){
		let { data } = this.state,
			{ _path, _getter, _isFocus, style, className } = props,
			pValus = _getter(_path, ['value', 'isFocus', 'visible', 'disabled', 'width']),
			value = pValus.get('value') || '',
			isFocus =  _isFocus || pValus.get('isFocus') || false,
			disabled =pValus.get( 'disabled') || false,
			visible = pValus.get( 'visible') || true,
			width = pValus.get('width') 

		this.oldValue = value

		if(!style && width){
      		style = {width}
    	}

		data = this.set(null,{path: _path, value, isFocus, disabled, visible, className,  style })
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

	handleBlur(e){
		e.preventDefault()
		let newValue = e.target.value,
			oldValue = this.oldValue,
			bindField = this.get('bindField')

		this.setState({data:this.set('value', newValue)})

		if( this.props.onFieldChange && oldValue !== newValue) {
			this.props.onFieldChange(this.get('path'), oldValue, newValue)
		}
	}

	handleFocus(e){
		e.preventDefault()
		
		if(!this.get('isFocus')){
			this.props.onFieldFocus(this.get('path'))
		}
	}

	handleChange(e){
		e.preventDefault()
		if(e.target.value === this.get('value')) return
		this.setState({data:this.set('value', e.target.value)})
		let newValue = e.target.value,
			oldValue = this.oldValue
		if(!this.get('isFocus')){
			if( this.props.onFieldChange && oldValue !== newValue) {
				this.props.onFieldChange(this.get('path'), oldValue, newValue)
			}
		}
		

	}

	render(){
		let className = classNames({
			 [this.props.prefixCls]: true,
			 [this.props.className]: !!this.get('className'),
		})

		return (
            <Input 
            	ref='internal' 

            	value={this.get('value') || ''} 
            	className={className}
            	disabled={this.get('disabled')}
            	style={this.get('style') && this.get('style').toJS()}
            	onBlur={::this.handleBlur} 
            	onFocus={::this.handleFocus} 
            	onChange={::this.handleChange}
            	addonBefore={this.props.addonBefore}
            />
		)
	}
}
