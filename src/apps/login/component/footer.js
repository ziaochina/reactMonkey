// React Component
import React,{ Component,PropTypes } from 'react'


export default class LoginFooterComponent extends Component {

  render() {
  	let {prefixCls} = this.props,
  		text = 'Copyright © 2016 The Project by <a href="#">company</a>. All Rights Reserved'
    return (
      <footer className={`${prefixCls}-footer`}>
          <div>
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </div>
      </footer>
    )
  }
}
