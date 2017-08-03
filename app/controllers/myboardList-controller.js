'use strict';

pinterestApp.controller("MyBoardListController", function($q, $scope, $window, $routeParams, PinterestFactory, UserFactory, FirebaseUrl) {

    let currentUser = null;

    UserFactory.isAuthenticated(currentUser)
    .then( (user) => {
    currentUser = UserFactory.getUser();
    });

	$scope.getMyPics = (myBoard) => {
        // return $q( (resolve, reject) => {
        let myPicArr = [];
            PinterestFactory.getUserPics(myBoard)
            .then( (picData) => {
                console.log("data", picData.data);
                Object.keys(picData.data).forEach( (key) => {
                    myPicArr.push(picData.data[key]); 
                });
                // resolve(myPicArr);
                $scope.picScope = myPicArr;
                console.log("arr", $scope.picScope);
                // $scope.$apply();
            })
            .catch( (error) => {
                console.log("you didnt do it right", error);
            });
            
        // });

    };
            // PinterestFactory.getUserPics(myBoardsData.uid)
            // .then( (data) => {
            //     console.log("???", data);
            // });
        $scope.pinPics = (boardId, pic) => {
        // console.log(pic);
        pic.uid = currentUser;
        pic.bid = boardId;
        // pic.boardId = currentUser + uniqueId;
        let pinnedPic = pic;
        console.log("is this it", pinnedPic);
        PinterestFactory.putPics(pinnedPic)
        .then( (boardId) => {
           // $scope.getMyPics(boardId);
            
        })
        .catch( (error) => {
            console.log("didnt work", error);
        });
  };

});