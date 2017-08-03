'use strict';

pinterestApp.controller("SingleBoardController", function($scope, $window, $routeParams, PinterestFactory, UserFactory) {


  $scope.getMyBoardPins = (boardId) => {
    let myBoardsPinsArr = [];
    PinterestFactory.getMyBoardPinsInfo(boardId)
        .then( (myBoardPins) => {
            let boardsPins = myBoardPins.data;
            Object.keys(boardsPins).forEach( (key) => {
                myBoardsPinsArr.push(boardsPins[key]);
            });
            $scope.myPins = myBoardsPinsArr;
        })
        .catch( (err) => {
            console.log("error", err);
        });
  };

});