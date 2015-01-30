angular.module('tp.editor',[])

.controller('EditorCtrl', function($scope, $stateParams, $http, Map, Item){
  angular.extend($scope,Map,Item);
  $scope.data = {};
  // $scope.items = [];
  $scope.scale = 15;

  $scope.updateAll = function(){
    Map.update($scope.data.username, $scope.data);
  };

  $scope.delete = function(index, attr){
    $scope.data[attr].splice(index,1);
  };

  if($stateParams.retailer){ 
    Map.fetch($stateParams.retailer)
      .then(function(data){
        $scope.data = data;
        Map.drawFloorPlan($scope.data.floorPlan, $scope.scale, $scope.svg);
        Map.drawShelves($scope.data.shelves, $scope.scale, $scope.svg);
      })
    Item.fetchItems($stateParams.retailer)
      .then(function(items){
        $scope.items = items;
      })
  }
  // $scope.device = navigator.userAgent;
})

//Editor
.directive('tpEditor',function($window){
  return {
    restrict: 'EA',
    scope: false,
    replace: true,
    templateUrl:'../app/editor/editor.html',
    link: function(scope, el, attr){
      var width = $window.innerWidth;
      var height = $window.innerHeight;
      scope.svg = d3.select('#map-main').append('svg')
        .attr('id','map-svg')

    }
  }
})

//Floor Plan
.directive('tpFloorPlan',function($window, Map){
  return {
    restrict: 'EA',
    scope: false,
    templateUrl:'../app/editor/floorplan.html',
    link: function(scope, el, attr){
      var width = $window.innerWidth;
      var height = $window.innerHeight;
      scope.svg.on('click',function(){
          var x = d3.mouse(this)[0]/scope.scale;
          var y = d3.mouse(this)[1]/scope.scale;
          scope.data.floorPlan.push({
            x:x,
            y:y
          });
          Map.drawFloorPlan(scope.data.floorPlan, scope.scale, scope.svg);
          scope.$apply();
        });
    }
  }
})

//Shelves
.directive('tpShelves',function($window, Map){
  return {
    restrict: 'EA',
    scope: false,
    templateUrl:'../app/editor/shelves.html',
    link: function(scope, el, attr){
      var width = $window.innerWidth;
      var height = $window.innerHeight;
      scope.svg.on('click',function(){
          var x = d3.mouse(this)[0]/scope.scale;
          var y = d3.mouse(this)[1]/scope.scale;
          scope.data.shelves.push({
            x:x,
            y:y,
            width:2,
            height:6
          });
          Map.drawShelves(scope.data.shelves, scope.scale, scope.svg);
          scope.$apply();
        });
    }
  }
})

//Items
.directive('tpItems',function($window, Map){
  return {
    restrict: 'EA',
    scope: false,
    templateUrl:'../app/editor/items.html',
    link: function(scope, el, attr){
      var width = $window.innerWidth;
      var height = $window.innerHeight;
      scope.svg.on('click',function(){
          var x = d3.mouse(this)[0]/scope.scale;
          var y = d3.mouse(this)[1]/scope.scale;
          scope.items.push({
            name:'undefined',
            category:'undefined',
            coordinates:[{
              x:x,
              y:y
            }]
          });
          scope.$apply();
        });
    }
  }
})