(function() {
	'use strict';
	
	angular
		.module('DemoApp', [
			//npm modules
			'ngRoute',
			'720kb.datepicker',

			//components
			'UserApp',
			'PaginationApp',

			//custom modules
			'TaskApp',
			'UserListApp',
			'UserAddApp',
			'UserInfoApp'
			]);
})();