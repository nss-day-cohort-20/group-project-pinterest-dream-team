'use strict';

pinterestApp.controller("MyBoardController", function($scope, $window, PinterestFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
    .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchMyPics();
    });

    function fetchMyPics() {
        let myPicArr = [];
        PinterestFactory.getUserPics(currentUser)
        .then( (myPicList) => {
            let myPicData = myPicList.data;
            // console.log("data", picList);
            Object.keys(myPicData).forEach( (key) => {
                myPicData[key].id = key;
                myPicArr.push(myPicData[key]);
            });
            $scope.myPics = myPicArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

});