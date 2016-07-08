import React, { Component } from 'react'
import defaultComponentFactory from './defaultComponentFactory'

function getComponent(fieldType, componentName, componentFactory) {
    let cf = componentFactory || defaultComponentFactory

    if (componentName) {
        return cf.getComponent(componentName)
    } else
        return cf.getDefaultComponent(fieldType)
} 

const DynamicComponent = (props) =>{
    let {payload, _path, _component, componentFactory} = props
    if(!payload|| !payload.get('utils') ) 
        return (<div></div>)

    let  getter = payload.getIn(['utils','getter']),
        pValues = getter(_path,['type', 'component']),
        fieldType = pValues.get( 'type'),
        componentName = _component || pValues.get('component')

    let Component = getComponent(fieldType, componentName, componentFactory)

     return (
        <Component key={_path} {...props} _getter={props._getter || getter} />
    )
}

const components = defaultComponentFactory.getComponents()

export default DynamicComponent

Object.assign(exports, {...components, ...exports})
