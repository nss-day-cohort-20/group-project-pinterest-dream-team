// 'use strict';

// pinterestApp.controller("NavController", function($scope, $window, FilterFactory, UserFactory) {

//     $scope.searchText = FilterFactory;
//     $scope.isLoggedIn = false;

//     firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//             $scope.isLoggedIn = true;
//             $scope.$apply();
//         } else {
//             $scope.isLoggedIn = false;
//             $scope.$apply();
//             $window.location.href = "#!/login";
//         }
//     });

//     $scope.logout = () => {
//         UserFactory.logoutUser();
//     };

// });