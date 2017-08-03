'use strict';

pinterestApp.controller("PinController", function($scope, $window, $routeParams, PinterestFactory, UserFactory) {

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
            let picData = picList.data;
            Object.keys(picData).forEach( (key) => {
                userPicArr.push(picData[key]);
            });
            $scope.myPics = userPicArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

    $scope.deleteThisPhoto = (picId, picBid) => {
        console.log(picId);
        console.log(picBid);

        PinterestFactory.deletePhotos(picId, picBid).
        then( (data) => {
            console.log("its working", data);
            // $scope.getMyPics();
        })
        .catch( (data) => {
            console.log("nice try", data);
        });
    };

});
