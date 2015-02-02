angular.module('tp.auth',[])

.controller('AuthCtrl', function($scope, $window, $location, Auth){
	//Creates a retailer. Called on click from retailerSignup.html
	$scope.createRetailer = function(){
		var newRetailer = {
			username  	 : $scope.username,
			password     : $scope.password,
			name         : $scope.name,
			description  : $scope.description,
			phoneNumber  : $scope.phoneNumber,
			address			 : $scope.address
		}
		//Sends a POST request; returns a token on success. See "factories.js". 
		Auth.signupRetailer(newRetailer)
		  .then(function(token){
		  	//Saves token and username to localStorage when sign-up is successful.
		  	$window.localStorage.setItem('retailer.triumpet.token',token);
		  	$window.localStorage.setItem('retailer.triumpet.username',newRetailer.username);
		  	$location.path('/'+newRetailer.username+'/editor/floorplan');
		  })
		  .catch(function(error){
		  	$scope.message = 'Please re-try';
		  	$scope.username = '';
		  	$scope.password = '';
		  	$scope.name = '';
		  	$scope.description = '';
		  	$scope.phoneNumber = '';
		  	$scope.address = '';
		  })
	};
	//Creates a user. Called on click from signup.html (for users, not retailers).
	$scope.create = function(){
		var newUser = {
			username  : $scope.username,
			password  : $scope.password,
			firstName : $scope.firstName,
			lastName  : $scope.lastName,
			email     : $scope.email
		}
		//Sends a POST request. See "factories.js".
		Auth.signup(newUser)
		  .then(function(token){
		  	//Saves a token and username to localStorage when sign-up is successful
		  	$window.localStorage.setItem('com.triumpet.token',token);
		  	$window.localStorage.setItem('com.triumpet.username',newUser.username);
		  	//TODO: add location.path to direct to main page
		  	$scope.message = 'Success';
		  	$scope.username = '';
		  	$scope.password = '';
		  	$scope.firstName = '';
		  	$scope.lastName = '';
		  	$scope.email = '';
		  })
		  .catch(function(error){
		  	$scope.message = 'Please re-try';
		  	$scope.username = '';
		  	$scope.password = '';
		  	$scope.firstName = '';
		  	$scope.lastName = '';
		  	$scope.email = '';
		  })
	};

	//Logs in a user. Called on click, from signin.html (for users).
	$scope.login = function(username, password){
		var login = {
			username: username,
			password: password
		};
		//Sends a POST request. See "factories.js".
		Auth.signin(login)
		  .then(function(token){
		  	//Saves a token and username to localStorage when sign-up is successful.
		  	$window.localStorage.setItem('com.triumpet.token',token);
		  	$window.localStorage.setItem('com.triumpet.username',login.username);
				$scope.message = 'Success';
		  	$scope.username = '';
		  	$scope.password = '';
		  })
		  .catch(function(error){
		  	Auth.signout();
		  	$scope.message = 'Please re-try';
		  	$scope.username = '';
		  	$scope.password = '';
		  })
	};

	//Logs in a Retailer. Called on click, from retailerSignin.html (for retailers).
	$scope.loginRetailer = function(username, password){
		var login = {
			username: username,
			password: password
		};
		//Sends a POST request. See "factories.js".
		Auth.signinRetailer(login)
		  .then(function(token){
		  	//Saves a token and username to localStorage when sign-up is successful.
		  	$window.localStorage.setItem('retailer.triumpet.token',token);
		  	$window.localStorage.setItem('retailer.triumpet.username',login.username);
		  	$location.path('/'+login.username+'/editor/floorplan');
		  })
		  .catch(function(error){
		  	Auth.signout();
		  	$scope.message = 'Please re-try';
		  	$scope.username = '';
		  	$scope.password = '';
		  })
	};
})
//Backdrop for all auth views
.directive('tpAuth',function(){
	return {
		restrict: 'EA',
		scope: '=',
		replace: true,
		templateUrl:'../app/auth/auth.html',
		link: function(scope, el, attr){
		}
	}
})
//sub-view for signing up a new user
.directive('tpSignUp',function(){
	return {
		restrict: 'EA',
		scope: '=',
		templateUrl:'../app/auth/signup.html',
		link: function(scope, el, attr){
		}
	}
})
//sub-view for signing in a user
.directive('tpSignIn',function(){
	return {
		restrict: 'EA',
		scope: '=',
		templateUrl:'../app/auth/signin.html',
		link: function(scope, el, attr){
		}
	}
})
//sub-view for signing up a new retailer
.directive('tpRetailerSignin',function(){
	return {
		restrict: 'EA',
		scope: '=',
		templateUrl:'../app/auth/retailerSignin.html',
		link: function(scope, el, attr){
		}
	}
})
//sub-view for signing in a retailer
.directive('tpRetailerSignup',function(){
	return {
		restrict: 'EA',
		scope: '=',
		templateUrl:'../app/auth/retailerSignup.html',
		link: function(scope, el, attr){
		}
	}
})
