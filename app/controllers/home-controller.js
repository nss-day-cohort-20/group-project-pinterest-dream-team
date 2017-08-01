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
            let picData = picList.data;
            // console.log("data", picList);
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

    $scope.pinPics = (pic) => {
        // console.log(pic);
        pic.uid = currentUser;
        // pic.boardId = currentUser + uniqueId;
        let pinnedPic = pic;
        // console.log(pinnedPic);
        PinterestFactory.putPics(pinnedPic);
  };

});