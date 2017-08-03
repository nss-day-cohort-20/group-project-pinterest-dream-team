'use strict';

pinterestApp.controller('PinDetailController', function($scope, $routeParams, $window, PinterestFactory) {

  PinterestFactory.getCreatedPin($routeParams.pinId)
  .then( (pin) => {
    $scope.selectedItem = pin;
  })
  .catch( (err) => {
    console.log("error! No item returned", err );
  });

  $scope.loadEditForm = (selectedItemId) => {
    $window.location.href = `#!/todos/edit/${selectedItemId}`;
  };

});