(function () {
    'use strict';

    angular.module('myApp').controller('profileController', Controller);

    function Controller($location, $scope, ProfileService) {
        var vm = this;
        vm.editProfile = editProfile;

        getProfile();

        function getProfile() {
            ProfileService.getProfile(function (result) {
                vm.profile = result;
            });
        }

        function editProfile() {
            var params = {name: vm.profile.name, surname: vm.profile.surname, address: vm.profile.address};
            ProfileService.editProfile(params, function (result) {
                if(result == true)
                {
                    alert("OK");
                }
                else
                {
                    alert("NOT OK");
                }
            });
        }

    }
})();