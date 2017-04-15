(function()
{
    'use strict';
    angular.module('myApp').factory('AuthenticationService', Service);

    function Service($http, $localStorage)
    {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(email, password, callback)
        {
            $http.post('api/auth/login', {email: email, password: password})
            .success(function(response)
            {

                if(response.token)
                {
                    $localStorage.currentUser = {email: email, token:response.token};
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