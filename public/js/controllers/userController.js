(function () {
    'use strict';

    angular.module('myApp').controller('userController', Controller);

    function Controller($location, $scope, UserService, NgTableParams) {
        var vm = this;
        vm.deleteUser = deleteUser;
        getUsers();

        function getUsers() {
            UserService.getUsers(function (result) {
                vm.tableParams = new NgTableParams({}, {dataset: result.users});
            });
        };

        function deleteUser(index, userId) {
            UserService.deleteUser(userId, function (result) {
                if (result == true) {
                    vm.tableParams.data.splice(index, 1);
                }
            });
        };

    }
})();