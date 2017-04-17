(function () {
    'use strict';
    angular.module('myApp').factory('HelperService', Service);

    function Service($http, $localStorage) {
        var service = {};
        service.formatErrorResponse = formatErrorResponse;
        return service;

        function formatErrorResponse(response) {
            if (response.error) {
                var msg = [];
                var res_tmp = {};
                angular.forEach(response.error.errors, function (value, key) {
                    angular.forEach(value, function (message, key) {
                        msg.push(message);
                    });
                });

                res_tmp.message = msg;
                return res_tmp;
            }

            return false;
        }

    }

})();