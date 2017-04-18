(function () {
    'use strict';
    angular.module('myApp').factory('UserService', Service);

    function Service($http, $localStorage) {
        var service = {};
        service.getUsers = getUsers;
        service.deleteUser = deleteUser;

        return service;

        function getUsers(callback) {
            $http.get('api/admin/index')
                .then(function (response) {
                    callback(response.data);
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