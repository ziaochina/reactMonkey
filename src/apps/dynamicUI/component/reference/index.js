import React, { Component } from 'react'
import {Map} from 'immutable'
import { Input, Select, Button, Icon,Popover } from 'xComponent'
import Trigger from 'rc-trigger'
import classNames from 'classnames'
import DropTable from './dropTable'


const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

const targetOffset = [0, 0];

export const placements = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  leftTop: {
    points: ['tr', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -4],
    targetOffset,
  },
  rightTop: {
    points: ['tl', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  rightBottom: {
    points: ['bl', 'br'],
    overflow: autoAdjustOverflow,
    offset: [4, 0],
    targetOffset,
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 4],
    targetOffset,
  },
  leftBottom: {
    points: ['br', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [-4, 0],
    targetOffset,
  },
};





export default class ReferenceComponent extends Component {
    static defaultProps = {
        prefixCls: 'z-reference'
    }

    state = {
      data : Map({
        path: '',
        value:{},
        isFocus: false,
        dropVisible:false,
        dropDataSourceFetchMode: 0, //0:只从元数据取，1:只获取一次，2：每次焦点进入都获取 默认0
        dropDataSource:{},
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
      pValus = _getter(_path, ['value', 'isFocus', 'dropDataSourceFetchMode', 'displayMember', 'valueMember', 'width']),
      value = pValus.get('value') ,
      isFocus =  _isFocus || pValus.get('isFocus') || false,
      dropDataSourceFetchMode = pValus.get('dropDataSourceFetchMode'),
      dropDataSource = _getter(_path, 'dropDataSource'),
      displayMember = pValus.get( 'displayMember') || 'name',
      valueMember = pValus.get( 'valueMember') || 'code',
      width = pValus.get('width')
    
    if(!style && width){
      style = {width}
    }

    this.oldValue = value

    data = this.set(null, {path:_path, value, isFocus, dropDataSourceFetchMode, dropDataSource,displayMember,valueMember, style})
    return {data}
  }

  lazyLoadDropDataSource(){
    let dropDataSourceFetchMode = this.get('dropDataSourceFetchMode')
    
    if(dropDataSourceFetchMode === 0) return

    if(dropDataSourceFetchMode === 1 && this.get('dropDataSource'))
      return

    this.props.lazyLoad(this.get('path'), 'dropDataSource', {fetchMode:dropDataSourceFetchMode})
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

    handleSelected(value){
      let data = this.set('dropVisible', false).set('value', value)
      this.setState({data})
      
      let valueMember = this.get('valueMember')
      if(!this.props.onFieldChange)
        return

      if( (!!this.oldValue !== !!value) ||
        (this.oldValue.get(valueMember) !== value.get(valueMember)))
        setTimeout( ()=>this.props.onFieldChange(this.get('path'), this.oldValue, value), 0)
    }

    getOverlay(){
      let dataSource = this.get('dropDataSource')
      return (
        <DropTable dataSource={dataSource} onSelected={::this.handleSelected} />
      )
    }

    handleDropVisibleChange(visible){
      
      let data = this.set('dropVisible', visible)
      this.setState({data})

      if(visible){
        if(!this.get('isFocus')){
          setTimeout( ()=>{ 
            this.props.onFieldFocus(this.get('path'))
            this.lazyLoadDropDataSource()
          }, 0)
        }
        else{
          setTimeout( ()=>{ 
             this.lazyLoadDropDataSource()
          }, 0)
        }
      }
    }

    render() {
        const btnCls = classNames({
          'ant-search-btn': true,
           [this.props.prefixCls + '-button']:true
        });
        const searchCls = classNames({
          'ant-search-input': true,
          [this.props.prefixCls + '-inputgroup']:true
        });

        let value = this.get('value'),
            displayMember = this.get('displayMember')
        let displayText = value ? value.get(displayMember) : ''

      return (
        <Popover 
          ref='main' 
          overlayClassName={`${this.props.prefixCls}-popover`}
          visible={this.get('dropVisible')} 
          content={::this.getOverlay()} 
          trigger="click" 
          placement="bottomLeft"
          builtinPlacements={placements}
          onVisibleChange={::this.handleDropVisibleChange}>

          <span className={this.props.prefixCls} style={this.get('style') && this.get('style').toJS()}>
            <Input.Group className={searchCls} style={this.get('style') && this.get('style').toJS()}>
              <Input value={ displayText }>
              </Input>
               <Button className={btnCls}>
                  <Icon type="search" />
                </Button>
            </Input.Group>
          </span>
      </Popover>
      );
        
    }
}

/*
 //<div className="ant-input-group-wrap">
              
              </div>

  <div>
           
           <Trigger style={{marginTop:30,zIndex:1}}
                popupPlacement="bottomLeft"
                action={['click']}
                hideAction ={['blur']}
                builtinPlacements={builtinPlacements}
                popup={<DropDownTable />}>
                <div ref='a' style={{width:150,height:0,backgroud:333}} ></div>
            </Trigger>
          </div>
<div style={{width:100,display:'inline-block'}}>
        <Trigger style={{marginTop:8}}
          popupPlacement="bottomLeft"
          action={['click']}
          builtinPlacements={builtinPlacements}
          popup={<DropDownTable />}>
         
            <Input.Group className={searchCls}>
              <Input />
              
               <div className="ant-input-group-wrap">
                <Button className={btnCls} >
                <Icon type="search" />
                </Button>
              </div>
              </Input.Group>
         
        </Trigger>
       
      </div>
 <Trigger
            popupPlacement="bottom"
            action={['hover']}
            builtinPlacements={builtinPlacements}
            popup={<div style={{ border: '1px solid red', padding: 10 }}>i am a hover popup</div>}
          >*/