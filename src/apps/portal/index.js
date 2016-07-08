import React from 'react'
import {List, Map} from 'immutable'
import Header from './component/header'
import Left from './component/left'
import Main from './component/main'
import styles from "./portal.less"



export default class PortalComponent extends React.Component{

	static defaultProps = {
      	prefixCls: 'portal'
  	}

  	constructor(props){
  		super(props)
  	}

    componentDidMount() {
    	this.props.initView()
    }

	handleMenuClick(name, href){
		//this.refs.tab.getWrappedInstance().refs.connector.getWrappedInstance().props.addTab(name, href)
	    if(href=="apps/logout"){
	      this.props.onLogoutSucess()
	      return
	    }
		this.props.addTab(name, href)
	}

	handleSelectTab(name, href){
		this.props.selectTab(href)
	}

	handleCloseTab(name, href){
		this.props.removeTab(href)
	}

	render(){
		if(!this.props.payload || !this.props.payload.get('utils') ) 
           return (<div></div>)

		return (
			<div className={this.props.prefixCls}>
				<Header  {...this.props}/>
	        	<main>
	           		<Left  {...this.props}/>
	           		<Main  {...this.props}/>
	        	</main>
        	</div>
		)
	}
}
