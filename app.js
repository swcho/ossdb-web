angular.module('ossdbWeb', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('ossdbWeb').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('project', {
        url: '/project',
        templateUrl: 'partial/project/project.html'
    });
    $stateProvider.state('ossp', {
        url: '/ossp',
        templateUrl: 'partial/ossp/ossp.html'
    });
    $stateProvider.state('license', {
        url: '/license',
        templateUrl: 'partial/license/license.html'
    });
    $stateProvider.state('package', {
        url: '/package',
        templateUrl: 'partial/package/package.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('ossdbWeb').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
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
