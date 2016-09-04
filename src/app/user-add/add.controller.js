(function() {
	'use strict';
	
	angular
		.module('UserAddApp', [])
		.controller('UserAddCtrl', ['$filter','UserFactory', UserAddCtrl]);

		function UserAddCtrl($filter, UserFactory){
			var vm = this;
			vm.alert = false;
			vm.users = UserFactory;
			vm.usersNumber = UserFactory.length;
			vm.today = $filter('date')(new Date, "dd/MM/yyyy");
			vm.saveUser = function(){
		        vm.users.push({
		        	id: vm.usersNumber,
		        	register: vm.today,
		        	firstName: vm.firstname,
		        	lastName: vm.secondname,
		        	birth: vm.birth,
		        	sex: vm.sex,
		        	photo: vm.photo,
		        	about: vm.about
		        });
		        vm.firstname = '';
				vm.secondname = '';
				vm.birth = '';
				vm.sex = '';
				vm.photo = '';
				vm.about = '';
				vm.alert = true;
			};
		}
})();