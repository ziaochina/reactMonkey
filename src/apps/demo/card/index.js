import React from 'react'
import DynamicComponent from 'dynamicComponent'
import Voucher from '../../templates/voucher'

export default class CardDemoComponent extends Voucher {
    componentDidMount() {
        this.props.initView() //调用action的initView函数，初始化视图
    }

	handleEvent(eventName, option){
    	if(eventName === 'exit'){
    		this.props.onDelTab(this.props.tab.get('url'))
    	}else{
    		this.props.onEvent(eventName, option)	
    	}
    }

    render() {
        return (
        	<DynamicComponent 
                {...this.props}   //将所有属性传递给下层component
                _path="cardDemo"  //指定元数据path 
                onEvent={::this.handleEvent} //定义事件绑定函数
            /> 
        )
    }
}

