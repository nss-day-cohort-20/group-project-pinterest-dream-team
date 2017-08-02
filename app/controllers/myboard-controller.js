'use strict';

pinterestApp.controller("MyBoardController", function($scope, $window, $routeParams, PinterestFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
    .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchMyBoards();
    });

    function fetchMyBoards() {
        let myBoardsArr = [];
        PinterestFactory.getBoards()
        .then( (myBoardsList) => {
            let myBoardsData = myBoardsList.data;
            // console.log("data", picList);
            Object.keys(myBoardsData).forEach( (key) => {
                myBoardsData[key].id = key;
                myBoardsArr.push(myBoardsData[key]);
            });
            console.log("my board arr", myBoardsArr);
            $scope.myBoards = myBoardsArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

    function fetchSingleBoard() {
        let myBoardsArr = [];
        PinterestFactory.getSingleBoard($routeParams.boardId)
        .then( (myBoardsList) => {
            let myBoardsData = myBoardsList.data;
            // console.log("data", picList);
            Object.keys(myBoardsData).forEach( (key) => {
                myBoardsData[key].id = key;
                myBoardsArr.push(myBoardsData[key]);
            });
            $scope.myBoards = myBoardsArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

    $scope.pinPics = (boardId, pic) => {
        // console.log(pic);
        pic.uid = currentUser;
        pic.bid = boardId;
        // pic.boardId = currentUser + uniqueId;
        let pinnedPic = pic;
        console.log("is this it", pinnedPic);
        PinterestFactory.putPics(pinnedPic);
  };

});