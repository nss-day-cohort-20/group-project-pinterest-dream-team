'use strict';

pinterestApp.factory("PinterestFactory", function($q, $http, FirebaseUrl) {

	let getPics = () => {
		console.log("getPics");
		// console.log(FirebaseUrl);
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/images.json`)
			.then( (picData) => {
				console.log(picData);
				resolve(picData);
			})
			.catch( (err) => {
				console.log("oops error");
				reject(err);
			});
		});
	};
	
	let putPics = () => {
		console.log("you just hit pin it!");
	};
	

	return { getPics, putPics };


});
