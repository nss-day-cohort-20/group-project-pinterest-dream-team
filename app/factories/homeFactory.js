'use strict';

pinterestApp.factory("PinterestFactory", function($q, $http, FirebaseUrl, UserFactory) {


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

	let getUserPics = (boardId) => {
		console.log("boardid", boardId);
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/pins.json?orderBy="bid"&equalTo="${boardId}"`)
			.then( (boardPicData) => {
				console.log("pic data", boardPicData.data);
				resolve(boardPicData);
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


	let getBoards = () => {
		// console.log(FirebaseUrl);
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/boards.json?orderBy="uid"&equalTo="${UserFactory.getUser()}"`)
			.then( (boardData) => {
				// console.log(picData);
				resolve(boardData);
			})
			.catch( (err) => {
				console.log("oops error");
				reject(err);
			});
		});
	};

	let getSingleBoard = (boardId) => {
		console.log("boardId", boardId);
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/boards/${boardId}.json`)
			.then( (boardData) => {
				// console.log(picData);
				resolve(boardData);
			})
			.catch( (err) => {
				console.log("oops error");
				reject(err);
			});
		});
	};


	let postNewPhotos = (newPic) => {
		console.log("2");
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
