// React Component
import React,{ Component,PropTypes } from 'react'
import DynamicComponent,  {FormItem} from 'dynamicComponent'
import { Input,Tabs, Button, Icon } from 'xComponent'
const TabPane = Tabs.TabPane

export default class LoginMainComponent extends Component {
	handleLoginClick(e){
		this.props.login((result)=>{
			if(result.result)
      			this.props.onLoginSuccess()
		})
	}
	
  	render() {
  		let {prefixCls, ...props} = this.props

    	return (
    	   <div className={`${prefixCls}-main`}>
    	   	<div className={`${prefixCls}-main-form`}>
	           <Tabs className={`${prefixCls}-main-tabs`}>
	        		<TabPane tab="登录" key="1">
	        			<div className={`${prefixCls}-main-tabs-form`}>
	        				<FormItem _path='login.user' {...props} >
	        					<DynamicComponent addonBefore="用户" _path='login.user' {...props} />
	        				</FormItem>
		        			<FormItem  _path='login.password' {...props}>
		          				<DynamicComponent  addonBefore="密码" _path='login.password' {...props} />
		          			</FormItem>
		          			<Button type="primary" className={`${prefixCls}-main-tabs-form-btn`} onClick={::this.handleLoginClick}>登录</Button>
	          			</div>
	        		</TabPane>

	      		</Tabs>
      		</div>
      		</div>
    	)
  	}
}
