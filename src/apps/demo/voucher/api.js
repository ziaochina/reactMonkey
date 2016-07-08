export const addData = {
    id: undefined,
    voucherDate: undefined,
    voucherCode: undefined,
    number: 0,
    reference: undefined,
    bizType: undefined,
    memo: undefined,
    checkbox: false,
    status: 1,
    details: [],
    amounts: []
}

for (let i = 0; i < 10; i++) {
    addData.details.push({
        id: undefined,
        goods: undefined,
        number: 0,
        price: 0,
        amount: 0,
        delivery: '2016-5-28',
        checkbox: false,
        bizType: undefined,
        memo: undefined,
        price2: 0,
        price3: 0,
        price4: 0,
        price5: 0,
        price6: 0,
        price7: 0,
        price8: 0,
        price9: 0,
        price10: 0,
        price11: 0,
        price12: 0,
        price13: 0,
        price14: 0,
        price15: 0,
        price16: 0,
        status: -1
    })
}

for (let i = 0; i < 2; i++) {
    addData.amounts.push({
        id: undefined,
        goods: undefined,
        number: 0,
        price: 0,
        status: -1
    })
}

export const voucherDemo = {
    meta: {
        name: 'voucherDemo',
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
                name: 'fromHeader',
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
            }, {
                name: 'tabs',
                component: 'Tabs',
                childrens: [{
                    name: 'details',
                    title: '明细',
                    bindField: 'form.details',
                    component: 'Grid',
                    rowHeight: 30,
                    headerHeight: 30,
                    //disabled:true,
                    enableSum: true,
                    enableSequenceColumn: true,
                    allowAddrow: true,
                    allowDelrow: true,
                    childrens: [{
                        name: 'select',
                        title: '选',
                        type: 'bool',
                        isSelectColumn: true,
                        bindField: 'form.details.{0}.select',
                        width: 30
                    }, {
                        name: 'goods',
                        title: '存货',
                        bindField: 'form.details.{0}.goods',
                        component: 'Reference',
                        valueMember: 'code',
                        displayMember: 'name',
                        dropDataSource: 'rest://goodsReference',
                        dropDataSourceFetchMode: 1,
                        type: 'object',
                        required: true,
                        width: 150,
                        validate: {
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        }
                    }, {
                        name: 'goodsCode',
                        title: '存货编码',
                        bindField: 'form.details.{0}.goods.code',
                        type: 'string',
                        disabled: true,
                        width: 100
                    }, {
                        name: 'number',
                        title: '数量',
                        bindField: 'form.details.{0}.number',
                        enableSum: true,
                        type: 'float',
                        required: true,
                        width: 100
                    }, {
                        name: 'price',
                        title: '单价',
                        bindField: 'form.details.{0}.price',
                        type: 'float',
                        required: true,
                        precision: 2,
                        width: 100
                    }, {
                        name: 'amount',
                        title: '金额',
                        required: true,
                        bindField: 'form.details.{0}.amount',
                        type: 'float',
                        enableSum: true,
                        precision: 2,
                        width: 100
                    }, {
                        name: 'checkbox',
                        title: '复选',
                        type: 'bool',
                        bindField: 'form.details.{0}.checkbox',
                        width: 50
                    }, {
                        name: 'bizType',
                        title: '业务类型',
                        type: 'object',
                        bindField: 'form.details.{0}.bizType',
                        component: 'Select',
                        valueMember: 'code',
                        displayMember: 'name',
                        dataSource: 'rest://bizTypes',
                        dataSourceFetchMode: 1,
                        width: 150
                    }, {
                        name: 'delivery',
                        title: '日期',
                        bindField: 'form.details.{0}.delivery',
                        type: 'date',
                        format: 'yyyy-MM-dd',
                        width: 200
                    }, {
                        name: 'memo',
                        title: '备注',
                        bindField: 'form.details.{0}.memo',
                        type: 'string',
                        width: 200
                    }, {
                        name: 'price2',
                        title: '单价',
                        bindField: 'form.details.{0}.price2',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price3',
                        title: '单价',
                        bindField: 'form.details.{0}.price3',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price4',
                        title: '单价',
                        bindField: 'form.details.{0}.price4',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price5',
                        title: '单价',
                        bindField: 'form.details.{0}.price5',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price6',
                        title: '单价',
                        bindField: 'form.details.{0}.price6',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price7',
                        title: '单价',
                        bindField: 'form.details.{0}.price7',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price8',
                        title: '单价',
                        bindField: 'form.details.{0}.price8',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price9',
                        title: '单价',
                        bindField: 'form.details.{0}.price9',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price10',
                        title: '单价',
                        bindField: 'form.details.{0}.price10',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price11',
                        title: '单价',
                        bindField: 'form.details.{0}.price11',
                        type: 'float',
                        precision: 2,
                        width: 100

                    }, {
                        name: 'price12',
                        title: '单价',
                        bindField: 'form.details.{0}.price12',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price13',
                        title: '单价',
                        bindField: 'form.details.{0}.price13',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price14',
                        title: '单价',
                        bindField: 'form.details.{0}.price14',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price15',
                        title: '单价',
                        bindField: 'form.details.{0}.price15',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }, {
                        name: 'price16',
                        title: '单价',
                        bindField: 'form.details.{0}.price16',
                        type: 'float',
                        precision: 2,
                        width: 100
                    }]

                }, {
                    name: 'amounts',
                    title: '汇总',
                    bindField: 'form.amounts',
                    component: 'Grid',
                    childrens: [{
                        name: 'number',
                        title: '数量',
                        bindField: 'form.amounts.{0}.number',
                        type: 'float',
                        displayComponent: 'DisplayCell',
                        width: 100
                    }]

                }]

            }, {
                name: 'formFooter',
                component: 'FormItems',
                childrens: [{
                    name: 'memo',
                    title: '备注',
                    type: 'string',
                    bindField: 'form.memo'
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
            id: 3,
            code: 'add',
            name: '新增'
        }, {
            id: 4,
            code: 'save',
            name: '保存'
        }, {
            id: 5,
            code: 'list',
            name: '列表'
        }, {
            id: 6,
            code: 'exit',
            name: '退出'
        }],
        form: addData
    },
    config: {
        emptyRow: {
            "voucherDemo.form.tabs.details": {
                id: null,
                goods: null,
                number: 0,
                price: 0,
                amount: 0,
                delivery: '2016-4-1',
                checkbox: false,
                bizType: null,
                memo: null,
                price2: 0,
                price3: 0,
                price4: 0,
                price5: 0,
                price6: 0,
                price7: 0,
                price8: 0,
                price9: 0,
                price10: 0,
                price11: 0,
                price12: 0,
                price13: 0,
                price14: 0,
                price15: 0,
                price16: 0,
                status: -1
            },
            "voucherDemo.form.tabs.amounts": {
                id: null,
                goods: null,
                number: 0,
                price: 0,
                status: -1
            }
        }
    }
}


export const vouchers = []
for (let i = 0; i < 10; i++) {
    vouchers.push({
        id: i,
        voucherDate: '2016-5-28',
        voucherCode: '00' + i,
        number: 1,
        reference: { id: '1', code: '001', name: '牙膏' },
        bizType: { id: '2', code: '2', name: '销售退货' },
        memo: '1',
        checkbox: false,
        status: 0,
        details: [],
        amounts: []
    })
}


for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 5 + j*4; i++) {
        vouchers[j].details.push({
            id: i,
            goods: { id: '1', code: '001', name: '牙膏' },
            number: i,
            price: 1.11,
            amount: 2.22,
            delivery: '2016-4-1',
            checkbox: false,
            bizType: { id: '2', code: '2', name: '销售退货' },
            memo: 'momo' + i,
            price2: 1.11,
            price3: 1.11,
            price4: 1.11,
            price5: 1.11,
            price6: 1.11,
            price7: 1.11,
            price8: 1.11,
            price9: 1.11,
            price10: 1.11,
            price11: 1.11,
            price12: 1.11,
            price13: 1.11,
            price14: 1.11,
            price15: 1.11,
            price16: 1.11,
            status: 0
        })
    }


}
