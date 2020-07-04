import { BuildComponent } from "../module-builder";

const costumeRules = {
  scope: {
    localsrc: "=",
    peersrc: "=",
    config: "=",
    endcall: "=",
    video:"=",
    audio:"=",
    togglemediadevice:"="
  },
};
export default BuildComponent(
  "callWindow",
  costumeRules,
  "components/CallWindow",
  "CallWindowController",
  [
    "$scope","MediaDevice",
    function ($scope,MediaDevice) {
    //   $scope.toggleMediaDevice = function (deviceType) {

          
    //     if (deviceType === "video") {
    //       $scope.video = !$scope.video;
    //       $scope.stream= MediaDevice.toggle($scope.stream,"Video");
    //     }
    //     if (deviceType === "audio") {
    //       $scope.audio = !$scope.audio;
    //       $scope.stream=MediaDevice.toggle($scope.stream,"Audio");
    //     }
    //     console.log($scope.stream);
        
    //   };
    },
  ]
);
