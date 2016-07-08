import React from 'react'
import {AppLoader} from '../../appLoader'

export default class RootComponent extends React.Component{

	constructor(props){
		super(props)
		
		if(sessionStorage["root/logined"]=="1"){
			this.handleLoginSuccess();
		}
	}

	handleLoginSuccess(){
		//Action Export的方法已经被注入到component,可以this.props.action(…args)直接调用
		this.props.auth(true) 
		sessionStorage["root/logined"] = "1";
	}

	handleLogoutSucess(){
		this.props.auth(false)
		sessionStorage["root/logined"] = "0";
	}

	handleRedirect(appPath){

		this.props.setCurrentAppPath(appPath)
	}

	render(){
		//App按path隔离的state在this.props.payload中获取
		let currentAppPath = this.props.payload.get('currentAppPath') || 'apps/login'
		return (
			<AppLoader
				ref={currentAppPath}
			 	path={currentAppPath}
				onLogoutSucess = {::this.handleLogoutSucess } 
				onLoginSuccess= {::this.handleLoginSuccess } 
				onRedirect={::this.handleRedirect}
			/>
		)
	}
}
