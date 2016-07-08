import React from 'react'
import { Form } from 'xComponent'
import DynamicComponent from '../../'
import FormItem from './formItem'


export default class FormItemsComponent extends React.Component {
   static defaultProps = {
        prefixCls: 'z-formitems'
    }
    getChildComponents(){
        let { _getter, _path,prefixCls, className, ...otherProps  } = this.props, 
            childrens = _getter(_path, 'childrens'),
            ret = []

    	childrens.forEach((children,index)=>{
            let path = `${_path}.${children.get('name')}`,
                visible = _getter(path, 'visible')
            if(visible == false) return
    		ret.push((
                <FormItem 
                    key={index} 
                    {...otherProps}
                    _path={path} >     
                    <DynamicComponent  {...otherProps} _path={path} />
                </FormItem>
    		))
    	})

        return ret
    }


    render() {
    	return(
            <div className={this.props.prefixCls}>
                {::this.getChildComponents()}
            </div>
        )
    }
}

/*
<FormItem key={index} label={children.getIn(['fieldMeta','title'])}>
                <DynamicComponent key={index} _meta={children}  {...props}/>
            </FormItem>
            <span key={index} style={{padding:8}}>
                    <label >{children.getIn(['fieldMeta','title'])}</label>
                    <DynamicComponent  _meta={children}  {...props}/>
                </span>
 */
