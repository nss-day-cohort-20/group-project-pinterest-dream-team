'use strict';

pinterestApp.controller("CreateBoardController", function($scope, $window, UserFactory, PinterestFactory) {

  $scope.formTitle = "Create New Board";
  $scope.createBoard = {
    // need a function to get the user's ID
    uid: UserFactory.getUser(),
    // pulls the data from the text input on create-board.html
    title: "",
    id: ""
  };

  $scope.saveBoard = () => {
    PinterestFactory.postNewBoards($scope.createBoard)
    .then( (data) => {
      console.log("Board Data", data);
      $window.location.href = '#!/my-board';
    });
  };

});