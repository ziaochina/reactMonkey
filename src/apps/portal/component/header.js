// React Component
import React,{ Component,PropTypes } from 'react'
import { Menu, Icon } from 'xComponent'
const SubMenu = Menu.SubMenu
const Item = Menu.Item
import logo from '../img/logo.png'
import defaultUser from '../img/defaultUser.png'

export default class PortalHeaderComponent extends Component {

	handleMenuClick(e){
		if(e.key === 'logout')
			this.props.onLogoutSucess()
	}

  render() {
  	let {prefixCls} = this.props,
  		menu = '导航'


    return (
      <header className={`${prefixCls}-header`}>
      	<div className={`${prefixCls}-header-logo`}>
           <img height="33" src={logo} />
      	</div>
      	 <div className={`${prefixCls}-header-nav`} >
	        <Menu  
	        	mode="horizontal"
	        	onClick={::this.handleMenuClick}>
	          <Item key="a">{menu}</Item>
	          <Item key="b">{menu}</Item>
	          <Item key="c">{menu}</Item>
	          <SubMenu title={<span><img height="25" src={defaultUser} style={{marginRight:8}} />某某某</span>}>
	          	<Item key="logout">注销</Item>
	          	<Menu.Divider />
	          	<Item key="user">个人中心</Item>
	          	<Menu.Divider />
	          	<Item key="about">关于</Item>
	          	<Item key="help">帮助</Item>
	          </SubMenu>
	        </Menu>
      </div>
      </header>
    )
  }
}
