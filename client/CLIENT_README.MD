# Triumpet Client Documentation #
>There are 3 factories: ```map```, ```item```, and ```auth```.  
>Reminder: Connect new controllers to these factories with the following pattern:  
```angular.module('moduleName', []).controller('controllerName', function($scope, FactoryNames){angular.extend($scope, FactoryNames)});```

## ```Map``` Factory ##
  ```update``` and ```fetch``` perform GET and PUT requests for data relevant to the map.

  Interacts with ```EditorCtrl``` controller by converting a retailer's ```floorPlan``` to a string, and using that string to render shapes in d3.

## ```Item``` Factory ##
  ```update``` and ```fetchItems``` perform GET and PUT requests for items.

  ```EditorCtrl``` and ```MapCtrl``` interact with this factory separately, to draw items. Please see commenting in those controllers for more information.

## ```Auth``` Factory ##
  ```signin``` functions handle auth-related post requests for all users, including retailers.
  Signups are handled identically.  

  Reads and manipulates jwt tokens, determining whether the logged in user is a retailer.
