'use strict';

pinterestApp.controller("HomeController", function($scope, $window, PinterestFactory, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchPics();
    });

    function fetchPics() {
        let picArr = [];
        PinterestFactory.getPics(currentUser)
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


});