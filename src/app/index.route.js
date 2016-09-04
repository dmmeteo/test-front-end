(function() {
	'use strict';
	angular
		.module('DemoApp')
		.config (function($routeProvider){

		$routeProvider
			.when ('/', {
				templateUrl: 'templates/home/home.html',
				controller: 'TaskListCtrl',
				controllerAs: 'home'
			})
			.when ('/user-list', {
				templateUrl: 'templates/user-list/user-list.html',
				controller: 'UserListCtrl',
				controllerAs: 'user'
			})
			.when ('/user-add', {
				templateUrl: 'templates/user-add/user-add.html',
				controller: 'UserAddCtrl',
				controllerAs: 'data'
			})
			.when ('/about', {
				templateUrl: 'templates/about/about.html',
				controller: ''
			})
			.when ('/user-info/:userId', {
				templateUrl: 'user.html',
				controller: ''
			})
			.otherwise({redirectTo:'/'});
	});
})();