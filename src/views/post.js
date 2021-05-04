import axios from "axios";
import moment from "moment";

export default [
  "$scope",
  "$rootScope",
  "$routeParams",
  "A",
  "G",
  function ($scope, $rootScope, $routeParams, res, G) {
    $scope.data = {};
    $scope.loadData = async function (id) {
      var response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/" + id
      );
      const { data } = response;
      $scope.data = data;
      $scope.$apply();
    };
    $scope.loadData($routeParams.id)
  },
];
