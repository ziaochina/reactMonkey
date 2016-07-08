import React, { Component } from 'react'

import {Table, Column, Cell} from 'fixed-data-table'

export default class DropTableComponent extends React.Component{
	constructor(props){
    	super(props)
    }

    getColumns(columns, data){
     
        return columns.map((column, index)=>{
            return (
                <Column 
                    key="index" 
                    header={(<Cell>{column.get('title')}</Cell>)}
                    cell={props => (
                        <Cell {...props}>
                            {data.getIn([props.rowIndex,column.get('name')])}
                        </Cell>
                    )}
                    width={100}
                />
            )
        })
    }

    handleRowClick(e, rowIndex){
        this.props.onSelected(this.props.dataSource.getIn(['data', rowIndex]))
    }

	render(){
        if(!this.props.dataSource) return (<div></div>)
        let dataSource = this.props.dataSource,
            columns = dataSource.get('columns'),
            data = dataSource.get('data'),
            rowHeight = dataSource.get('rowHeight') || 30 ,
            headerHeight = dataSource.get('headerHeight') || 30 ,
            height = dataSource.get('height') || 200 ,
            width = dataSource.get('width') || 300 

        return (
			<Table 
                rowsCount={data.size}
				rowHeight={rowHeight}
                headerHeight={headerHeight}
    			height={height}
    			width={width}
                onRowClick={::this.handleRowClick}>
    		    {::this.getColumns(columns, data)}
			 </Table>
		)
	}
}