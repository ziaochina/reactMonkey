import React from 'react'
import {Map, List} from 'immutable'
import { Menu, Icon } from 'xComponent'
const SubMenu = Menu.SubMenu

export default class ToolbarComponent extends React.Component {
    state = {
        data : Map({
            value: null
        })
    }

    constructor(props){
        super(props)
        this.state = this.calculateState(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.calculateState(nextProps))
    }

    shouldComponentUpdate(nextProps, nextState){
        return !this.state.data.equals(nextState.data)
    }

    calculateState(props){
        let { data } = this.state,
            {_getter, _path} = props,
            value = _getter(_path,'value')

        //value = getter(path,'value') 

        data = data.set('value', value)

        return {data}
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    set(propertyName, value){
        let data = this.state.data
        return data.setIn(propertyName.split('.'),value)
    }


    handleClick(e){
        this.props.onEvent(e.key)
    }

    getSubMenus(menus){
        return menus.map((menu,index)=>{
            let code = menu.get('code'),
                title = menu.get('name'),
                subMenus = menu.get('subMenus')

            if(subMenus){
                return (<SubMenu key={code} title={<span><span>{title}</span></span>} >     
                    {::this.getSubMenus(subMenus)}
                </SubMenu>)
            }
            else {
                return (
                    <Menu.Item key={code}>{title}</Menu.Item>
                )   
            }
        })
    }


    render() {
    	return(
            <div>
                <Menu 
                    mode="horizontal" 
                    onClick={::this.handleClick}>
                    {::this.getSubMenus(this.get('value'))}
                </Menu>
            </div>
        )
    }
}
