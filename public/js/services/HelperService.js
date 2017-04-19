(function () {
    'use strict';
    angular.module('myApp').factory('HelperService', Service);

    function Service($http, $localStorage) {
        var service = {};
        service.formatErrorResponse = formatErrorResponse;
        return service;

        function formatErrorResponse(response) {
            if (response.data.error) {
                var msg = [];
                var res_tmp = {};
                angular.forEach(response.data.error.errors, function (value, key) {
                    angular.forEach(value, function (message, key) {
                        msg.push(message);
                    });
                });

                res_tmp.message = msg;
                res_tmp.status = false;
                return res_tmp;
            }

            return false;
        }

    }

})();