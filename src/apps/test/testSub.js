import React from 'react'

export default class TestSubComponent extends React.Component {
	componentWillUnmount(){
		debugger
	}

 componentWillReceiveProps(nextProps){
  debugger
  //alert()
 }

  render() {
    debugger
    return (
      <div className="welcome">
        <div>
          <h2>Sub{this.props.y}</h2>
        </div>
      </div>
    )
  }
}
