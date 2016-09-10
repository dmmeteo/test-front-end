(function(){
	'use strict';
	angular
		.module('DemoApp')
		.config (function($routeProvider){

		$routeProvider
			.when ('/', {
				templateUrl: 'app/home/home.html',
				controller: 'TaskListCtrl',
				controllerAs: 'home'
			})
			.when ('/user-list', {
				templateUrl: 'app/user-list/user-list.html',
				controller: 'UserListCtrl',
				controllerAs: 'user'
			})
			.when ('/user-list/:page', {
				templateUrl: 'app/user-list/user-list.html',
				controller: 'UserListCtrl',
				controllerAs: 'user'
			})
			.when ('/user-add', {
				templateUrl: 'app/user-add/user-add.html',
				controller: 'UserAddCtrl',
				controllerAs: 'data'
			})
			.when ('/user/:userId', {
				templateUrl: 'app/user-info/user-info.html',
				controller: 'UserInfoCtrl',
				controllerAs: 'info'
			})
			.when ('/about', {
				templateUrl: 'app/about/about.html',
				controller: ''
			})
			.otherwise({redirectTo:'/'});
	});
})();