(function() {
	'use strict';
	angular
		.module('UserListApp')
		.controller('UserListCtrl', ['$http', UserListCtrl]);

		function UserListCtrl($http){
			var vm = this;
			$http.get('json/users.json').success(function(data) {
			    vm.users = data;
			});
		};
})();