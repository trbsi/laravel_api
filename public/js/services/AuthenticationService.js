(function()
{
    'use strict';
    angular.module('myApp').factory('AuthenticationService', Service);

    function Service($http, $localStorage)
    {
        var adminRoles = [1];
        var otherRoles = ['user'];

        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.validateRoleAdmin = validateRoleAdmin;

        return service;

        function validateRoleAdmin() {
            return adminRoles.indexOf($localStorage.currentUser.role) >= 0;
        }

        function Login(email, password, callback)
        {
            $http.post('api/auth/login', {email: email, password: password})
            .success(function(response)
            {

                if(response.token)
                {
                    $localStorage.currentUser = {email: email, token:response.token, role: response.role};
                    $http.defaults.headers.common.Authorization = 'Bearer '+response.token;

                    callback(true);
                }
                else
                {
                    callback(false);
                }
            });
        }

        function Logout()
        {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }

})();