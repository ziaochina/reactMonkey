import React,{ Component,PropTypes } from 'react'
import {Carousel} from 'xComponent';

export default class BannerComponent extends Component {

  render() {
  	let {prefixCls} = this.props
  		
    return (
      <div className={`${prefixCls}-banner`}>
     
        <Carousel effect="fade">
            <div className={`$${prefixCls}-banner-bg`} 
            style={{backgroundImage:'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)'}}><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
       
      </div>
    )
  }
}
/*
     <Carousel effect="fade">
            <div className={`$${prefixCls}-banner-bg`} 
            style={{backgroundImage:'url(https://os.alipayobjects.com/rmsportal/IhCNTqPpLeTNnwr.jpg)'}}><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
 */