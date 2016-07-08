import React from 'react'
import {Table, Column, Cell} from 'fixed-data-table'
import Checkbox from '../checkbox'
import MyCell from './cell'
import OptionCell from './optionCell'
import OptionHeaderCell from './optionHeaderCell'
import TotalCell from './totalCell'
import DynamicComponent from '../../'
import { Checkbox as CB } from 'xComponent'

export function appendColumn(columns, meta, disabled, path, getter, props, index){
	let name = meta.get('name'), 
		width = meta.get('width'),
		headerComponent = meta.get('headerComponent') || 'ColumnHeaderCell',
		enableSum = meta.get('enableSum') || false

	disabled = disabled || meta.get('disabled')
	
	path = `${path}.${name}`

	columns.push((
		<Column 
			columnKey={name}
			key= {name} 
			width = {width}
			cell = {ps => (
				<MyCell
					key={name + props.rowIndex}
					{...props} 
					{...ps}
					_getter = {getter}
					_path = {path}
					disabled = {disabled}
					style={{width}}
				/>
	      	)}
			
			header = {
				<DynamicComponent 
					key={index}
					{...props}
					_path = {path}
					_component = {headerComponent}
				/>
			}
			footer={enableSum?(
				<TotalCell 
					key={name}
					columnKey={name}
					{...props} 
					_getter = {getter}
					_path = {path}
					disabled = {disabled}
					style={{width}}
				/>):undefined
			}
		/>
	))

	return columns
}

export function insertOptionColumn(columns, gridProps, allowAddrow, allowDelrow){
	columns.splice(0,0,(
		<Column 
			width={30}
			key= "_option" 
			fixed = {true}
			cell = {props => ( <OptionCell {...gridProps} {...props} allowAddrow={allowAddrow} allowDelrow={allowDelrow} /> )}
			header = {
				<OptionHeaderCell {...gridProps} allowAddrow={allowAddrow} allowDelrow={allowDelrow} />
			}
		/>
	))
	return columns
}

export function insertSequenceColumn(columns, gridProps){
	let {_path, _getter} = gridProps,
		enableSum = _getter(_path, 'enableSum')
	columns.splice(0,0,(
		<Column 
			key= "_sequence"
			width = {40}
			fixed = {true}
			cell = {props => (
	            <Cell>
	              {props.rowIndex + ''}
	            </Cell>
	      	)}
			header = {
				<Cell>序号</Cell>
			}

			footer = {enableSum?(
				<Cell>合计</Cell>):undefined
			}
		/>
	))
	return columns
}


export function insertSelectColumn(columns, path, children,getter, otherProps){
	let name = children.get('name'), 
		width = children.get('width')

	path = `${path}.${name}`
	let checked = getter(path,'isSelectAll')

	let handleSelectColumnHeaderChange = (e)=>{
		otherProps.onEvent('onGridSelectAll', {path, selected:e.target.checked})
	}

	columns.splice(0,0,(
		<Column 
			key= {name}
			columnKey={name}
			isSelectColumn={true}
			width = {width}
			fixed = {true}
			cell = {props => {
	           return (<Checkbox 	
	           		key={name}
					{...otherProps} 
					_getter = {getter}
					_path = {`${path},${props.rowIndex}`}
					style={{width}} />)
			}}
			header = {
				<Cell><CB checked={checked} onChange={handleSelectColumnHeaderChange}/></Cell>
			}
		/>
	))
	return columns
}








/*
cell = {
				<MyCell
					key={index+name }
					{...props} 
					_getter = {getter}
					_path = {path}
					disabled = {disabled}
					style={{width}}
				/>
			}
 */