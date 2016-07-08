
import React from 'react'
import {Map} from 'immutable'
import {Select}  from 'xComponent'


export default class SelectComponent extends React.Component {
  	state = {
  		data : Map({
  			path: '',
  			value:'',
  			isFocus: false,
  			dataSourceFetchMode: 0, //0:只从元数据取，1:只获取一次，2：每次焦点进入都获取 默认0
  			dataSource:[],
			displayMember:'',
        	valueMember:'',
  			style:{}
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
			{ _path, _getter, _isFocus, style, className } = props,
			pValus = _getter(_path, ['value', 'isFocus', 'dataSourceFetchMode', 'displayMember', 'valueMember', 'width']),
			value = pValus.get('value') || '',
			isFocus =  _isFocus || pValus.get('isFocus') || false,
			dataSourceFetchMode = pValus.get('dataSourceFetchMode'),
			dataSource = _getter(_path, 'dataSource'),
			displayMember = pValus.get( 'displayMember') || 'name',
      		valueMember = pValus.get( 'valueMember') || 'code',
			width = pValus.get('width')
		this.oldValue = value

		if(!style && width){
      		style = {width}
    	}

		data = this.set(null, {path:_path, value, isFocus, dataSourceFetchMode, dataSource, displayMember, valueMember, style})
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
			return data.mergeDeep(value)
		}
		if(typeof value === 'object'){
			return data.mergeDeepIn(propertyName.split('.'), value)	
		}
		else{
			return data.setIn(propertyName.split('.'), value)			
		}
	}
	lazyLoadDataSource(){
		let dataSourceFetchMode = this.get('dataSourceFetchMode')
		
		if(dataSourceFetchMode === 0) return

		if(dataSourceFetchMode === 1 && this.get('dataSource'))
			return

		this.props.lazyLoad(this.get('path'), 'dataSource', {fetchMode:dataSourceFetchMode})
	}


	getOptions(){
		let dataSource = this.get('dataSource')
		return dataSource ? dataSource.map((item,index)=>
			<Option value={item.get(this.get('valueMember'))}>
				{item.get(this.get('displayMember'))}
			</Option>) :
			[]
	}

	findItem(input, dataSource){
		return dataSource.find(x=>(x.get(this.get('valueMember')) === input || x.get(this.get('displayMember')) === input))
	}

	handleChange(e){
		let value = e,
			oldValue = this.oldValue,
			path = this.get('path'),
			dataSource = this.get('dataSource')

		value = this.findItem(value, dataSource)
	    if(!this.props.onFieldChange)
        	return
		
	    if( (!!this.oldValue !== !!value) ||
        	(this.oldValue.get(this.get('valueMember')) !== value.get(this.get('valueMember'))))
        	setTimeout( ()=>this.props.onFieldChange(path, oldValue, value), 0)

	}

	handleFocus(e){
		this.lazyLoadDataSource()
		if(!this.get('isFocus'))
			this.props.onFieldFocus(this.get('bindField'))
	}


	render(){
		let dataSource = this.get('dataSource')
		return (
			<div onFocus={::this.handleFocus}>
	            <Select ref='internal' 
	                value = {dataSource ? this.get('value.'+ this.get('valueMember')) : this.get('value.'+this.get('displayMember'))}
	               	style={this.get('style') && this.get('style').toJS()}
	            	onChange={::this.handleChange}
	            	>
	            		{::this.getOptions()}	
	        	</Select>
        	</div>
		)
	}
}

