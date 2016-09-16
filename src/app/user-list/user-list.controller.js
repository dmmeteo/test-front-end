(function() {
	'use strict';
	angular
		.module('UserListApp')
		.controller('UserListCtrl', ['UserFactory','$http', UserListCtrl]);

		function UserListCtrl(UserFactory,$http){
			var vm = this;
			vm.users = UserFactory;

		};
})();