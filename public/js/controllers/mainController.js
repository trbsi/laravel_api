(function () {
	'use strict';

	angular.module('myApp').controller('mainController', Controller);

	function Controller($location, AuthenticationService)
	{
		var vm = this;
		vm.login = login;

		initController();

		function initController()
		{

			AuthenticationService.Logout();
		};

		function login()
		{
			AuthenticationService.Login(vm.email, vm.password, function(result)
			{
				if(result == true)
				{
					//alert("OK");
					$location.path("/");
				}
				else
				{
					alert("NOT OK");
				}
			});
		};

	}
})();