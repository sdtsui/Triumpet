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
app.directive('mapViz', function(){




});






// app.config(function($routeProvider){
//   $routeProvider.when("/",
//     {
//       templateUrl: "app.html",
//       controller: "AppCtrl"
//     }
//   );
// });

