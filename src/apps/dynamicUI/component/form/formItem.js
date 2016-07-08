import React from 'react'
import classNames from 'classnames'
import { Form,Icon, Tooltip } from 'xComponent'
import DynamicComponent from '../../'

const FormItem = Form.Item

export default class FormItemComponent extends React.Component {
     static defaultProps = {
        prefixCls: 'z-formitem'
    }
    render() {
       if(!this.props.payload || !this.props.payload.get('utils') ) 
           return (<div></div>)

        let className = classNames({
             [this.props.prefixCls]: true,
             [this.props.className]: !!this.props.className,
        })

        let { _path, payload } = this.props,
            path = _path,
            utils = payload.get('utils'),
            getter = this.props._getter || utils.get('getter'),
            required = getter(path, 'required') || false,
            showLabel =(typeof getter(path, 'showLabel') === "undefined") ? true: false
            
    	return (
            <FormItem
                className={className}
                label={showLabel ? getter(_path, 'title') : ''} 
                required={required}>

                {this.props.children} 

                {this.renderError(getter, path)}
            </FormItem>

        )
    }

    renderError(getter, path){
        let validateResult = getter(path, 'validate.result')

        if(validateResult && validateResult.size > 0){
            let message = validateResult.toArray().join("")
            return( 
                <Tooltip title={message}><span className='has-error has-feedback' ></span></Tooltip>
            )

        }
        else
        {
            return(<div></div>)
        }
    }
}

/*
// <Icon type='user' />
     <Tooltip title='ddd'><span className='has-error has-feedback' >ddd</span></Tooltip>
<FormItem key={index} label={children.getIn(['fieldMeta','title'])}>
                <DynamicComponent key={index} _meta={children}  {...props}/>
            </FormItem>

              <div className="dynamic-page-form-header-item">
                <label className="dynamic-page-form-header-item-label">{meta.get('title')}</label>
                <DynamicComponent  {...this.props} _meta={meta.set()}/>
            </div>
 */
