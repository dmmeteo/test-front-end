(function() {
	'use strict';

	angular
		.module('TaskApp')
		.controller('TaskListCtrl', ['$sce', '$http', TaskListCtrl]);
	
	function TaskListCtrl($sce, $http){
		var vm = this;
		vm.url = function(link){ 			//сервис проверки сайтов
			return $sce.trustAsResourceUrl(link);
		};
		vm.tasks = [];
		$http.get('app/json/tasks.json').success(function(data){
			vm.tasks = data;
		});


	};
})();