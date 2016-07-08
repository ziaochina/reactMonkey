/**
 * [是否存在参数]
 * @param  {[type]} path [路径]
 * @return {[type]}      [是否存在参数]
 */
export function existsParamsInPath(path){
    return /,/.test(path)
}

/**
 * [解析路径]
 * @param  {[type]} path [路径]
 * @return {[type]}      [路径+参数数组]
 */
export function parsePath(path) {
    if(!path) return 
    let segments = path.split(",")
    return {
        path: segments[0],
        vars: segments.slice(1).length === 0 ? undefined : segments.slice(1)
    }
} 

/**
 * [根据解析后的路径计算绑定字段路径]
 * @param  {[type]} bindField  [绑定字段路径]
 * @param  {[type]} parsedPath [解析后路径]
 * @return {[type]}            [计算出的绑定字段路径]
 */
export function calcBindField(bindField, parsedPath) {
    let vars = parsedPath.vars
    if (!vars)
        return bindField
    let hit = false
    bindField = bindField.replace(/{(\d+)}/g, function(match, index) {
        hit = true
        return vars[index]
    })
    return hit ? bindField : bindField + '.' + vars[0]
}

/**
 * [路径匹配]
 * @param  {[type]} path         [当前路径]
 * @param  {[type]} propertys    [当前属性]
 * @param  {[type]} hitPaths     [命中路径]
 * @param  {[type]} hitPropertys [命中属性]
 * @return {[type]}              [是否命中]
 */
export function match(path, propertys, hitPaths, hitPropertys){
    if(!hitPaths && !hitPropertys) 
        return true

    let pathEquals = (currentPath)=>{
        return parsePath(path).path === currentPath
    }

    let propertyEquals = (currentProperty) =>{
        let b= false
        if((typeof propertys === 'string') 
            && propertys.constructor == String){
            if(propertys === currentProperty) b = true
        }
        else{
           propertys.forEach(pt=>{
                if( pt.indexOf(currentProperty) > -1) b = true
            })
        }

        return b
    }

    let hit = (currentPath, currentProperty)=>{
        if(!currentPath && !currentProperty) return true
        if(!currentPath && currentProperty){
            return propertyEquals(currentProperty)
        }
        if(currentPath && !currentProperty)
            return pathEquals(currentPath)
        let b = pathEquals(currentPath) && propertyEquals(currentProperty)
        return b
    }

    if(hitPaths){
        if((typeof hitPaths === 'string') && hitPaths.constructor == String){
            hitPaths = [hitPaths]
        }
    }
    if(hitPropertys){
        if((typeof hitPropertys === 'string') && hitPropertys.constructor == String){
            hitPropertys=[hitPropertys]
        }
    }

    let result = false

    if(!hitPaths && hitPropertys)  {
        hitPropertys.forEach(p=>{
            result = result || hit(hitPaths, p)
        })
        return result
    }

    if(hitPaths && !hitPropertys){
        hitPaths.forEach(p=>{
            result = result || hit(p, hitPropertys)
        })

        return result
    }

    hitPaths.forEach(p=>{
        hitPropertys.forEach(pt=>{
            result = result || hit(p, pt)
        })
    })
    return result

}