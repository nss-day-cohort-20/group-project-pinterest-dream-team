'use strict';

pinterestApp.controller("HomeController", function($scope, $window, PinterestFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
    .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchPics();
    });

    function fetchPics() {
        let picArr = [];
        PinterestFactory.getPics()
        .then( (picList) => {
            console.log("data", picList);
            let picData = picList.data;
            Object.keys(picData).forEach( (key) => {
                picData[key].id = key;
                picArr.push(picData[key]);
            });
            $scope.pics = picArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
    }

    $scope.pinPics = () => {
        console.log(currentUser);
        PinterestFactory.putPics();
    };


});