'use strict';

pinterestApp.factory("PinterestFactory", function($q, $http, FirebaseUrl) {

	let getPics = () => {
		console.log("getPics");
		// console.log(FirebaseUrl);
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/images.json`)
			.then( (picData) => {
				// console.log(picData);
				resolve(picData);
			})
			.catch( (err) => {
				console.log("oops error");
				reject(err);
			});
		});
	};

	let getUserPics = (currentUser) => {
		console.log("uid", currentUser);
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/pins/.json?orderBy="uid"&equalTo="${currentUser}"`)
			.then( (picData) => {
				resolve(picData);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};


	let putPics = (pinnedPic) => {
		console.log("you just hit pin it!");
		return $q( (resolve, reject) => {
			$http.post(`${FirebaseUrl}/pins.json`,
				angular.toJson(pinnedPic))
			.then( (newPicData) => {
				resolve(newPicData);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};
	
	let postNewBoards = (newBoard) => {
		return $q( (resolve, reject) => {
			$http.post(`${FirebaseUrl}/boards.json`,
				angular.toJson(newBoard))
			.then( (newBoardData) => {
				resolve(newBoardData);
			})
			.catch( (error) => {
				reject(error);
			});
		});
	};

	return { getPics, putPics, getUserPics, postNewBoards };



});
