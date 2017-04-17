(function()
{
    'use strict';
    angular.module('myApp').factory('UserService', Service);

    function Service($http, $localStorage)
    {
        var service = {};
        service.getUsers = getUsers;
        service.deleteUser = deleteUser;

        return service;

        function getUsers(callback)
        {
            $http.get('api/admin/index')
            .success(function(response)
            {
                callback(response);
            });
        }

        function deleteUser(user_id, callback)
        {
            $http.post('api/admin/destroy', {id: user_id})
            .success(function(response)
            {
                callback(response.status);
            });
        }

    }

})();