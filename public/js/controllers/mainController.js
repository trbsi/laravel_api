(function () {
    'use strict';

    angular.module('myApp').controller('mainController', Controller);

    function Controller($location, AuthenticationService) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        initController();

        function initController() {
            AuthenticationService.Logout();
        }

        function login() {
            AuthenticationService.Login(vm.email, vm.password, function (result) {
                console.log(result);
                if (result.status == true) {
                    $location.path("/");
                }
                else 
                {
                    vm.result = result; 
                }
            });
        }

        function register()
        {
            var params = {email: vm.email, password: vm.password};
            AuthenticationService.Register(params, function(result)
            {
                vm.result = result; 
            });
        }

    }
})();