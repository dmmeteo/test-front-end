(function() {
	'use strict';

	angular
		.module('DemoApp')
		.controller('TaskListCtrl', TaskListCtrl);
	
	function TaskListCtrl($scope, $sce){
		var vm = this;
		var url = function(link){ 			//сервис проверки сайтов
			return $sce.trustAsResourceUrl(link);
		};
		return $scope.tasks = [
			{name: 'Задание 1', height: '350', src: url('http://jsfiddle.net/dmmeteo/0Lvbe5ek/embedded/result,html,css,js/')},
			{name: 'Задание 2', height: '750', src: url('http://jsfiddle.net/dmmeteo/vdqnkknb/embedded/result,html,css,js/')},
			{name: 'Задание 3', height: '450', src: url('http://jsfiddle.net/dmmeteo/fv2bsj4x/embedded/result,html,css,js/')},
			{name: 'Задание 4', height: '450', src: url('http://jsfiddle.net/dmmeteo/m510ffq9/embedded/result,html,css,js/')}
		];
	};
})();