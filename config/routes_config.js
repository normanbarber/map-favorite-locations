module.exports = exports = function () {
    return [
        {
            method: 'get',
            route: '/',
            render: {
                template: 'index'
            }
        },
        {
            method: 'get',
            route: '/login',
            render: {
                template: 'login'
            }
        },
        {
            method: 'post',
            route: '/login',
            handler: {
                module: 'loginProvider',
                method: 'handleLoginRequest'
            }
        },

        {
            method: 'get',
            route: '/logout',
            render: {
                template: 'login'
            }
        },
        {
            method: 'get',
            route: '/signup',
            render: {
                template: 'signup'
            }
        },
        {
            method: 'post',
            route: '/signup',
            handler: {
                module: 'signupProvider',
                method: 'handleSignupRequest'
            }
        },
        {
            method: 'get',
            route: '/welcome',
            render: {
                template: 'welcome'
            }
        },
        {
            method: 'post',
            route: '/welcome',
            handler: {
                module: 'welcomeProvider',
                method: 'findFriend'
            }
        },
        {
            method: 'post',
            route: '/addfavoritelocation',
            handler: {
                module: 'welcomeProvider',
                method: 'updateLocation'
            }
        },
        {
            method: 'post',
            route: '/deletelocation',
            handler: {
                module: 'welcomeProvider',
                method: 'deleteLocation'
            }
        }
    ]
};
