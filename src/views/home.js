import axios from "axios";
import moment from "moment";

export default [
  "$scope",
  "$rootScope",
  "A",
  "G",
  function ($scope, $rootScope, res, G) {
    $scope.data = [];
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        const { data } = response;
        $scope.data = data;
        $scope.$apply();
      });
    //  $scope.currentDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  },
];
