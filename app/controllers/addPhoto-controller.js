'use strict';

pinterestApp.controller("AddphotosController", function($scope, $window, PinterestFactory) {

	$scope.formTitle = "Upload New Photo";

	$scope.createPic = {
		title: "",
		url: ""
	};


	$scope.uploadPhoto = () => {
		console.log("1");
		PinterestFactory.postNewPhotos($scope.createPic)
		.then( (data) => {
			console.log("did it work?", data);
			$window.location.href = '#!/home';
		});
	};

});