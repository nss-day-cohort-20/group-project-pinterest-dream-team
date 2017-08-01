'use strict';

pinterestApp.controller("MyBoardController", function($scope, $window, PinterestFactory, UserFactory) {

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
            $scope.myBoards = myBoardsArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

});