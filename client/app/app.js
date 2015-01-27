'ues strict';

var app = angular.module('trumpet', []);

// configures routes for the app
app.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: "",
    controller: ""
  });
});

// this directive will be for rendering the svg map using d3 and updating it as needed
app.directive('tpMapViz', function(){
  // define svg constants here, width/height 
  return {
    restrict: 'AE',
  },
  link: function(scope, element, attrs) {

  }
});
