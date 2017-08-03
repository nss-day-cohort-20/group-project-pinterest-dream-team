'use strict';

pinterestApp.factory("PinterestFactory", function($q, $http, FirebaseUrl, UserFactory) {


	let getPics = () => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/images.json`)
			.then( (picData) => {
				resolve(picData);
			})
			.catch( (err) => {
				console.log("oops error");
				reject(err);
			});
		});
	};

	let getUserPics = (boardId) => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/pins.json?orderBy="bid"&equalTo="${boardId}"`)
			.then( (boardPicData) => {
				resolve(boardPicData);
			})
			.catch( (err) => {
				reject(err);
			});
		});
	};


	let putPics = (pinnedPic) => {
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


	let getBoards = () => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/boards.json?orderBy="uid"&equalTo="${UserFactory.getUser()}"`)
			.then( (boardData) => {
				resolve(boardData);
			})
			.catch( (err) => {
				console.log("oops error");
				reject(err);
			});
		});
	};

	let getSingleBoard = (boardId) => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/boards/${boardId}.json`)
			.then( (boardData) => {
				resolve(boardData);
			})
			.catch( (err) => {
				console.log("oops error");
				reject(err);
			});
		});
	};


	let postNewPhotos = (newPic) => {
		return $q( (resolve, reject) => {
			$http.post(`${FirebaseUrl}/images.json`,
				angular.toJson(newPic))
			.then( (newPicData) => {
				resolve(newPicData);
			})
			.catch( (error) => {
				reject(error);
			});
		});
	};


	let deletePhotos = (picId, picBid) => {
		console.log("you hit delete", picId);
		console.log("you hit delete", picBid);
		return $q( (resolve, reject) => {
				console.log("???", picId);
				$http.delete(`${FirebaseUrl}/pins`)
				.then( (data) => {
					console.log("??? part 2", data);
					resolve(data);
				})
				.catch( (error) => {
					reject(error);
				});

				console.log("no dice");
		});
	};


	return { getPics, putPics, getUserPics, postNewBoards, postNewPhotos, getBoards, getSingleBoard, deletePhotos };





});
