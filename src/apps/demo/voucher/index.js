import React from 'react'
import DynamicComponent from 'dynamicComponent'
import Voucher from '../../templates/voucher'

export default class VoucherDemoComponent extends Voucher {
    componentDidMount() {
        this.props.initView(this.props.appParams.id)
    }

	handleEvent(eventName, option){
    	if(eventName === 'exit'){
    		this.props.onDelTab(this.props.tab.get('url'))
    	}
    	else if(eventName === 'list'){
    		this.props.onAddTab('列表演示', 'apps/demo/list')
    	}
    	else{
    		this.props.onEvent(eventName, option)	
    	}
    	
    }

    render() {
        return (
        	<DynamicComponent {...this.props} _path="voucherDemo"  onEvent={::this.handleEvent} />
        )
    }
}

