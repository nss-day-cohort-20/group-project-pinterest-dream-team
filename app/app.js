"use strict";

let pinterestApp = angular.module("PinterestApp", ["ngRoute"])
.constant("FirebaseUrl", "https://not-really-pinterested.firebaseio.com");

let isAuth = (UserFactory) => {
  return new Promise( (resolve, reject) => {
    UserFactory.isAuthenticated()
    .then( (userBoolean) => {
      if (userBoolean) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

pinterestApp.config( ($routeProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/log-in.html',
    controller: 'UserController'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController',
    resolve: {isAuth}
  })
  .when('/create-board', {
    templateUrl: 'partials/create-board.html',
    controller: 'CreateBoardController',
    resolve: {isAuth}
  })
  .when('/my-board-list', {
    templateUrl: 'partials/my-board-list.html',
    controller: 'MyBoardController',
    resolve: {isAuth}
  })
  .when('/my-board/:boardId', {
    templateUrl: 'partials/my-board.html',
    controller: 'PinController',
    resolve: {isAuth}
  })
  .when('/add-photo', {
    templateUrl: 'partials/add-photo.html',
    controller: 'AddphotosController',
    resolve: {isAuth}
  })
  .otherwise('/');
});