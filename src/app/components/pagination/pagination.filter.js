(function(){
	'use strict';
	angular
		.module('PaginationApp')
		.filter('itemsPerPage', ['$filter','PaginationFactory',itemsPerPage]);

		function itemsPerPage($filter,PaginationFactory){
			return function(input, limitItems){
				if (input !== undefined){
					var f = PaginationFactory,
							startFrom = f.startingItem;

					//передача данных input в фабрику
					f.itemsPerPage = limitItems;
					f.items = input;
					
					return $filter('limitTo')(input.slice(startFrom), limitItems);
				}
				return [];
			}
		}
})();