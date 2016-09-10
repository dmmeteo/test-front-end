(function() {
	'use strict';

		angular
		.module('PaginationApp')
		.directive('paginationDir', paginationDir);

		function paginationDir() {
			return {
				templateUrl: 'app/components/pagination/pagination.template.html',
				link: function(scope, iElement, iAttrs) {
					//body...
				}
			}//end return
		}
})();