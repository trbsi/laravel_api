(function () {
    'use strict';

    angular
        .module('myApp', ['ui.router', 'ngMessages', 'ngStorage', 'ngTable'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {

        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/index.view.html',
                //controller: 'Home.IndexController',
                //controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.view.html',
                controller: 'mainController',
                controllerAs: 'vm'
            })
            .state('list-users', {
                url: '/list-users',
                templateUrl: 'views/list-users.view.html',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .state('error', {
                url: '/error',
                templateUrl: 'views/error.view.html',
            });

    }

    function run($rootScope, $http, $location, $localStorage, AuthenticationService) {
        // keep user logged in after page refresh
        $rootScope.email = '?';
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            $rootScope.email = $localStorage.currentUser.email;
        }

        var routesThatDontRequireAuth = ['/login'];
        var routesThatForAdmins = ['/list-users'];

        // check if route does not require authentication
        var routeClean = function (route) {
        }
        // check if route requires admin priviledge
        var routeAdmin = function (route) {
            if (routesThatForAdmins.indexOf(route) >= 0) {
                return true;
            }

            return false;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            var publicPages = ['/login'];

            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
            else if (routeAdmin($location.url()) && !AuthenticationService.validateRoleAdmin()) {
                // redirect to error page
                $location.path('/error');
            }

        });

        $rootScope.returnMenu = function () {

        }

        $rootScope.returnUser = function () {
            if ($localStorage.currentUser)
                return $localStorage.currentUser.email;

            return '';
        }

    }
})();