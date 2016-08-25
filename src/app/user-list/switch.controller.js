(function() {
	'use strict';
	angular
		.module('UserListApp')
		.controller('SwitchCtrl', SwitchCtrl);

		function SwitchCtrl(){
			this.layout = 'list';
		}
})();