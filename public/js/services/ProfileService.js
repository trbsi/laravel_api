(function () {
    'use strict';
    angular.module('myApp').factory('ProfileService', Service);

    function Service($http, $localStorage) {
        var service = {};
        service.getProfile = getProfile;
        service.editProfile = editProfile;

        return service;

        function getProfile(callback) {
            $http.get('api/employee/show')
                .success(function (response) {
                    callback(response);
                });
        }
        function editProfile(params, callback) {
            $http.post('api/employee/edit', params)
                .success(function (response) {
                    callback(response.status);
                });
        }


        
    }

})();