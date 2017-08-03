'use strict';

pinterestApp.controller("PinController", function($scope, $window, $routeParams, PinterestFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
    .then( (user) => {
        console.log("user", user);
    currentUser = UserFactory.getUser();
    fetchUserPics($routeParams.boardId);
    });


    function fetchUserPics(boardId) {
        let userPicArr = [];
        console.log("route board", boardId);
        PinterestFactory.getUserPics(boardId)
        .then( (picList) => {
            let picData = picList.data;
            console.log("data", picList);
            Object.keys(picData).forEach( (key) => {
                // picData[key].id = key;
                userPicArr.push(picData[key]);
            });
            $scope.myPics = userPicArr;
            console.log("scope pics", $scope.myPics);
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

});
