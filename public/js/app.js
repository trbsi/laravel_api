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
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.view.html',
                controller: 'mainController',
                controllerAs: 'vm'
            })
            .state('list-users', {
                url: '/list-users',
                templateUrl: 'views/admin/list-users.view.html',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .state('add-user', {
                url: '/add-user',
                templateUrl: 'views/admin/add-user.view.html',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'views/employee/profile.view.html',
                controller: 'profileController',
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

        var publicPages =
        [       	
       		{
        		url : '/login',
        		name : 'Login'
        	},
       		{
        		url : '/register',
        		name : 'Register'
        	}
        	
        ];

        var routesAll = 
        [       	
       		{
        		url : '/login',
        		name : 'Logout'
        	}
        	
        ];
        var routesUser = 
        [       	
       		{
        		url : '/profile',
        		name : 'Profile'
        	}
        	
        ];
        var routesAdmin = 
       	[       	
            {
                url : '/list-users',
                name : 'List users'
            },            
            {
                url : '/add-user',
                name : 'Add user'
            }
            
        ];
        var menu = [];

        // check if route does not require authentication
        var publicPagesCheck = function (route) {
        	var r = false;
        	angular.forEach(publicPages, function(value, key) {
				if(value.url == route)
				{
					r = true;
				}
			});

            return r;
        }
        // check if route requires admin priviledge
        var routeAdmin = function (route) {
        	var r = false;
        	angular.forEach(routesAdmin, function(value, key) {
				if(value.url == route)
				{
					r = true;
				}
			});

            return r;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {

            var restrictedPage = publicPagesCheck($location.path());

            if (restrictedPage && $location.path() != '/register' && !$localStorage.currentUser) {
                $location.path('/login');
            }
            else if (routeAdmin($location.url()) && !AuthenticationService.validateRoleAdmin()) {
                // redirect to error page
                $location.path('/error');
            }

        });

        $rootScope.returnMenu = function () {
        	if ($localStorage.currentUser)
        	{
        		//if this is admin
        		if(AuthenticationService.validateRoleAdmin())
        		{
        			return routesAdmin.concat(routesAll);
        		}
        		else
        		{
        			return routesUser.concat(routesAll);
        		}
        	}
        	else
        	{
        		return publicPages;
        	}
        }

        $rootScope.returnUser = function () {
            if ($localStorage.currentUser)
                return $localStorage.currentUser.email;

            return '';
        }

    }
})();