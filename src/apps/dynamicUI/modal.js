import React,{ Component,PropTypes } from 'react'
import { Modal } from 'xComponent'
import { AppLoader } from 'appLoader'



function getApp(content) {
    if (content.indexOf('app:') !== -1) {
        let appPath = content.replace('app:', '')
        return ( <AppLoader path = { appPath } />)
        }
        return null
}

export function modal(message){

	if (message ){
        let onOk = message.get('onOk'),
            onCancel = message.get('onCancel'),
            type = message.get('type'),
            title = message.get('title'),
            content = message.get('content'),
            app = getApp(content)


        if(app){
           
            let params = {title, onOk}
            if(onCancel)
                params.onCancel = onCancel
            return (
                <Modal
                    visible
                    title={title}
                    onOk={()=>{
                        if(onOk){
                            //this.refs["apps/demo/list"].getWrappedInstance().refs.connector.getWrappedInstance().props.getReturnValue()
                            onOk()
                        }
                    }}
                    onCancel={()=>{
                        if(onCancel)
                            onCancel()
                    }}
                    {...params}>
                    {app}
                </Modal>
            )
        }

        if(type === 'error') {

            Modal.error({
                ...message.toJS(),
                onOk: function() {
                	if(onOk)
                    	onOk()
                }
            })
        }

        else if(type === 'confirm'){
              Modal.confirm({
                ...message.toJS(),
                onOk: function() {
                    if(onOk){
                        onOk()
                    }
                  
                },
                onCancel:function(){
                  if(onCancel)
                     onCancel()
                }
            })
        }

        else if(type === 'success'){
            Modal.success({
                ...message.toJS(),
                onOk: function() {
                    if(onOk)
                        onOk()
                }
            })
        }
        
        else if(type === 'warning'){
             Modal.warning({
                ...message.toJS(),
                onOk: function() {
                    if(onOk)
                        onOk()
                }
            })
        }

        else{
             Modal.info({
                ...message.toJS(),
                onOk: function() {
                    if(onOk)
                        onOk()
                }
            })
        }

    }
}
/*
export default class MessageModalComponent extends React.Component {
    render() {
    	
	   	if(!this.props.payload || !this.props.payload.get('utils') ) 
           return (<div></div>)

        let { payload, onOk } = this.props,
            getter = payload.getIn(['utils', 'getter']),
            handleErrorModalOK = this.handleErrorModalOK,
            message = getter('global', 'message')

        if (message) {
            Modal.error({
                ...message.toJS(),
                onOk: function() {
                	if(onOk)
                    	onOk()
                }
            })
        }

        return (<div></div>)

    }
}
*/