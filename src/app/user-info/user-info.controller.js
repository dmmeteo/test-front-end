(function() {
	'use strict';
	angular
		.module('UserInfoApp')
		.controller('UserInfoCtrl', ['$routeParams','UserFactory', UserInfoCtrl]);

		function UserInfoCtrl($routeParams,UserFactory){
			var vm = this;
			//Get user id from routeParams
			vm.userId = $routeParams.userId;
			//Get users arrey from UserFactory
			vm.users = UserFactory;
			//Get user form UserFactory where id is userId
			vm.userInfo = vm.users[vm.userId];
		};
})();