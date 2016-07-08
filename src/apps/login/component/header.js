// React Component
import React,{ Component,PropTypes } from 'react'
import { Menu, Icon } from 'xComponent'
const Item = Menu.Item;
import logo from '../img/logo.png'


export default class LoginHeaderComponent extends Component {

  render() {
  	let {prefixCls} = this.props,
  		menu = '导航'

    return (
      <header className={`${prefixCls}-header`}>
      	<div className={`${prefixCls}-header-logo`}>
           <img height="33" src={logo} />
      	</div>
      	 <div className={`${prefixCls}-header-nav`} >
	        <Menu  mode="horizontal">
	          <Item key="a">{"注册"}</Item>
	          <Item key="b">{menu}</Item>
	          <Item key="c">{menu}</Item>
	          <Item key="d">{"帮助"} </Item>
	        </Menu>
      </div>
      </header>
    )
  }
}
