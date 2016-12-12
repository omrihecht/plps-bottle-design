// JavaScript Document

var aventBottles = angular.module( 'aventBottles' , ['ngRoute' , 'ngTouch' , 'mn'] );

aventBottles.config(function ( $routeProvider ) {
	$routeProvider
		.when('/home',{
			controller: 'Home',
			templateUrl: function(){
				return 'partials/home.html'
			}
		})
		.when('/gallery',{
			controller: 'Gallery',
			templateUrl: function(){
				return 'partials/gallery.html'
			}
		})
		.when('/login',{
			controller: 'Activity',
			templateUrl: function(){
				return 'partials/activity.html'
			}
		})
		.when('/pick-bottle',{
			controller: 'Activity',
			templateUrl: function(){
				return 'partials/activity.html'
			}
		})
		.when('/pick-cap',{
			controller: 'Activity',
			templateUrl: function(){
				return 'partials/activity.html'
			}
		})
		.when('/add-icons',{
			controller: 'Activity',
			templateUrl: function(){
				return 'partials/activity.html'
			}
		})
		.when('/create-image',{
			controller: 'Activity',
			templateUrl: function(){
				return 'partials/activity.html'
			}
		})
		.when('/save-image',{
			controller: 'Activity',
			templateUrl: function(){
				return 'partials/activity.html'
			}
		})
		.when('/thanks',{
			controller: 'Activity',
			templateUrl: function(){
				return 'partials/activity.html'
			}
		})
		.otherwise({ redirectTo: '/home' });
});

aventBottles.factory( 'dataFactory' , ['$http', function ( $http ){
	var dataFactory = {};

	dataFactory.getDrawData = function(){
		return $http.get('json/draw-data.json' );
	}

	dataFactory.getImgLink = function( userPic ){
		debugger
		return $http({
			method:'POST',
			url:urlBaseServer + 'sendPic/',
			params:{ 'userPic' : userPic },
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})
	}

	dataFactory.sendUser = function( user ){
		return $http({
			method:'POST',
			url:urlBaseServer + 'sendUser/',
			data:$.param(user),
			headers:{ 'Content-Type': 'application/x-www-form-urlencoded' }
		})
	}

	dataFactory.getGallery = function(){
		return $http.get(urlBaseServer + 'getgallery' );
	}

	return dataFactory;

}]);

aventBottles.service( 'service' , function(){

	var userObj = { 'name':'' , 'email' : '' };
	var drawObj = {};
	var bottleImgObj = { 'body_url' : 'images/bottles/bottle-white.png' , 'cap_url' : 'images/caps/white.png' , 'texture_url' : '' };
	var imgTemplatesObj = {};
	var galleryObj = {};

	var setUserObj = function( _userObj ){
		userObj = _userObj;
	}

	var getUserObj = function(){
		return userObj;
	}

	var setDrawObj = function( _drawObj ){
		drawObj = _drawObj;
	}

	var getDrawObj = function(){
		return drawObj;
	}

	var setBottleImgObj = function( _bottleImgObj ){
		bottleImgObj = _bottleImgObj;
	}

	var getBottleImgObj = function(){
		return bottleImgObj;
	}

	var setImgTemplateObj = function( _imgTemplatesObj ){
		imgTemplatesObj = _imgTemplatesObj;
	}

	var getImgTemplateObj = function(){
		return imgTemplatesObj;
	}

	var setGalleryObj = function( _galleryObj ){
		galleryObj = _galleryObj;
	}

	var getGalleryObj = function(){
		return galleryObj;
	}


	return {
		setUserObj: setUserObj,
		getUserObj: getUserObj,
		setDrawObj: setDrawObj,
		getDrawObj: getDrawObj,
		setBottleImgObj: setBottleImgObj,
		getBottleImgObj: getBottleImgObj,
		setImgTemplateObj: setImgTemplateObj,
		getImgTemplateObj: getImgTemplateObj,
		setGalleryObj: setGalleryObj,
		getGalleryObj: getGalleryObj
	};

});
