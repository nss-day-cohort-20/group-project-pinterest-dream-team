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

    $scope.fetchSingleBoard = function(boardId) {
        let myBoardsArr = [];
        PinterestFactory.getSingleBoard(boardId)
        .then( (myBoardsList) => {
            let myBoardsData = myBoardsList.data;
            $scope.myBoards = myBoardsData;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    };

    $scope.pinPics = (boardId, pic) => {
        pic.uid = currentUser;
        pic.bid = boardId;
        let pinnedPic = pic;
        PinterestFactory.putPics(pinnedPic);
  };

});