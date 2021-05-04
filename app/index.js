import CONFIG from "./config";
export default angular
  .module(CONFIG.MODULE_NAME + ".index", []).controller("IndexController", ["$scope", "$rootScope", "$route", function ($scope, $rootScope, $route) {
    $scope.$route = $route
   
  }]).name;




