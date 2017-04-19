(function () {
    'use strict';
    angular.module('myApp').factory('UserService', Service);

    function Service($http, $localStorage, HelperService) {
        var service = {};
        service.getUsers = getUsers;
        service.deleteUser = deleteUser;
        service.addUser = addUser;

        return service;

        function getUsers(callback) {
            $http.get('api/admin/index')
                .then(function (response) {
                    callback(response.data);
                });
        }

        function addUser(params, callback) {
            $http.post('api/admin/create', params)
                .then(function (response) {
                    callback(response.data);
                }, 
                function(error, status)
                {
                    error = HelperService.formatErrorResponse(error);
                    callback(error);
                });
        }

        function deleteUser(user_id, callback) {
            $http.post('api/admin/destroy', {id: user_id})
                .then(function (response) {
                    callback(response.data.status);
                });
        }

    }

})();