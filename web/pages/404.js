import { BuildPage } from "../module-builder";

export default BuildPage(
  {
    url: "/404",
    path: "pages/404",
    controller: "404Controller",
  },
  [
    "$scope",
    "$rootScope",
    function ($scope, $rootScope) {
      $rootScope.setTemplate(3);
      $scope.state = {
        title: "404",
      };
    },
  ]
);
