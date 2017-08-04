'use strict';

pinterestApp.controller("PinController", function($timeout, $q, $scope, $window, $routeParams, PinterestFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
    .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchUserPics($routeParams.boardId);
    });


    function fetchUserPics(boardId) {
        let userPicArr = [];
        PinterestFactory.getUserPics(boardId)
        .then( (picList) => {
            console.log("pic list", picList);
            let picData = picList.data;
            Object.keys(picData).forEach( (key) => {
                // takes firebase id and stores it in object
                picData[key].fbid = key;
                userPicArr.push(picData[key]);
            });
            $timeout( function() {
                $scope.myPics = userPicArr;
                console.log("scope pics", $scope.myPics);
                
            }, 500);
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

    $scope.deleteThisPhoto = (picfbid, picBid) => {
        PinterestFactory.deletePhoto(picfbid)
        .then( (data) => {
            console.log("pic deleted", picBid);
            fetchUserPics(picBid);
        });
    };

});
