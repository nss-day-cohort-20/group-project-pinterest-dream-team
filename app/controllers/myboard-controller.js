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
            // console.log("my board arr", myBoardsArr);
            // PinterestFactory.getUserPics();
            $scope.myBoards = myBoardsArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

    $scope.fetchSingleBoard = function(boardId) {
        let myBoardsArr = [];
        console.log("route board id", boardId);
        PinterestFactory.getSingleBoard(boardId)
        .then( (myBoardsList) => {
            let myBoardsData = myBoardsList.data;
            console.log("data", myBoardsData);
            // Object.keys(myBoardsData).forEach( (key) => {
            //     myBoardsData[key].id = key;
            //     myBoardsArr.push(myBoardsData[key]);
            // });
            console.log("board arr", myBoardsArr);
            // fetchUserPics(boardId);
            $scope.myBoards = myBoardsData;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    };

});