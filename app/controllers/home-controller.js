'use strict';

pinterestApp.controller("HomeController", function($scope, $window, UserFactory) {

    let currentUser = null;

    UserFactory.isAuthenticated()
    .then( (user) => {
    currentUser = UserFactory.getUser();
    fetchTodos();
    });

    function fetchPics() {
        let picArr = [];
        PinterestFactory.getPics(currentUser)
        .then( (picList) => {
            console.log("data", picList);
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