import React from 'react'
import { render } from 'react-dom'
import Perf from 'react-addons-perf'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Map } from 'immutable'
import promise from 'es6-promise'
import logger from 'redux-logger'
import { AppLoader, appMiddleware, reducer } from 'appLoader'
import { fetchWrapper } from './utils'
import apps from './apps'
import './assets/styles/index.less'


const middleware = [appMiddleware(apps, {...fetchWrapper }, {})]

const store = createStore(reducer, Map(), applyMiddleware(...middleware))

promise.polyfill()

render(
	<Provider store ={store}>
		<AppLoader path='apps/root' />
	</Provider>,
	document.getElementById('app')
)
