angular.module('tp.main',[])

.controller('MainCtrl', function($scope, $stateParams, $http){
	$scope.data = [];

	//fetch all retailers data
	$scope.fetchAll = function(){
		$http({
			method: 'GET',
			url: 'api/retailers'
		})
		.then(function(retailers){
			$scope.data = retailers.data;
		})
	};
})

.directive('tpMain',function($window){
  return {
    restrict: 'EA',
    scope: false,
    replace: true,
    templateUrl:'../app/main/main.html',
    link: function(scope, el, attr){
    }
  }
})