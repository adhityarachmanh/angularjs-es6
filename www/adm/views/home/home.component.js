import { Component } from "../../../shr/module-builder";

export default Component({
  name: "HomeComponent",
  template: require("./home.component.html"),
}, [
  "$scope",
  "$rootScope",
  "A",
  "G",
  "C",
  ($scope, $rootScope, res, G,Config) => {
    $scope.title = Config.Copyright.Product;
    $scope.creator = Config.Copyright.Creator;
    $scope.appname = Config.name;
  },

]);