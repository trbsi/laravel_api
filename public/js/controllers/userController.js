(function () {
    'use strict';

    angular.module('myApp').controller('userController', Controller);

    function Controller($location, $scope, UserService, NgTableParams) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.addUser = addUser;
        getUsers();

        function getUsers() {
            UserService.getUsers(function (result) {
                vm.tableParams = new NgTableParams({}, {dataset: result.users});
            });
        }

        function addUser() {
            var params = {email: vm.email, password: vm.password, name: vm.name, surname: vm.surname, address: vm.address};
            UserService.addUser(params, function (result) {
                vm.result = result;
            });
        }

        function deleteUser(index, userId) {
            UserService.deleteUser(userId, function (result) {
                if (result == true) {
                    vm.tableParams.data.splice(index, 1);
                }
            });
        }

    }
})();