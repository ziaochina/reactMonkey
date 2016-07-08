let list = [];
for (let i = 0; i < 10; i++) {
    list.push({
        id: i,
        code: "00"+i,
        amount: 2.22,
        delivery: '2016-4-1',
        bizType: { id: '2', code: '2', name: '销售退货' },
        memo: 'momo' + i
    })
}

export const listDemo = {
    meta: {
        name: 'listDemo',
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
                    name: 'filter',
                    title: '过滤',
                    type: 'string',
                    bindField: 'form.filter',
                    width: 150
                }]
            }, {
                name: 'tabs',
                component: 'Tabs',
                childrens: [{
                    name: 'details',
                    title: '列表',
                    bindField: 'form.list',
                    component: 'Grid',
                    rowHeight: 30,
                    headerHeight: 30,
                    disabled: true,
                    enableSum: true,
                    enableSequenceColumn: true,
                    childrens: [{
                        name: 'select',
                        title: '选',
                        type: 'bool',
                        isSelectColumn: true,
                        bindField: 'form.list.{0}.select',
                        width: 30
                    }, {
                        name: 'code',
                        title: '单据号',
                        bindField: 'form.list.{0}.code',
                        type: 'string',
                        disabled: true,
                        width: 100
                    }, {
                        name: 'amount',
                        title: '金额',
                        bindField: 'form.list.{0}.amount',
                        type: 'float',
                        enableSum: true,
                        precision: 2,
                        width: 100
                    }, {
                        name: 'bizType',
                        title: '业务类型',
                        type: 'string',
                        bindField: 'form.list.{0}.bizType.name',
                        width: 150
                    }, {
                        name: 'delivery',
                        title: '日期',
                        bindField: 'form.list.{0}.delivery',
                        type: 'date',
                        format: 'yyyy-MM-dd',
                        width: 200
                    }, {
                        name: 'memo',
                        title: '备注',
                        bindField: 'form.list.{0}.memo',
                        type: 'string',
                        width: 200
                    }]
                }]
            }]
        }]
    },
    data: {
        toolbar: [{
            id: 1,
            code: 'delete',
            name: '删除'
        }, {
            id: 2,
            code: 'exit',
            name: '退出'
        }],
        form: {
            filter: '',
            list: list
        }
    }
}
