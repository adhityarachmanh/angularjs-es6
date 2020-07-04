import { BuildPage } from "../module-builder";

export default BuildPage(
  {
    url: "/about",
    path: "pages/about",
    controller: "AboutController",
  },
  [
    "$scope",
    "$rootScope",
    function ($scope, $rootScope) {
      $scope.state = {
        title: "about",
      };

      
      $scope.componentDidMount = function () {
        $rootScope.setTemplate(1);
      };
      $scope.componentDidMount();
    },
  ]
);
