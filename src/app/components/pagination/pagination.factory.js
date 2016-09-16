(function() {
	'use strict';
	
	angular
		.module('PaginationApp')
		.factory('PaginationFactory', PaginationFactory);

		function PaginationFactory(){
			return {
				currentPage: 0,
				itemsPerPage: 0,
				items: 0,
				startingItem: 0,

				getTotalPagesNum: function() {
					return Math.ceil( this.items.length / this.itemsPerPage );
				},//end getTotalPagesNum

				getPage: function(num) {
						var num = angular.isUndefined(num) ? 0 : num;
						var start = this.itemsPerPage * num;
						this.currentPage = num;
						return this.startingItem = start;
					},//end getPage

				getPaginationList: function() {
					var pagesNum = this.getTotalPagesNum();
					var paginationList = [];
					//button "farword"
					paginationList.push({
						name: '<<',
						link: 'prev'
					});
					//arrey pages
					for (var i = 0; i < pagesNum; i++) {
						var name = i + 1;
						paginationList.push({
							name: name,
							link: i
						});
					};
					//button "next"
					paginationList.push({
						name: '>>',
						link: 'next'
					});
					//if arrey pages not need
					if (pagesNum >= 2) {
						return paginationList;
					} else {
						return null;
					}
				},//end getPaginationList

				getPrevPage: function() {
					var prevPageNum = this.currentPage - 1;
					if ( prevPageNum < 0 ) prevPageNum = 0;
					return this.getPage( prevPageNum );
				}, //end getPrevPage

				getNextPage: function() {
					var nextPageNum = this.currentPage + 1;
					var pagesNum = this.getTotalPagesNum();
					if ( nextPageNum >= pagesNum ) nextPageNum = pagesNum - 1;
					return this.getPage( nextPageNum );
				},//end getNextPage

				activePage: function() {
					return this.currentPage;
				}//end activePage
			}
		}//end PaginationFactory
})();