(function() {
	'use strict';
	angular
		.module('PaginatorApp',[])
		.filter('startFrom', startFrom);
			
		function startFrom(){
  			return function(input, start){
    			start = +start;
    			if (input === undefined) {
    				console.log('input is '+input+' start is '+start)
    			} else return input.slice(start);
  			}
  		};
})();