import React from 'react'
import {Map} from 'immutable'
import { Form,DatePicker } from 'xComponent'
const FormItem = Form.Item
import Sub from './testSub'


export default class TestComponent extends React.Component {
  state ={ data: Map({a:1})  }
  handleClick(e){
      this.props.test()
      this.state.data = this.state.data.set('a', this.state.data.get('a') + 1)
  }

  shouldComponentUpdate(nextProps, nextState){
      return true
  }


  render() {

    return (
      <div>
      <Form inline>
        <FormItem inline  label="日期">
           <DatePicker style={{width:500}} />
        </FormItem>
      </Form>
    
      <Sub y={1}/>   
      <button onClick={::this.handleClick}>button</button>
      </div>
    )
  }
}
