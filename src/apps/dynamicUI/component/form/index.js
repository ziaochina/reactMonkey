import React from 'react'
import { Form } from 'xComponent'

import DynamicComponent from '../../'


export default class FormComponent extends React.Component {
    static defaultProps = {
        prefixCls: 'z-form'
    }
    componentDidMount(){
        //this.offsetWidth = this.getWindowWidth()
        //this.offsetHeight = ReactDOM.findDOMNode(this).offsetHeight
        //let ddd =  ReactDOM.findDOMNode(this)
        //debugger
    }

    getChildComponents(){
        let { _getter, _path, prefixCls, className, ...otherProps } = this.props, 
    	    childrens = _getter(_path, 'childrens')

    	return childrens.map((children,index)=>{
    		return (
    			<DynamicComponent 
                    key={index} 
                    _meta={children} 
                    {...otherProps}  
                   _path={`${_path}.${children.get('name')}`}
                />
    		)
    	})
    }

    render() {
    	return(<div className={this.props.prefixCls}>{::this.getChildComponents()}</div>)
    }
}
