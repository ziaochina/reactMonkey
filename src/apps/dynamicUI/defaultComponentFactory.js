import React from 'react'
import * as xc from 'xComponent'
import componentFactory from './componentFactory'

import Input from './component/input'
import Password from './component/password'
import InputNumber from './component/inputNumber'
import Checkbox from './component/checkbox'
import DatePicker from './component/datePicker'
import Select from './component/select'
import Grid from './component/grid'
import Tabs from './component/tabs'
import FormItems from './component/form/formItems'
import FormItem from './component/form/formItem'
import Form from './component/form'
import Toolbar from './component/toolbar'
import DynamicPage from './component/dynamicPage'
import Reference from './component/reference'
import ColumnHeader from './component/grid/columnHeaderCell'
import DisplayCell from './component/grid/displayCell'
import Cell from './component/grid/cell'
import {modal} from './modal'

const { TimePicker, Radio } = xc

componentFactory.registerComponents({
    'Input': Input,
    'Password': Password,
    'InputNumber': InputNumber,
    'TimePicker': TimePicker,
    'Select': Select,
    'Radio': Radio,
    'Checkbox': Checkbox,
    'Grid': Grid,
    'Tabs':Tabs,
    'Form': Form,
    'FormItems': FormItems,
    'FormItem': FormItem,
    'Toolbar': Toolbar,
    'DatePicker': DatePicker,
    'DynamicPage':DynamicPage,
    'Reference':Reference,
    'ColumnHeaderCell': ColumnHeader,
    'DisplayCell': DisplayCell,
    'Cell': Cell,
    'Modal': modal
})

componentFactory.setDefaultComponents({
    'string': 'Input',
    'int': 'InputNumber',
    'float': 'InputNumber',
    'bool': 'Checkbox',
    'date': 'DatePicker',
    'time': 'TimePicker',
    'array': 'Grid'
})


export default componentFactory
