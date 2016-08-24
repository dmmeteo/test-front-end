(function() {
	'use strict';
	angular
		.module('DemoApp')
		.config (function($routeProvider,$locationProvider){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		$routeProvider
			.when ('/', {
				templateUrl: 'templates/home/home.html',
				controller: 'TaskListCtrl'
			})
			.when ('/user-list', {
				templateUrl: 'templates/user-list/user-list.html',
				controller: 'UserListCtrl'
			})
			.when ('/user-add', {
				templateUrl: 'templates/user-add/user-add.html',
				controller: ''
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