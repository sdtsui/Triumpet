'use strict';

angular.module('triumpet', [
  'tp.factories',
  'tp.auth',
  'tp.editor',
  'tp.map',
  'ui.router'
])

// configures routes for the app
.config(function($stateProvider){
  $stateProvider
    .state('home',{
      url         : '/',
      templateUrl : "",
      controller  : ""
    })
    .state('home.signup',{
      url         : '/signup',
      tempalte    : '',
      controller  : ''
    })
})

// this directive will be for rendering the svg map using d3 and updating it as needed
.directive('tpMapViz', function(){
  // define svg constants here, width/height 
  return {
    restrict: 'AE',
    link: function(scope, element, attrs) {

    }
  }
});
