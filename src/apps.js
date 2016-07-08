export default function asyncDownLoadApp(path, cb) {
    let { component, action, reducer } = {
        component: require('./apps/dynamicUI/index').default,
        action: require('./apps/dynamicUI/action'),
        reducer: require('./apps/dynamicUI/reducer')
    }
    require.ensure([], require => {
        if (path === 'apps/root') {
            require.ensure([], require => {
                cb(require('./apps/root/index').default,
                    require('./apps/root/action'),
                    require('./apps/root/reducer'))
            }, 'apps-root')

        } 
        else if (path === 'apps/login') {
            require.ensure([], require => {
                cb(require('./apps/login/index').default,
                    require('./apps/login/action'),
                    require('./apps/login/reducer'))
            }, 'apps-login')

        } else if (path === 'apps/portal') {
            require.ensure([], require => {
                cb(require('./apps/portal/index').default,
                    require('./apps/portal/action'),
                    require('./apps/portal/reducer'))
            }, 'apps-portal')

        } else if (path === 'apps/templates/voucher') {
            require.ensure([], require => {
                cb(require('./apps/templates/voucher/index').default,
                    require('./apps/templates/voucher/action'),
                    require('./apps/templates/voucher/reducer'))
            }, 'apps-voucher')

        } else if (path === 'apps/templates/list') {
            require.ensure([], require => {
                cb(require('./apps/templates/list/index').default,
                    require('./apps/templates/list/action'),
                    require('./apps/templates/list/reducer'))
            }, 'apps-list')

        }  else if (path === "apps/about") {
            require.ensure([], require => {
                cb(require('./apps/about/index').default)
            }, 'apps-about')

        } else if (path === "apps/welcome") {
            require.ensure([], require => {
                cb(require('./apps/welcome/index').default)
            }, 'apps-welcome')

        } else if (path === 'apps/demo/card') {
            require.ensure([], require => {

                cb(require('./apps/demo/card/index').default,
                    require('./apps/demo/card/action'),
                    require('./apps/demo/card/reducer'))
            }, 'apps-demo-card')

        } else if (path === 'apps/demo/voucher') {
            require.ensure([], require => {
                cb(require('./apps/demo/voucher/index').default,
                    require('./apps/demo/voucher/action'),
                    require('./apps/demo/voucher/reducer'))
            }, 'apps-demo-voucher')

        } else if (path === 'apps/demo/list') {
            require.ensure([], require => {
                cb(require('./apps/demo/list/index').default,
                    require('./apps/demo/list/action'),
                    require('./apps/demo/list/reducer'))
            }, 'apps-demo-list')

        }else if (path === 'apps/test') {
            require.ensure([], require => {
                cb(require('./apps/test/index').default,
                    require('./apps/test/action'),
                    require('./apps/test/reducer'))
            }, 'apps-test')

        } 
    })
}
