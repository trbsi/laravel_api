angular.module('loginService', [])

	.factory('Login', function($http) {

		return {
			post : function(loginData) {
				console.log(loginData);
				return $http({
	                method: 'POST',
	                url: 'api/auth/login',
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                data: $.param(loginData)
	            });
			}
		}

	});