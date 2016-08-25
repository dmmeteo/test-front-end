(function() {
	'use strict';
	angular
		.module('PaginatorApp')
		.controller('UserListCtrl', ['$routeParams', '$rootScope', UserListCtrl]);

		function UserListCtrl($routeParams, $rootScope){
			var vm = vm; 
			vm.link = $routeParams; //параметр страницы

			if (vm.link.page === undefined){ //проверка существования страници
				vm.link.page = 0;
			}
			vm.link.page = parseInt(vm.link.page, 10); //приведения всех значений в десятичные

		    vm.currentPage = vm.link.page; //текущая страница равна адрессной строке
		    vm.itemsPerPage = 5; //максимальное колличество обектов на странице
		    vm.items = []; //элементы отображения

		    for(var i = 0; i < $rootScope.users.length; i++){
    			vm.items.push(i); //пушим количество элементов users
  			};
			vm.firstPage;
			vm.lastPage;
			vm.numberOfPages;
			vm.startingItem;
			vm.pageBack;
			vm.pageForward;
			vm.toFirstPage;

		  	vm.firstPage = function() {
		    	return vm.currentPage === 0;
		  	};
		  	
		  	vm.lastPage = function() {
		    	var lastPageNum = Math.ceil($rootScope.users.length / vm.itemsPerPage - 1);
		    	return vm.currentPage === lastPageNum;
		  	};
		  
		  	vm.numberOfPages = function(){
		    	return Math.ceil($rootScope.users.length / vm.itemsPerPage);
		  	};
		  
		  	vm.startingItem = function() {
		    	return vm.currentPage * vm.itemsPerPage;
		  	};
		  
		  	vm.pageBack = function() {
		    	vm.currentPage = vm.currentPage - 1;
		  	};
		  	
		  	vm.pageForward = function() {
		    	vm.currentPage = vm.currentPage + 1;
		  	};

		    vm.toFirstPage = function() {
		        vm.currentPage = 0;
		    };
		};
})();