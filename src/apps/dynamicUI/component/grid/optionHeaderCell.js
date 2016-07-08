import React from 'react'
import {Map} from 'immutable'
import {Table, Column, Cell,ColumnGroup} from 'fixed-data-table'
import { Checkbox, Popover, Button } from 'xComponent'

export default class OptionHeaderCellComponent extends React.Component {
	 state = {
  		popoverVisible: false
  	}

  	handleAddRow(){
  		this.setState({popoverVisible:false})
  		this.props.onEvent('onAddRow', {path:this.props._path})
  	}

    handleAddTenRow(){
      this.setState({popoverVisible:false})
      this.props.onEvent('onAddTenRow', {path:this.props._path})
    }


  	handleDelAllRow(){
  		this.setState({popoverVisible:false})
  		this.props.onEvent('onDelAllRow', {path:this.props._path })
  	}

    handleSelectedRow(){
      this.setState({popoverVisible:false})
      this.props.onEvent('onDelSelectedRow', {path:this.props._path })
    }


  	handlePopoverVisibleChange(visible){
      	this.setState({popoverVisible:visible})
    }

  	getOverlay(gridProps){
  		return (
  			<div>
  				<Button onClick={::this.handleAddRow}>增行</Button>
          <Button onClick={::this.handleAddTenRow}>增10行</Button>
  				<Button onClick={::this.handleDelAllRow}>删除所有行</Button>
  				<Button onClick={::this.handleSelectedRow}>删除选中行</Button>
  				
  			</div>
  		)
  	}


  	render(){
  		return (
  			 <Cell className={`${this.props.prefixCls}-optioncolumn-cell`}>
	             	<Popover 
	             		title="" 
	             		content={::this.getOverlay()} 
	             		placement="rightTop" 
	             		trigger="click"
	             		visible={this.state.popoverVisible}
	             		onVisibleChange={::this.handlePopoverVisibleChange}>
							<Button></Button>
					</Popover>
            </Cell>
  		)
  	}

}





