import React from 'react'
import DynamicComponent from '../'
//import './styles/dynamicPage.less'

export default class DynamicPageComponent extends React.Component {
	
	static defaultProps = {
      	prefixCls: 'z-dynamicpage'
  	}

    getChildComponents(){
    	let getter = this.props.payload.getIn(['utils','getter']),
    		path = this.props._path,
    		childrens = getter(path, 'childrens'),
    		{prefixCls, className, _path, ...otherProps} = this.props

        return childrens.map((children,index)=>{ 
        	return (
            	<DynamicComponent 
            		key={index}  
            	 	{...otherProps}  
            	 	_path={`${path}.${children.get('name')}`}
            	/>
        	)
        })
    }

	render(){
		return (
			<div className={this.props.prefixCls}>
				{this.getChildComponents()}
			</div>
		)
	}
}