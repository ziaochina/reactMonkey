import { Map, List } from 'immutable'
import {existsParamsInPath, parsePath, calcBindField, match} from './util/path'

export function getter(state, path, propertys) {
    if (!path)
        return undefined

    let parsedPath = parsePath(path),
        vars = parsedPath.vars,
        sourcePath = path,
        meta, value, bindField

    path = state.getIn(['parsedMeta', parsedPath.path])

    let getMeta = () => {
        if (meta)
            return meta

        meta = state.getIn(path.split('.'))
        bindField = meta.get('bindField')
        if (vars) {
            bindField = calcBindField(bindField, parsedPath)
            meta = meta.merge(state.getIn((`data_runtime.${bindField}_runtime`).split('.')))
        }
        return meta
    }

    let getBindField = () => {
        if (bindField)
            return bindField
        getMeta(path)
        return bindField
    }

    let getPropertyValue = (property) => {
        if (!property)
            return getMeta()

        if (property === 'isFocus')
            return state.getIn(['meta_runtime', 'focusField']) === sourcePath

        if(property === 'isFocusZone'){
            //debugger
           let focusField = state.getIn(['meta_runtime', 'focusField']),
                oldFocusField = state.getIn(['meta_runtime', 'oldFocusField']),
                parsedFocusField = parsePath(focusField),
                parsedOldFocusField = parsePath(oldFocusField)
            
            if( parsedPath && parsedFocusField && parsedPath.vars &&
                parsedFocusField.vars &&
                 parsedPath.vars[0] === parsedFocusField.vars[0]
                &&  parsedFocusField.path.lastIndexOf(parsedPath.path) != -1){
                return true
            }

             if(parsedPath && parsedOldFocusField && parsedPath.vars &&
                parsedOldFocusField.vars &&
                parsedPath.vars[0] === parsedOldFocusField.vars[0] &&
                 parsedOldFocusField.path.lastIndexOf(parsedPath.path) != -1){
                return true
            }
            return false

        }

        if (property === 'bindField')
            return getBindField()

        if (property === 'value') {
            return state.getIn((`data_runtime.${getBindField()}`).split('.'))
        }

        if (property === 'emptyRow') {
            return state.getIn(['config', 'emptyRow', parsedPath.path])
        }

        if (property === 'isSelectAll') {
            let bindField = getBindField(),
                sgs = (`data_runtime.${bindField}`).split('.'),
                itemsPath = sgs.slice(0, sgs.length - 2),
                field = sgs[sgs.length - 1],
                items = state.getIn(itemsPath),
                i = items.findIndex(v => !v.get(field))
            return i === -1
        }

        if (property === 'totalValue') {
            let sgs = getBindField().split('.'),
                arrayPath = [],
                fieldPath = [],
                b = false

            sgs.forEach((sg, index) => {
                if (b)
                    fieldPath.push(sg)

                if (/{(\d+)}/g.test(sg)) {
                    b = true
                }
                if (!b)
                    arrayPath.push(sg)
            })

            let array = state.getIn(['data_runtime'].concat(arrayPath)),
                total = 0

            array.forEach(v => {
                total += parseFloat(v.getIn(fieldPath))
            })

            return total

        }

        return getMeta().getIn(property.split('.'))
    }

    if (propertys instanceof Array) {
        let ret = Map()
        propertys.forEach(p => {
            ret = ret.set(p, getPropertyValue(p))
        })
        return ret
    } else {
        return getPropertyValue(propertys)
    }
}



export function setter(state, path, property, value) {
    if (!path || !property)
        return state

    if (property === 'focusField') {
        value = value || ''
        state = state.setIn(['meta_runtime', 'oldFocusField'], state.getIn(['meta_runtime', 'focusField']))
        return state.setIn(['meta_runtime', 'focusField'], value)
    }

    let parsedPath = parsePath(path),
        bindField
    path = state.getIn(['parsedMeta', parsedPath.path])

    if (property === 'value') {
        bindField = state.getIn((`${path}.bindField`).split('.'))
        bindField = calcBindField(bindField, parsedPath)
        state = state.setIn((`data_runtime.${bindField}`).split('.'), value)
        state = updateStatus(state, bindField, 'modify')
        return state
    }

    if (!parsedPath.vars) {
        return state.setIn((`${path}.${property}`).split('.'), value)
    }

    bindField = state.getIn((`${path}.bindField`).split('.'))
    bindField = calcBindField(bindField, parsedPath)
    return state.setIn((`data_runtime.${bindField}_runtime.${property}`).split('.'), value)
}


export function updater(state, path, property, fn){
    if(property !== 'value')return
    let parsedPath = parsePath(path),bindField
    path = state.getIn(['parsedMeta', parsedPath.path])   
    bindField = state.getIn((`${path}.bindField`).split('.'))
    bindField = calcBindField(bindField, parsedPath)
    return state.updateIn((`data_runtime.${bindField}`).split('.'), fn)
}

/*
export function merger(state, path, property, value, index) {
    if(!path || !property)  
        return state

    let parsedPath = parsePath(path),bindField
    path = state.getIn(['parsedMeta', parsedPath.path])   

    if(property === 'value'){
        bindField = state.getIn((`${path}.bindField`).split('.'))
        bindField = calcBindField(bindField, parsedPath.vars)
        return state.mergeDeep((`data_runtime.${bindField}`).split('.'), value)
    }

    if(!parsedPath.vars){
        return state.mergeDeep((`${path}.${property}`).split('.'), value)
    }

    bindField = state.getIn((`${path}.bindField`).split('.'))
    bindField = calcBindField(bindField, parsedPath.vars)
    return state.mergeDeep((`data_runtime.${bindField}_runtime.${property}`).split('.'), value)
}*/

export function addRow(state, path, value) {
    let parsedPath = parsePath(path),
        bindField
    path = state.getIn(['parsedMeta', parsedPath.path])
    bindField = state.getIn((`${path}.bindField`).split('.'))
        //bindField = calcBindField(bindField, parsedPath.vars)
    path = `data_runtime.${bindField}`
    state = state.updateIn(path.split('.'), x => x.push(value))
    return state
}


export function downInsertRow(sate, path, value) {
    let parsedPath = parsePath(path)
    return insertRow(state, parsedPath.path + "," + (parsedPath.vars[0] + 1), value)
}

export function insertRow(state, path, value) {
    
    let parsedPath = parsePath(path),
        bindField
    path = state.getIn(['parsedMeta', parsedPath.path])
    bindField = state.getIn((`${path}.bindField`).split('.'))

    path = `data_runtime.${bindField}`
    let insertRowIndex = -1

    if (parsedPath.vars) {
        insertRowIndex = parsedPath.vars[0]
    } else {
        insertRowIndex = state.getIn(path.split('.')).findIndex(findIndexFunc)
    }

    state = state.updateIn(path.split('.'), x => {
        x = x.insert(insertRowIndex, value)
        return x
    })
    return state
}


export function delRow(state, path, findIndexFunc) {
    let parsedPath = parsePath(path),
        bindField
    path = state.getIn(['parsedMeta', parsedPath.path])
    bindField = state.getIn((`${path}.bindField`).split('.'))
    path = `data_runtime.${bindField}`
    let delRowIndex = -1

    if (parsedPath.vars) {
        delRowIndex = parsedPath.vars[0]
    } else {
        delRowIndex = state.getIn(path.split('.')).findIndex(findIndexFunc)
    }

    bindField += "." + delRowIndex
    state = updateStatus(state, bindField, 'delete')

    state = state.updateIn(path.split('.'), x => {
        if (delRowIndex >= 0) {
            x = x.remove(delRowIndex)
        }
        return x
    })

    return state
}

export function delAllRow(state, path){
    let bindField = getter(state, path, 'bindField')
    path = `data_runtime.${bindField}`

    let rows = state.getIn(path.split('.'))
    rows.forEach((r,index)=>{
        state = updateStatus(state, `${bindField}.${index}`, 'delete')
    })

    return state.updateIn(path.split('.'), x=>List())
}

export function delSelectedRow(state, path){
    let pValues = getter(state, path, ['bindField','']),
        bindField = pValues.get('bindField'),
        meta = pValues.get(''),
        selectColumnName = meta.get('childrens').find(c=>c.get('isSelectColumn')).get('name'),
        selectedRowIndexs = getSelectedRowIndexs(state, path + '.' + selectColumnName).reverse()
    path = `data_runtime.${bindField}`

    selectedRowIndexs.forEach(i=>{
        state = updateStatus(state, `${bindField}.${i}`,'delete')
    })

    state = state.updateIn(path.split('.'), x=>{
        selectedRowIndexs.forEach(i=>{
            x = x.remove(i)
        })
        return x
    })

    return state
}

export function getterByField(state, fieldPath) {
    if (fieldPath instanceof Array) {
        return state.getIn(['data_runtime'].concat(fieldPath))
    } else {
        return state.getIn((`data_runtime.${fieldPath}`).split('.'))
    }
}

export function setterByField(state, fieldPath, value) {
    if (fieldPath instanceof Array) {
        return state.setIn(['data_runtime'].concat(fieldPath), value)
    } else {
        return state.setIn((`data_runtime.${fieldPath}`).split('.'), value)
    }
}
/*
export function mergerByField(state, fieldPath, value){
    return state.mergeDeep((`data_runtime.${fieldPath}`).split('.'), value)
}*/

export function selectAllRows(state, path, seleted) {
    let arrayPath = path.substring(0, path.lastIndexOf('.')),
        field = path.substring(path.lastIndexOf('.') + 1)

    state = updater(state, arrayPath, 'value', (v) => {
        v.forEach((item, index) => {
            v = v.setIn([index, field], seleted)
        })
        return v
    })
    return state
}

export function getSelectedRows(state, path) {
    let arrayPath = path.substring(0, path.lastIndexOf('.')),
        field = path.substring(path.lastIndexOf('.') + 1),
        rows = getter(state,arrayPath,'value')
    return rows.filter(r=>!!r.get(field))
}

export function getSelectedRowIndexs(state, path) {
    let arrayPath = path.substring(0, path.lastIndexOf('.')),
        field = path.substring(path.lastIndexOf('.') + 1),
        rows = getter(state,arrayPath,'value'),
        ret = []
    rows.forEach((row,index)=>{
        if(!!row.get(field))
            ret.push(index)
    })
    return ret
}

export function parseMeta(meta) {
    let ret = Map(),
        name = meta.get('name')

    ret = ret.set(name, 'meta_runtime')

    let parseChildrens = (childrens, parentPath, parentRealPath) => {
        if (!childrens) return
        childrens.forEach((children, index) => {
            let childrenName = children.get('name'),
                path = `${parentPath}.${childrenName}`,
                realPath = `${parentRealPath}.childrens.${index}`
            ret = ret.set(path, realPath)
            parseChildrens(children.get('childrens'), path, realPath)
        })
    }
    parseChildrens(meta.get('childrens'), name, 'meta_runtime')
    return ret
}



function updateStatus(state, path, option) {
    if (option === 'add')
        return state

    if (option === 'delete') {
        let status = state.getIn((`data_runtime.${path}.status`).split('.'))

        if (typeof status === 'undefined') {
            return state
        }

        if (status === -1 || status === 1 || status === 3) {
            return state
        }

        let arrayPath = 'data_runtime.' + path.substring(0, path.lastIndexOf('.')) + '_runtime'

        state = state.updateIn(arrayPath.split('.'), x => {
            x = x || Map()
            x = x.update('deletes', y => {
                y = y || List()
                y = y.push(state.getIn((`data_runtime.${path}`).split('.')))
                return y
            })
            return x
        })
        return state
    }

    let pathSegments = path.split('.'),
        currentPath = 'data_runtime',
        needUpdatePaths = []

    pathSegments.forEach((seg, index) => {
        if (index < pathSegments.length - 1) {
            currentPath += `.${seg}`

            if (!isNaN(pathSegments[index + 1])) {
                needUpdatePaths.push(currentPath + '_runtime.status')
            } else
                needUpdatePaths.push(currentPath + '.status')

        } else {
            currentPath += `.${seg}_runtime`
            needUpdatePaths.push(currentPath + '.status')
        }
    })

    let status = 2
    for (let p of needUpdatePaths) {
        let s = state.getIn(p.split('.'))
            //add or delete
        if (s === 1 || s === 3) {
            status = s
        }

        state = state.setIn(p.split('.'), status) //modify
    }

    return state
}
export function getJson(state, path) {

    return getJsonInternal(state.getIn((`data_runtime.${path}`).split('.')))
}

function getJsonInternal(value) {

    if (value instanceof Map) {
        let result = {}
        value.keySeq().forEach(k => {
            if (!/_runtime/i.test(k)) {
                result[k] = getJsonInternal(value.get(k))
            }

            let deletes = value.getIn([k + '_runtime', 'deletes'])
            if (deletes) {

                deletes.forEach(d => {
                    result[k].push({ id: d.get('id'), status: 3 })
                })
            }
        })

        return result
    } else if (value instanceof List) {
        let result = []
        value.forEach(v => {
            if (v.get('status') !== -1)
                result.push(getJsonInternal(v))
        })
        return result
    } else {
        return value
    }
}


Object.assign(exports, {existsParamsInPath, parsePath, calcBindField, match,...exports})

/*
function getChangeset(state, path){

}

function getChangesetJson(parentStatus, key, value){
    if (value instanceof Map) {
        let id = value.get('id'),
        let result = {id: value.get('id'), status}
        value.keySeq().forEach(k=>{
            let v = value.get(k),
                s = value.get()
        })

    }else if(value instanceof List){

    }else{
        return {key, value}
    }
}

function getChangesetJson(value, status) {
    if (value instanceof Map) {
        let result = { id: value.get('id'), status }
        value.keySeq().forEach(k => {
            let v = value.get(k),
                s = calcStatus(status,  value.get(`${k}_runtime.status`) ),
                c = isChanged(s),
            if (c) {
                result[k] = getChangesetJson(v, s)
            }
        })
        return result

    } else if (value instanceof List) {
        
        let result = []
        value.forEach(v => {
            let rv = v.get('_runtime'),
                s = calcStatus(status, rv ? rv.get('status') : null),
                c = isChanged(s)
            if (c) {
                result.push(getChangesetJson(v, s))
            }
        })
        return result

    } else {
        return value
    }
}

function calcStatus(parentStatus, selfStatus){
    if(parentStatus === 3 || parentStatus === 1) return parentStatus
    return selfStatus
}

function isChanged(status){
    return !(!status || status === 0 || status === -1)
}

*/
