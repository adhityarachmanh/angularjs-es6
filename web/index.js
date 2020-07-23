import angular from "angular";
import "angular-route";
import "bootstrap";
import "./assets/sass/app.scss";
import PAGES from "./pages";
import COMPONENTS from "./components";
import FACTORY from "./factory";
import CONFIG from "./config";
import SERVICES from "./services";

//merge semua module
let MODULES = ["ngRoute"];
MODULES = MODULES.concat(PAGES);
MODULES = MODULES.concat(COMPONENTS);
MODULES = MODULES.concat(FACTORY);
MODULES = MODULES.concat(SERVICES);

console.log("LIST MODULE : ",MODULES);

angular
  .module(CONFIG.MODULE_NAME, MODULES)
  .directive("app", function () {
    return {
      template: require("./app.html"),
      controller: "AppController",
      controllerAs: "app",
    };
  })
  .controller("AppController", ($scope, $rootScope) => {
    $scope.template = 1;
    $rootScope.setTemplate = function (index) {
      $scope.template = index;
      $scope.$apply();
    };
  }).name;
