(function(){
	'use strict';
	angular
		.module('PaginationApp')
		.filter('itemsPerPage', ['$filter','PaginationFactory',itemsPerPage]);

		function itemsPerPage($filter,PaginationFactory){
			return function(input, limitItems){
				var f = PaginationFactory,
						startFrom = f.startingItem;

				//передача данных input в фабрику
				f.itemsPerPage = limitItems;
				f.items = input.length;

				if (input){
					return $filter('limitTo')(input.slice(startFrom), limitItems);
				}
				return [];
			}
		}
})();