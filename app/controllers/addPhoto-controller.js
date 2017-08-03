'use strict';

pinterestApp.controller("AddphotosController", function($scope, $window, PinterestFactory) {

	$scope.formTitle = "Upload New Photo";

	$scope.createPic = {
		title: "",
		url: ""
	};


	$scope.uploadPhoto = () => {
		PinterestFactory.postNewPhotos($scope.createPic)
		.then( (data) => {
			$window.location.href = '#!/home';
		});
	};



});