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
    templateUrl: 'partials/logIn.html',
    controller: 'UserController'
  })
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController',
    resolve: {isAuth}
  })
  .when('/my-board', {
    templateUrl: 'partials/my-board.html',
    controller: 'MyBoardController',
    resolve: {isAuth}
  })
  .otherwise('/');
});