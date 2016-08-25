(function() {
	'use strict';
	angular
		.module('PaginatorApp')
		.directive('paginator', paginator);


		function paginator(){
			return {
				restrict: "E",
				scope: {navigation: '='},
				controller: 'PaginatorCtrl',
			    controllerAs: 'pages',
				templateUrl: 'app/components/paginator/paginator.template.html',
				link: link
			};

			function link() {
				console.log('paginator derectiv');
			};

		}
})();