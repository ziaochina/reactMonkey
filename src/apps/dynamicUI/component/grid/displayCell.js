import React from 'react'
import {Map,List} from 'immutable'
import {Tooltip} from 'xComponent'
import {Table, Column, Cell} from 'fixed-data-table'

export default class DisplayCellComponent extends React.Component {
 	state = {
  		data : Map({
  			path: '',
  			value:'',
  			format:'',
  			displayMember:'',
  			className:'',
  			style: {},
  			validateResult:[]
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
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
			pValues = _getter(_path, [ 'value', 'displayMember', 'validate.result']),
			value = pValues.get('value'),
			displayMember = pValues.get('displayMember'),
			validateResult = pValues.get('validate.result')

		data = this.set(null,{path: _path, value, displayMember, className, validateResult,  style })

		return {data}
	}

	formatValue(fieldType, value, format){
		if(!format) return value

		let d= new Date(value)
		return d.getFullYear().toString() + '-' + (d.getMonth()+1) + '-' + d.getDate()
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
	      return Map(value)
	    }
	    if(value instanceof List){
	    	return data.setIn(propertyName.split('.'), value)     
	    }
	    if(typeof value === 'object'){
	      return data.merge(propertyName.split('.'), value) 
	    }
	    else{
	      return data.setIn(propertyName.split('.'), value)     
	    }
	}

	handleClick( e){
		e.preventDefault()
      	this.props.onFieldFocus(this.get('path'))
  	}


	render(){
		let value = this.get('value'),
			displayMember = this.get('displayMember')

		if(value == null || value == undefined){
			value = ''
		}
		else if(typeof value === 'object' && displayMember){
			value = value.get(displayMember)
		}

		return (
          <div onClick={::this.handleClick} className='z-grid-displaycell'>
            {value + ''}
        	{::this.renderError()}    
          </div>
		)
	}

	 renderError(){
        let validateResult = this.get('validateResult')

        if(validateResult && validateResult.size > 0){
            let message = validateResult.toArray().join("")
            return( 
                <Tooltip title={message}>
                	<span className=' has-error has-feedback z-grid-displaycell-error' ></span>
                </Tooltip>
            )
        }
        else{
            return(<div></div>)
        }
    }
}
