angular.module('mainController', [])
	.controller('mainController', function($scope, $http, Login) {
		// object to hold all the data for the new comment form
		$scope.loginData = {};


		// function to handle submitting the form
		$scope.submitLogin = function() {
			
			Login.post($scope.loginData)
				.success(function(getData) {
					$scope.comments = getData;
					console.log(getData);
				});
/*
			// save the comment. pass in comment data from the form
			Comment.save($scope.commentData)
				.success(function(data) {
					$scope.commentData = {};
					// if successful, we'll need to refresh the comment list
					Comment.get()
						.success(function(getData) {
							$scope.comments = getData;
							$scope.loading = false;
						});

				})
				.error(function(data) {
					console.log(data);
				});*/
		};

	});