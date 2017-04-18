(function () {
    'use strict';
    angular.module('myApp').factory('AuthenticationService', Service);

    function Service($http, $localStorage, HelperService) {
        var adminRoles = [1];
        var otherRoles = ['user'];

        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.Register = Register;
        service.validateRoleAdmin = validateRoleAdmin;

        return service;

        function validateRoleAdmin() {
            return adminRoles.indexOf($localStorage.currentUser.role) >= 0;
        }

        function Login(email, password, callback) {
            $http.post('api/auth/login', {email: email, password: password})
                .then(function (response) { //success
                    response = response.data;
                    if (response.token) {
                        $localStorage.currentUser = {email: email, token: response.token, role: response.role};
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                    }

                    callback(response);
                },
                function (response, status) { //error
                    response = HelperService.formatErrorResponse(response)
                    response.status = false;
                    callback(response);
                });
        }

        function Logout() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }

        function Register(params, callback) {
            $http.post('api/auth/signup', params)
                .then(
                    function (response) { //success
                    callback(response.data);
                },
                function (response, status) { //error
                    response = HelperService.formatErrorResponse(response.data)
                    response.status = false;
                    callback(response);
                });
        }
    }

})();