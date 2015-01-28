angular.module('tp.factories',[])

.factory('Map', function($http){

})

.factory('Auth',function($http, $location, $window){
	var auth = {};

	auth.signin = function(login){
		return $http({
			method: 'POST',
			url: '/api/users/signin',
			data: login
		})
		.then(function(resp){
			return resp.data.token;
		});
	};

	auth.signup = function(user){
		return $http({
			method: 'POST',
			url: '/api/users/signup',
			data: user
		})
		.then(function(resp){
			return resp.data.token;
		});
	};

	auth.isAuth = function(){
		return !!$window.localStroage.getItem('com.triumpet.token') && !!$window.localStroage.getItem('com.triumpet.username');
	};

	auth.signout = function(){
		$window.localStorage.removeItem('com.triumpet.token');
		$window.localStorage.removeItem('com.triumpet.username');
		//TODO: enter a redirect route
	};

	return auth;
})
