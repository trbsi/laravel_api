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
                .then(
                    function (response) {
                        console.log(response.data);
                    callback(response.data);
                });
        }

        function editProfile(params, callback) {
            $http.post('api/employee/edit', params)
                .then(
                    function (response) {
                    callback(response.data.status);
                });
        }


    }

})();