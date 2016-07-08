import React from 'react'
import ReactDOM from 'react-dom'
import {Map} from 'immutable'
import {Tabs} from 'xComponent'
import DynamicComponent from '../'

const TabPane = Tabs.TabPane

export default class TabsComponent extends React.Component {
     static defaultProps = {
        prefixCls: 'z-tabs'
    }
    state ={
        data:Map({
            offsetHeight:0,
            offsetWidth:0
        })
    }

    constructor(props){
        super(props)
        this.onResize = this.onResize.bind(this)
        this.update = this.update.bind(this)
    }

    get(propertyName) {
        if (!propertyName || propertyName === '') {
            return this.state.data
        }
        return this.state.data.getIn(propertyName.split('.'))
    }

    set(propertyName, value) {
        let data = this.state.data
        if (!propertyName || propertyName === '') {
            return data.mergeDeep(value)
        }
        if(typeof value === 'object'){
            return data.mergeDeepIn(propertyName.split('.'), value) 
        }
        else{
            return data.setIn(propertyName.split('.'), value)           
        }
    }

    componentDidMount() {
        this.update()
        var win = window
        if (win.addEventListener) {
            win.addEventListener('resize', this.onResize, false)
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this.onResize)
        } else {
            win.onresize = this.onResize
        }
    }

    componentWillUnmount(){
        var win = window
        if (win.removeEventListener) {
            win.removeEventListener('resize', this.onResize, false)
        } else if (win.detachEvent) {
            win.detachEvent('onresize', this.onResize)
        } else {
            win.onresize = undefined
        }
    }

    onResize() {
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this.update, 16)
    }

    update() {
        let dom = ReactDOM.findDOMNode(this),
            height = dom.offsetHeight - 40 > window.innerHeight ? 0 :dom.offsetHeight - 40
        //todo
        this.setState({data:this.set(null,{offsetHeight:height , offsetWidth:dom.offsetWidth})})
    }

    getChildComponents(){
        let { _getter, _path, prefixCls, className, ...otherProps } = this.props, 
            childrens = _getter(_path, 'childrens'),
            notAutoFill = _getter(_path, 'notAutoFill'),
            style
        if(!notAutoFill){
             style={height:this.get('offsetHeight'), width:this.get('offsetWidth')}
        }


    	return childrens.map((children,index)=>{
            
            let childPath = `${_path}.${children.get('name')}`

            return(
                <TabPane key={index} tab={_getter(childPath, 'title')}>
                    <DynamicComponent 
                        key={index} 
                        {...otherProps} 
                         _getter={this.props._getter || getter}
                         _path = {childPath}
                         style={style}
                    />
                </TabPane>
            )
        })
    }

    render() {
    	return(
            <div className={this.props.prefixCls}>
                 <Tabs type="card" size="small">
                    {::this.getChildComponents()}
                 </Tabs>
             </div>
        )
    }
}
/*
 <DynamicComponent 
                    key={index} 
                    _meta={children} 
                    {...props} 
                    _height={this.get('offsetHeight')}
                    _width={this.get('offsetWidth')}  />
 */