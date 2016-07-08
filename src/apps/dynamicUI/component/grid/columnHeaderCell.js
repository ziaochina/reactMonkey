import React from 'react'
import classNames from 'classnames'
import {Map} from 'immutable'
import {Table, Column, Cell} from 'fixed-data-table'

export default class ColumnHeaderCellComponent extends React.Component {
	state = {
  		data : Map({
  			title:'',
  			required:false
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
    	return this.state.data !== nextState.data
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, style, className } = props,
			title = _getter(_path,'title'),
			required =_getter(_path,'required') || false

		data = this.set(null,{title, required})
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

	render(){
		let cls = classNames({
			 'ant-form-item-required':this.get('required')
		})
		return (
			<Cell><label className={cls}>{this.get('title')}</label></Cell>
		)
	}
}
