import React from 'react'
import DynamicComponent from 'dynamicComponent'
import List from '../../templates/list'

export default class CardDemoComponent extends List {
    componentDidMount() {
        this.props.initView()
    }

    handleEvent(eventName, option){
        if(eventName === 'rowDoubleClick'){
            this.props.onAddTab('单据演示', `apps/demo/voucher?id=${option.get('id')}`)
        }
    	else if(eventName === 'exit'){
    		this.props.onDelTab(this.props.tab.get('url'))
    	}else{
    		this.props.onEvent(eventName, option)	
    	}
    	
    }

    render() {
        return (
        	<DynamicComponent {...this.props} _path="listDemo" onEvent={::this.handleEvent}/>
        )
    }
}

