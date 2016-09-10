(function() {
	'use strict';
	
	angular
		.module('PaginationApp')
		.controller('PaginationCtrl', ['PaginationFactory','$routeParams',PaginationCtrl]);

		function PaginationCtrl(PaginationFactory,$routeParams) {
			var vm = this,
					f = PaginationFactory;
			//List of links from factory
			vm.getPaginationList = f.getPaginationList();
			//Show page after click in pagonation bar
			vm.showPage = function(page){
				if (page === 'prev') {
					return f.getPrevPage();
				} else if (page === 'next') {
					return f.getNextPage();
				} else {
					return f.getPage(page);
				}
			};
			//Change class in pagination links
			vm.activePage = function() {
				return f.activePage();
			};
			//Controle links where page = 'prev' or 'next'
			vm.stepControl = function(page) {
				if (page === 'prev' || 'next') {
					return f.currentPage+1;
				} else {
					return page+1;
				}
			};
		}
})();