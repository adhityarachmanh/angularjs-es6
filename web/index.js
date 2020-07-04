import angular from "angular";
import "angular-route";
import "bootstrap";
import "./assets/css/app.scss";
import PAGES from "./pages";
import COMPONENTS from "./components";
import FACTORY from "./factory";
import TEMPLATE from "./main";
import CONFIG from "./config";

//merge semua module
let MODULES = ["ngRoute"];
MODULES = MODULES.concat(PAGES);
MODULES = MODULES.concat(COMPONENTS);
MODULES = MODULES.concat(FACTORY);
MODULES = MODULES.concat(TEMPLATE);

console.log(MODULES);

angular
  .module(CONFIG.MODULE_NAME, MODULES)
  .directive("app", function () {
    return {
      template: require("./app.html"),
      controller: "AppController",
      controllerAs: "app",
    };
  })
  .controller("AppController", [
    "$scope",
    "$rootScope",
    "$route",
    function ($scope, $rootScope, $route) {
      $scope.template = 1;
      $rootScope.setTemplate = function (index) {
        $scope.template = index;
      };
    },
  ]).name;
