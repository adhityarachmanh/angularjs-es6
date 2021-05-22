import axios from "axios";
export default {
  template: require('./home.html'),
  controller: [
    "$scope",
    "$rootScope",
    "A",
    "G",
    ($scope, $rootScope, res, G) => {
      // $scope.image = _image
      $scope.data = [];
      // alert()
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
          const {
            data
          } = response;
          $scope.data = data;
          $scope.$apply();
        });
      //  $scope.currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    },

  ]
};