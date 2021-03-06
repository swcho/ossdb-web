//angular.module('ossdbWeb', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'ngSanitize', 'ui.select']);
angular.module('ossdbWeb', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngSanitize', 'ui.select']);

angular.module('ossdbWeb').config(function ($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $stateProvider.state('project', {
        url: '/project/:page',
        templateUrl: 'partial/project/project.html'
    });
    $stateProvider.state('ossp', {
        url: '/ossp/:page',
        templateUrl: 'partial/ossp/ossp.html'
    });
    $stateProvider.state('license', {
        url: '/license/:page',
        templateUrl: 'partial/license/license.html'
    });
    $stateProvider.state('package', {
        url: '/package/:page',
        templateUrl: 'partial/package/package.html'
    });
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial/home/home.html'
    });
    $stateProvider.state('ossp-detail', {
        url: '/ossp-detail/:id?fromPage',
        templateUrl: 'partial/ossp-detail/ossp-detail.html'
    });
    $stateProvider.state('license-detail', {
        url: '/license-detail/:id?fromPage',
        templateUrl: 'partial/license-detail/license-detail.html'
    });
    $stateProvider.state('package-detail', {
        url: '/package-detail/:id?fromPage',
//        url: '/package-detail/{id}/{fromPage:(?:/[^/]+)?}',
        templateUrl: 'partial/package-detail/package-detail.html'
    });
    $stateProvider.state('project-detail', {
        url: '/project-detail/:id?fromPage',
        templateUrl: 'partial/project-detail/project-detail.html'
    });

    /**
     * Anonymous routes
     */
    $stateProvider.state('anonymous', {
        abstract: true,
        template: '<ui-view/>',
        data: {
            access: 'anonymous'
        }
    }).state('login', {
        url: '/login',
        templateUrl: 'partial/login/login.html'
    }).state('register', {
        url: '/register',
        templateUrl: 'partial/register/register.html'
    }).state('profile', {
        url: '/profile',
        templateUrl: 'partial/profile/profile.html'
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

    /**
     * enable log
     */
    $logProvider.debugEnabled(true);
});

angular.module('ossdbWeb').run(function ($rootScope) {

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('ossdbWeb').controller('NavCtrl',function($rootScope, $scope, $ossdb, $state){

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeStart: ' + fromState.name + '->' + toState.name);

        if (toState.name === 'login' || toState.name === 'register') {
            return;
        }

        $ossdb.profile(function(err, user) {
            if (err) {
                //if (err.status === 401 || err.status === 403) {
                if (err.status === 401) {
                    $state.go('login');
                }
                console.log(err);
                return;
            }
            $scope.user = user;
        });
    });
});