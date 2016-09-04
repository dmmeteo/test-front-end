(function() {
	'use strict';
	angular
		.module('UserListApp')
		.controller('UserListCtrl', ['UserFactory', UserListCtrl]);

		function UserListCtrl(UserFactory){
			var vm = this;
			vm.users = UserFactory;
		};
})();