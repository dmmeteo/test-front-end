(function() {
	'use strict';
	angular
		.module('DemoApp')
		.controller('SwitchCtrl', SwitchCtrl);

		function SwitchCtrl($scope){
			$scope.layout = 'list';
		}
})();