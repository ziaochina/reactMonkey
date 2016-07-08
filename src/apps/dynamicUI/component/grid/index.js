import React from 'react'
import ReactDOM from 'react-dom'
import {Map, List} from 'immutable'
import {Table, Column, Cell,ColumnGroup} from 'fixed-data-table'
import { Checkbox, Popover, Button } from 'xComponent'
import {appendColumn, insertOptionColumn, insertSequenceColumn, insertSelectColumn} from './column'

export default class GridComponent extends React.Component{
	static defaultProps = {
        prefixCls: 'z-grid'
    }

	state = {
  		data : Map({
  			path:'',
  			value:undefined,
  			className:'',
  			rowHeight:30,
  			headerHeight:30,
  			groupHeaderHeight: 30,
  			disabled:false,
  			enableSum: false,
  			enableSequenceColumn:true,
  			allowAddrow:false,
  			allowDelrow:false,
  			style: {}
  		})
  	}

	constructor(props){
		super(props)
		this.state = this.calculateState(this.props)
		this.columns = []
		this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
	}

	componentDidMount() {
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
    }

    componentWillUnmount(){
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
    }

    onResize() {
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this.update, 0)
    }

    update() {
        let dom = ReactDOM.findDOMNode(this),
            height = 0,
            width = 0
        this.setState({data:this.set(null,{style:{height , width}})})
    }

	componentWillReceiveProps(nextProps){
    	this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
    	return true
    }

	calculateState(props){
		let {data} = this.state,
			{ _path, _getter, style, className } = props,
			pValues = _getter(_path,['value', 'rowHeight', 'headerHeight', 'disabled', 'enableSum','enableSequenceColumn','allowAddrow','allowDelrow']),
			value = pValues.get('value') || List(),
			rowHeight = pValues.get('rowHeight') || 30,
			headerHeight = pValues.get('headerHeight') || 30,
			disabled = pValues.get('disabled') || false,
			enableSum = pValues.get('enableSum') || false,
			enableSequenceColumn = pValues.get('enableSequenceColumn') || true,
			allowAddrow = pValues.get('allowAddrow') || false,
			allowDelrow = pValues.get('allowDelrow') || false
			
		data = this.set(null,{path: _path, value, 
			rowHeight, headerHeight,  
			disabled, enableSum,enableSequenceColumn,
			allowAddrow, allowDelrow, className, style })

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

	getColumns(){
		if(this.columns.length > 0) return this.columns
		let { _path, _getter, prefixCls, style, className, ...otherProps } = this.props,
		   childrens = _getter(_path, 'childrens'),
		   disabled = this.get('disabled'),
		   columns = []//this.columns

		
		if(this.get('enableSequenceColumn'))
			columns = insertSequenceColumn(columns, this.props)		   

		childrens.forEach((children,index) =>{
			if(children.get('isSelectColumn'))
				columns = insertSelectColumn(columns, _path, children, _getter, otherProps)
			else
				columns = appendColumn(columns, children, disabled,  _path, _getter, otherProps, index)
		})
		if(!disabled && (this.get('allowAddrow') || this.get('allowDelrow')))
			columns = insertOptionColumn(columns, this.props, this.get('allowAddrow'), this.get('allowDelrow'))

		return columns
	}

	handleRowDoubleClick(e, rowIndex){
		if(this.get('disabled'))
			this.props.onEvent('rowDoubleClick',  this.get('value').get(rowIndex))
	}

	
	render(){
		if(this.get('style.width') === 0 || this.get('style.height') ===0) return (<div></div>)

		return (
			<Table 
				className={this.props.prefixCls}
				rowsCount={this.get('value').size}
				rowHeight={this.get('rowHeight')}
				groupHeaderHeight={this.get('groupHeaderHeight')}
				headerHeight={this.get('headerHeight')}
				footerHeight={this.get('enableSum') ? 30: 0}
    			width={this.get('style').get('width') }
    			height={this.get('style').get('height') }
				onRowDoubleClick={this.get('disabled')?this.handleRowDoubleClick.bind(this):undefined}
				_path = {this.props._path}
				_getter = {this.props._getter}
    			>
    			{::this.getColumns()}
			 </Table>
		)
		
	}
} 

