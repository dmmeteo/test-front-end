(function(){
	'use strict';
	angular
		.module('DemoApp')
		.config (['$routeProvider', function($routeProvider){

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
			.when ('/user-list/:page', {
				templateUrl: 'templates/user-list/user-list.html',
				controller: 'UserListCtrl',
				controllerAs: 'user'
			})
			.when ('/user-add', {
				templateUrl: 'templates/user-add/user-add.html',
				controller: 'UserAddCtrl',
				controllerAs: 'data'
			})
			.when ('/user/:userId', {
				templateUrl: 'templates/user-info/user-info.html',
				controller: 'UserInfoCtrl',
				controllerAs: 'info'
			})
			.when ('/about', {
				templateUrl: 'templates/about/about.html',
				controller: ''
			})
			.otherwise({redirectTo:'/'});
	}]);
})();