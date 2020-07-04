import { BuildPage } from "../module-builder";
import $ from "jquery";

export default BuildPage(
  {
    url: "/",
    path: "pages/home",
    controller: "HomeController",
  },
  [
    "$scope","$rootScope",
    function ($scope,$rootScope) {
      
      $scope.state = {
        title: "home",
      };

      $scope.openModal = function () {
        $("#test-modal").modal("toggle");
        // angular.element("#test-modal").modal("show")
      };
      $scope.componentDidMount = function () {
        $rootScope.setTemplate(1);
      };
      $scope.componentDidMount();
    },
  ]
);
