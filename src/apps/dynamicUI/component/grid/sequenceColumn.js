import React from 'react'
import {Table, Column, Cell} from 'fixed-data-table'

export function appendSequenceColumn(columns, gridProps){
	columns.splice(0,0,(
		<Column 
			key= "sequence"
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
			footer = {
				<Cell>合计</Cell>
			}
		/>
	))
	return columns
}

