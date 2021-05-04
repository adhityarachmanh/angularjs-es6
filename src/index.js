import CONFIG from "../webpack-config";
import { _$rootScope, _$scope } from "./app";
export default angular
  .module(CONFIG.MODULE_NAME + ".index", [])
  .controller("IndexController", [
    "$scope",
    "$rootScope",
    "$route",
    function ($scope, $rootScope, $route) {
      $scope.$route = $route;
    },
  ]).name;
