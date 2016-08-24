(function() {
	'use strict';
	angular
		.module('DemoApp')
		.controller('UserListCtrl', UserListCtrl);

		function UserListCtrl($scope, $http){
			$http.get('json/users.json').success(function(data) {
			    $scope.users = data;
			});

		}
})();