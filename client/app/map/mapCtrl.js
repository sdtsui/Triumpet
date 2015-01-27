angular.module('tp.map',[])

.controller('MapCtrl', function($scope){
  $scope.userLoc;
  $scope.items;

  //needs to be able to fetch the items from the database and cache them in items
  $scope.getItems = function(){
    
  };

})
