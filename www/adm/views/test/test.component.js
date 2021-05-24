/*
module  : TEST COMPONENT
creator : adhityarachmanh
os      : darwin20
created : Sun May 23 12:53:32 WIB 2021
*/

import { Component } from '../../../shr/module-builder';


export default Component({
  name: "TestComponent",
  template: require("./test.component.html"),
}, [
  "$scope",($scope) => {
      $scope.controller = "Controller TestComponent";
  },]
);
