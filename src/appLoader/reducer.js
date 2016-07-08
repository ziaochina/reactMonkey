import { Map } from 'immutable'
import wrapMapStateToProps from './wrapMapStateToProps'
import wrapMapDispatchToProps from './wrapMapDispatchToProps'
import createReduxConnector from './createReduxConnector'

export default function(state = Map(), { type, payload }) {
    switch (type) {
        case "@@loadAppReal":
            return loadApp(state, payload)
        case "@@reduce":
            return reduce(state, payload)
        default:
            return state
    }
}

function loadApp(state, { path, component = {}, action = {}, reducer = {} }) {
    let p = path.split('?'),
        source = path
    path = p[0]
    let query = p[1] || ''
    if(!state.has(path)){
        state = state.set(path, Map())
        state = state.setIn([path, '@@require'], Map({ component, action, reducer }))
    }
    
    if (!state.getIn([path, '@@require', source])) {
        let container = createReduxConnector(component,
            wrapMapStateToProps(source),
            wrapMapDispatchToProps(source, action, reducer),
            null, {
                withRef: true,
                pure: true
            }
        )

        state = state.setIn([path, '@@require', source], container)
    }

    if (query !== '' && !state.get(path).has(query)) {
           state = state.update(path, x => x.set(query, Map()))
    }

    return state
}


function reduce(state, { reducer, type, payload, path, query, injectFunsForReducer }) {
    let oldState = query !== '' ? state.getIn([path, query]) : state.get(path)
    let newState = reducer[type].apply(this, [oldState].concat(payload))
    if(typeof newState === "function" ){
        newState = newState(injectFunsForReducer)
    }
    return query !== '' ? state.setIn([path, query], newState) : state.set(path, newState)
}