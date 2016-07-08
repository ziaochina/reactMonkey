import React from 'react'
import Immutable, {Map} from 'immutable'
import {Table, Column, Cell} from 'fixed-data-table'
import DynamicComponent from '../../'

export default class CellComponent extends React.Component{

  state = {
      data : Map({
          meta:Map(),
          path:'',
          value:undefined,
          isFocus:false,
          disabled:false,
          style: Map()
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
      if(nextState.data.get("isFocus"))
          return true
      return !this.state.data.equals(nextState.data) 
  }

  calculateState(props){
      let { _path, _getter, disabled,  rowIndex, style } = props,
          path = `${_path},${rowIndex}`,
          pValus = _getter(path, ['', 'isFocus', 'value', 'disabled']),
          meta = pValus.get(''),
          isFocus = pValus.get('isFocus'),
          value = pValus.get('value')
      
      disabled = disabled || pValus.get('disabled') || false

      let data = this.set(null,{path, meta, value, isFocus, disabled, style })
      return {data}
  }


  get(propertyName) {
      if (!propertyName || propertyName === '') {
        return this.state.data
      }
      return this.state.data.getIn(propertyName.split('.'))
  }

  set(propertyName, value) {
      if (!propertyName || propertyName === '') {
          return Immutable.fromJS(value)
      }
      
      let data = this.state.data
      if(typeof value === 'object'){
          return data.mergeIn(propertyName.split('.'), value) 
      }
      else{
          return data.setIn(propertyName.split('.'), value)     
      }
  }

  handleFieldFocus(path){
      let data = this.set('isFocus', true)
      this.setState({data})
      setTimeout( ()=>this.props.onFieldFocus(path), 0)
  }


  render(){
      let { _path, _getter, rowIndex } = this.props,
          path = `${_path},${rowIndex}`,
          isFocus = this.get('isFocus'),
          disabled = this.get('disabled')

      if(disabled)
          return this.renderDisplay(path)

      if(isFocus)
          return this.renderEdit(path)

      return this.renderDisplay(path)
  }

  renderEdit(path){
    return (
       <DynamicComponent
              {...this.props}
              _path = {path} 
              _isFocus={true}
        />
    )
  }

  renderDisplay(path){
    return (
      <DynamicComponent
            {...this.props}
            _path = {path}
            _component="DisplayCell"
            onFieldFocus = {::this.handleFieldFocus}
        />
      )
  }
}

/*
  renderDisplay(path){
    return (
      <DynamicComponent
            {...this.props}
            _path = {path}
            _component="DisplayCell"
            onFieldFocus = {::this.handleFieldFocus}
        />
      )
  }
 */