import React,{ Component,PropTypes } from 'react'
import { Menu, Icon } from 'xComponent'
const SubMenu = Menu.SubMenu

export default class PortalLeftComponent extends Component {


	handleMenuClick(e){
		if(e.key === 'logout')
			this.props.onLogoutSucess()

		let getter = this.props.payload.getIn(['utils','getter']),
			menus = getter('portal.menus','value')

		let menu = this.findMenu(menus,e.key)
		this.props.addTab(menu.get('title'), menu.get('url'))
	}

	findMenu(menus, menuCode){
		let ret 

		for(let menu of menus){
			let code = menu.get('code'),
				subMenus = menu.get('subMenus')

			if(code === menuCode)
				ret = menu

			if(!ret && subMenus)
				ret = this.findMenu(subMenus, menuCode)

			if(ret ) return ret
		}

		return undefined
	}

	getSubMenus(menus){
		return menus.map((menu,index)=>{
			let code = menu.get('code'),
				title = menu.get('title'),
				url = menu.get('url'),
				subMenus = menu.get('subMenus')

			if(subMenus){
				return (<SubMenu key={code} title={<span><span>{title}</span></span>} > 	
					{::this.getSubMenus(subMenus)}
				</SubMenu>)
			}
			else {
				return (
					<Menu.Item key={code} >{title}</Menu.Item>
				)	
			}
		})
	}

	  render() {
	  	let {prefixCls, payload} = this.props,
	  		getter = payload.getIn(['utils','getter']),
	 		menus = getter('portal.menus','value')

 		let subMenus = this.getSubMenus(menus)

	    return (
	      <div className={`${prefixCls}-left`}>
	      	<Menu 
	      		theme='dark'
	      		mode="inline"
	      		
	      		onClick={::this.handleMenuClick}>
	      		{subMenus}
	      	</Menu>
	      </div>
	    )
	  }
}
/*defaultOpenKeys={menus.map(menu=>menu.get('code'))}*/