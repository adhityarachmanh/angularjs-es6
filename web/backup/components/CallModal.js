import { BuildComponent } from "../module-builder";

const costumeRules = {
  scope: {
    startcall: "=",
    rejectcall: "=",
    callfrom: "=",
  },
};
export default BuildComponent(
  "callModal",
  costumeRules,
  "components/CallModal",
  "CallModalController",
  [
    "$scope",
    function ($scope) {
      $scope.acceptWithVideo = function (video) {
        const config = { audio: true, video };
        return $scope.startcall(false, $scope.callfrom, config);
      };
    },
  ]
);
