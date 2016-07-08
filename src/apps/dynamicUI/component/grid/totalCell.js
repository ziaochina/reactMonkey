import React from 'react'
import Immutable, {Map} from 'immutable'
import {Table, Column, Cell} from 'fixed-data-table'
import DynamicComponent from '../../'

export default class TotalCellComponent extends React.Component{
  constructor(props){
      super(props)
  }


  render(){
      let {_path, _getter} = this.props,
        total = _getter(_path, 'totalValue')
      return (<Cell>{total}</Cell>)
  }


}
