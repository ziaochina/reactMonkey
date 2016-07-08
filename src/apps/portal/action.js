import Immutable, { Map } from 'immutable'
import * as da from '../dynamicUI/action'

export function initView() {
    return injectFuns => {
        let meta = {
            name: 'portal',
            childrens: [{
                name: 'menus',
                bindField: 'menus'
            }, {
                name: 'tabs',
                bindField: 'tabs'
            },{
                name: 'currentTab',
                bindField: 'currentTab'
            }]
        }

        let data = {
            menus: [{
                id: '01',
                code: 'demo',
                title: '演示',
                subMenus: [{
                   id:'0101',
                   code:'welcome',
                   title:'欢迎',
                   url:'apps/welcome'
                },{
                    id: '0102',
                    code: 'voucher',
                    title: '单据',
                    subMenus:[{
                    	id:'010201',
                    	code:'sa03',
                    	title:'单据演示',
                    	url:'apps/demo/voucher'
                    },{
                        id:'010202',
                        code:'sa02',
                        title:'卡片演示',
                        url:'apps/demo/card'
                    },{
                        id:'010203',
                        code:'sa01',
                        title:'带页签卡片演示',
                        url:'apps/templates/voucher?sysId=sa&mId=sa01'
                    }]                    
                },{
                    id: '0103',
                    code: 'list',
                    title: '列表',
                    subMenus:[{
                        id:'010301',
                        code:'sa03list',
                        title:'列表演示',
                        url:'apps/demo/list'
                    }]
                }]
            },{
                id: '02',
                code: 'site',
                title: '网站',
                subMenus: [{
                    id: '0201',
                    code: 'binds',
                    title: '必应',
                    url:'http://www.bings.com'
                },{
                    id: '0202',
                    code: 'baidu',
                    title: '百度',
                    url:'http://www.baidu.com'
                }]
            }],
            tabs: [],
            currentTab:undefined
        }

        //let utils = da.getUtils(injectFuns, exports)
        da.initView({meta, data}, exports)(injectFuns)
    }
}

export function addTab( title, url) {
    return ({ reduce }) => {
        reduce('addTab',  title, url)
    }
}

export function selectTab(url) {
    return ({ reduce }) => {
        reduce('selectTab', url)
    }
}

export function delTab(url) {
    return ({ reduce }) => {
        reduce('delTab', url)
    }
}


export function loadPortalData() {
    return ({ reduce, post }) => {
        api.LoadPortalData(post).then(result => {
            var menuitems = api.menus.concat(result.value.GetMenuTable);
            reduce('setMenus', Immutable.fromJS(menuitems));
        });
    }
}

Object.assign(exports, {...da, ...exports })

/*
url:'apps/sa/saleDelivery?sysId=sa&mId=sa03'
    url:'apps/templates/voucher?sysId=sa&mId=sa03'
 
menus : [
				{"Code": "logout", "Text": "注销", "Url": "apps/logout"},
  				{"Code": "logout", "Text": "注销", "Url": "apps/logout"},
  				{"Code": "welcome", "Text": "欢迎", "Url": "apps/welcome"},
			  	{"Code": "about", "Text": "关于", "Url": "apps/about"},
			  	{"Code": "baidu", "Text": "百度", "Url": 'http://www.baidu.com'},
			  	{"Code": "bings", "Text": "必应", "Url": 'http://www.bings.com'},
			  	{"Code": "personList", "Text": "员工列表", "Url": 'apps/aa/person/list?from=menu'},
			  	{"Code": "saleOrderList", "Text": "销售订单列表", "Url": 'apps/bap/list?from=menu&sysId=sa&mId=sa03'}
			]
 */
