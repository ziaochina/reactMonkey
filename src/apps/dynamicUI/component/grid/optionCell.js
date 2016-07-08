import React from 'react'
import {Map} from 'immutable'
import {Table, Column, Cell,ColumnGroup} from 'fixed-data-table'
import { Checkbox, Popover, Button } from 'xComponent'

export default class OptionCellComponent extends React.Component {
	 state = {
  		popoverVisible: false
  	}

  	handleAddRow(){
  		this.setState({popoverVisible:false})
  		this.props.onEvent('onAddRow', {path:this.props._path})
  	}

  	handleDelRow(){
  		this.setState({popoverVisible:false})
  		this.props.onEvent('onDelRow', {path:this.props._path + ',' + this.props.rowIndex})
  	}

  	handleInsertRow(){
  		this.setState({popoverVisible:false})
  		this.props.onEvent('onInsertRow', {path:this.props._path + ',' + this.props.rowIndex})
  	}

  	handleDownInsertRow(){
  		this.setState({popoverVisible:false})
  		this.props.onEvent('onInsertRow', {path:this.props._path + ',' + (this.props.rowIndex+1)})
  	}

  	handlePopoverVisibleChange(visible){
      	this.setState({popoverVisible:visible})
    }

  	getOverlay(gridProps){
  		return (
  			<div>
  				<Button onClick={::this.handleAddRow}>增行</Button>
  				<Button onClick={::this.handleDelRow}>删行</Button>
  				<Button onClick={::this.handleInsertRow}>上方插入行</Button>
  				<Button onClick={::this.handleDownInsertRow}>下方插入行</Button>
  			</div>
  		)
  	}


  	render(){
  		return (
  			 <div className={`${this.props.prefixCls}-optioncolumn-cell`}>
           	<Popover 
	             		title="" 
	             		content={::this.getOverlay()} 
	             		placement="rightTop" 
	             		trigger="click"
	             		visible={this.state.popoverVisible}
	             		onVisibleChange={::this.handlePopoverVisibleChange}>
							   <Button />
					   </Popover>
          </div>
  		)
  	}

}





