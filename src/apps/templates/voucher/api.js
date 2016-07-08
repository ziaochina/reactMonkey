let sa03Details = [];
for (let i = 0; i < 10; i++) {
    sa03Details.push({
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
    })
}

let sa03Amouts = []
for (let i = 0; i < 2; i++) {
    sa03Amouts.push({
        id: i,
        goods: { id: i, code: 'a' + i, name: 'a' + i },
        number: 2,
        price: 1.11
    })
}

export const sa03 = {
    meta: {
        name: 'sa03',
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
                name: 'formHeader',
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
                    enableSum:true,
                    enableSequenceColumn:true,
                    allowAddrow:true,
                    allowDelrow:true,
                    childrens: [{
                        name: 'select',
                        title:'选',
                        type:'bool',
                        isSelectColumn:true,
                        bindField: 'form.details.{0}.select',
                        width:30
                    },{
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
            code: 'save',
            name: '保存'
        }, {
            id: 4,
            code: 'exit',
            name: '退出'
        }],
        form: {
            id: '1',
            voucherDate: '2016-4-1',
            voucherCode: '111',
            number: 5,
            reference: { id: '1', code: '001', name: '牙膏' },
            bizType: { id: '2', code: '2', name: '销售退货' },
            memo: 'aaabbb',
            checkbox: false,
            details: sa03Details,
            amounts: sa03Amouts
        }
    },
    config: {
        emptyRow: {
            "sa03.form.tabs.details": {
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
                price16: 0

            },
            "sa03.form.tabs.amounts": {
                id: null,
                goods: null,
                number: 0,
                price: 0
            }
        },
        emptyRowCountByNew: {
            "sa03.form.tabs.details": 20,
            "sa03.form.tabs.amounts": 20
        }
    }

}


export const bizTypes = [{
    id: '1',
    code: '1',
    name: '普通销售'
}, {
    id: '2',
    code: '2',
    name: '销售退货'
}]

export const goodsReference = {
    data: [{
        id: '1',
        code: '001',
        name: '牙膏'
    }, {
        id: '2',
        code: '002',
        name: '牙刷'
    }],
    columns: [{
        title: '存货编码',
        name: 'code'
    }, {
        title: '存货名称',
        name: 'name'
    }],
    height: 200,
    width: 300
}



export const sa02 = {
    meta: {
        name: 'sa02',
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
                name: 'formHeader',
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
            id: 3,
            code: 'save',
            name: '保存'
        }, {
            id: 4,
            code: 'exit',
            name: '退出'
        }],
        form: {
            id: undefined,
            voucherDate: undefined,
            voucherCode: undefined,
            number: 0,
            reference: undefined,
            bizType: undefined,
            memo: undefined,
            checkbox: false,
            status:-1 //-1:empty,0:normal,1:add,2:modify,3:delete

        }
    }
}



export const sa01 = {
    meta: {
        name: 'sa01',
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
                name: 'tabs',
                component: 'Tabs',
                notAutoFill:true,
                childrens: [{
                    name: 'tab1',
                    component: 'FormItems',
                    title:'页签一',
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
                },{
                    name: 'tab2',
                    component: 'FormItems',
                    title:'页签二',
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
        }]
    },
    data: {
        toolbar: [{
            id: 1,
            code: 'prevPage',
            name: '上页',
            subMenus:[{
                id:101,
                code:'firstPage',
                name:'首页'
            }]
        }, {
            id: 2,
            code: 'nextPage',
            name: '下页'
        }, {
            id: 3,
            code: 'save',
            name: '保存'
        }, {
            id: 4,
            code: 'exit',
            name: '退出'
        }],
        form: {
            id: '1',
            voucherDate: '2016-4-1',
            voucherCode: '111',
            number: 5,
            reference: { id: '1', code: '001', name: '牙膏' },
            bizType: { id: '2', code: '2', name: '销售退货' },
            memo: 'aaabbb',
            checkbox: false

        }
    }

}
