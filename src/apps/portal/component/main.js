import React,{ Component,PropTypes } from 'react'
import { Tabs,Icon } from 'xComponent';
import { AppLoader } from 'appLoader'
const TabPane = Tabs.TabPane;

export default class PortalMainComponent extends Component {
	handleEdit(targetKey, action){
		if(!targetKey || !action) return
		if(action === "remove")
			this.props.delTab(targetKey)

	}

	handleChange(activeKey){
		if(!activeKey) return
		this.props.selectTab(activeKey)
	}

	getTabPanes(tabs){
		return tabs.map((tab,index)=>{
			return (
				<TabPane key={tab.get('url')} tab={tab.get('title')}>
					{::this.getPaneContent(tab)}
				</TabPane>
			)
		})
	}

	getPaneContent(tab){
		let url = tab.get('url')
		if(!url)
			return <div></div>

		if(url.indexOf('http://') !== -1){
			return(
				<iframe className="iframe" src={url} />
			)
		}

		if(url.indexOf('iframe://') !== -1){
			return(
				<iframe className="iframe" src={url.replace('iframe://','')} />
			)
		}

		if(url.indexOf('apps') !== -1){
			return(
				<AppLoader 
					ref={url}
					key={url} 
					path={url} 
					onAddTab={this.props.addTab} 
					onDelTab={this.props.delTab}
					tab={tab} />
			)
		}

	}

  	render(){
  		let {prefixCls, payload} = this.props,
  			getter = payload.getIn(['utils','getter']),
			tabs = getter('portal.tabs', 'value'),
			currentTab = getter('portal.currentTab', 'value'),
			activeKey = currentTab?currentTab.get('url'):undefined,
  			tabPanes = this.getTabPanes(tabs)

  		return (
  			<div className={`${prefixCls}-main`}>
  				 <Tabs type='editable-card' 
  				 	onEdit={::this.handleEdit}
  				 	activeKey={activeKey}
  				 	onChange={::this.handleChange}>
  				 	{tabPanes}
  				 </Tabs>
  			</div>
  		)
  	}
}

/*
//{tabPanes}
 
render() {
  	let {prefixCls} = this.props
    return (
      <div className={`${prefixCls}-main`}>
          <Tabs type='editable-card'>
   			<TabPane tab="选项卡" key="1">
   				<iframe className="iframe" src="http://www.bings.com" />
   			</TabPane>
   			<TabPane tab="选项卡" key="2">
   			<div className="iframe">fsdfwefwe</div>
   			</TabPane>
   			<TabPane tab="选项卡" key="3">
   				<iframe className='iframe' src="http://www.baidu.com" />
   			</TabPane>
   			<TabPane tab="选项卡" key="4">选项卡一内容</TabPane>
          </Tabs>
      </div>
    )
  }
 */
