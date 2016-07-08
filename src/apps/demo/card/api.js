export const addData = {
    id: undefined,
    voucherDate: undefined,
    voucherCode: undefined,
    number: 0,
    reference: undefined,
    bizType: undefined,
    memo: undefined,
    checkbox: false,
    status: 1
}


export const cardDemo = {
    meta: {
        name: 'cardDemo',
        component: 'DynamicPage',
        childrens: [{
            name: 'toolbar',
            component: 'Toolbar',
            bindField: 'toolbar'
        }, {
            name: 'form',
            component: 'Form',
            bindField: 'form',
            childrens: [{
                name: 'fromItems',
                component: 'FormItems',
                childrens: [{
                    name: 'voucherDate',
                    title: '单据日期',
                    type: 'date',
                    bindField: 'form.voucherDate',
                    format: 'yyyy-MM-dd',
                    //disabled:true,
                    required: true,
                    width: 150
                }, {
                    name: 'voucherCode',
                    title: '单据编码',
                    type: 'string',
                    //disabled:true,
                    required: true,
                    bindField: 'form.voucherCode',
                    width: 150,
                    validate: {
                        rules: [{
                            required: true,
                            message: '不能为空'
                        }]
                    }
                }, {
                    name: 'bizType',
                    title: '业务类型',
                    bindField: 'form.bizType',
                    type: 'object',
                    required: true,
                    component: 'Select',
                    valueMember: 'code',
                    displayMember: 'name',
                    dataSource: 'rest://bizTypes',
                    dataSourceFetchMode: 1,
                    width: 150
                }, {
                    name: 'number',
                    title: '数量',
                    type: 'float',
                    required: true,
                    bindField: 'form.number',
                    width: 150
                }, {
                    name: 'checkbox',
                    type: 'bool',
                    title: '复选',
                    bindField: 'form.checkbox',
                    width: 150
                }, {
                    name: 'reference',
                    title: '参照',
                    type: 'object',
                    bindField: 'form.reference',
                    component: 'Reference',
                    valueMember: 'code',
                    displayMember: 'name',
                    dropDataSource: 'rest://goodsReference',
                    dropDataSourceFetchMode: 1,
                    width: 150
                }, {
                    name: 'memo1',
                    title: '备注',
                    type: 'string',
                    bindField: 'form.memo',
                    visible: 'false',
                    width: 150
                }]
            }]
        }]
    },
    data: {
        toolbar: [{
            id: 1,
            code: 'prevPage',
            name: '上页'
        }, {
            id: 2,
            code: 'nextPage',
            name: '下页'
        }, {
            id:3,
            code:'add',
            name:'新增'
        },{
            id: 4,
            code: 'save',
            name: '保存'
        }, {
            id: 5,
            code: 'exit',
            name: '退出'
        }],
        form: addData
    }
}


export const cards = [{
    id: 1,
    voucherDate: '2016-5-28',
    voucherCode: '001',
    number: 1,
    reference: { id: '1', code: '001', name: '牙膏' },
    bizType: { id: '2', code: '2', name: '销售退货' },
    memo: '1',
    checkbox: false,
    status: 0
}, {
    id: 2,
    voucherDate: '2016-5-28',
    voucherCode: '002',
    number: 2,
    reference: { id: '1', code: '001', name: '牙膏' },
    bizType: { id: '2', code: '2', name: '销售退货' },
    memo: '2',
    checkbox: false,
    status: 0
}, {
    id: 3,
    voucherDate: '2016-5-28',
    voucherCode: '003',
    number: 3,
    reference: { id: '1', code: '001', name: '牙膏' },
    bizType: { id: '2', code: '2', name: '销售退货' },
    memo: '1',
    checkbox: false,
    status: 0
}]
