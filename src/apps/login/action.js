import * as da from '../dynamicUI/action'
import Immutable, { Map } from 'immutable'
import * as api from './api'

/**
 * [初始化视图]
 * @return {[type]} [无返回值]
 */
export function initView() {
    return injectFuns => {
        let meta = {
            name: 'login',
            childrens: [{
                name: 'user',
                title: '用户名',
                type: 'string',
                showLabel: 'false',
                bindField: 'user',
                validate: {
                    rules: [{
                        required: true,
                        message: '不能为空'
                    }]
                }
            }, {
                name: 'password',
                title: '密码',
                type: 'string',
                component: 'Password',
                showLabel: 'false',
                bindField: 'password'
            }]
        }

        let data = {
            user: '',
            password: ''
        }
        da.initView({ meta, data }, exports)(injectFuns)
    }
}

/**
 * [登录处理函数]
 * @param  {Function} callback [成功回掉函数]
 * @return {[type]}            [description]
 */
export function login(callback) {
    return injectFuns => {
        let { validate, getter, clearMessage } = da, { post, reduce } = injectFuns

        //校验某个路径数据
        if (!validate('login')(injectFuns)) return

        //action中获取值
        let user = getter('login.user', 'value')(injectFuns), //获取用户
            password = getter('login.password', 'value')(injectFuns) //获取密码


        let clearMsg = () => {
            clearMessage()(injectFuns) //清空消息
        }

        if (user === '1' && password === '1')
            callback({ result: true })
        else
            injectFuns.reduce('setMessage', 'error', '登录错误', '用户名密码不正确（1，1）', clearMsg)

    }
}

/**
 * [重写getter]
 * @param  {[type]} path     [description]
 * @param  {[type]} property [description]
 * @return {[type]}          [description]
 */
export function getter(path, property) {
    return (injectFuns) => {
        return da.getter(path, property)(injectFuns)
    }
}

/**
 * [重写字段变化事件]
 * @param  {[type]} path     [路径]
 * @param  {[type]} oldValue [旧值]
 * @param  {[type]} newValue [新值]
 * @return {[type]}          [description]
 */
export function onFieldChange(path, oldValue, newValue) {
    return injectFuns => {
        /*
        if(path === 'login.user'){
            if(newValue !== '1' && typeof newValue !== undefined && newValue !== null && newValue !== ''){
                injectFuns.reduce('setValidate',  path, '用户名不存在') //设置校验信息
            }
            else
                injectFuns.reduce('clearValidate',  path) //清空校验信息
        }*/
        da.onFieldChange(path, oldValue, newValue)(injectFuns)
    }
}

Object.assign(exports, {...da, ...exports })
