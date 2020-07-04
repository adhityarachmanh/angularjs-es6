import { BuildComponent } from "../module-builder";

const costumeRules = {
  scope: {
    clientid: "=",
    islogin:"=",
    startcall: "=",
    dologin:"="
  },
  
};
export default BuildComponent(
  "mainWindow",
  costumeRules,
  "components/MainWindow",
  "MainWindowController",
  [
    "$scope",
    function ($scope) {
      $scope.state = {
        friendID: "",
      };

      $scope.callWithVideo = function (video) {
        const config = { audio: true, video };

        return (
          $scope.state.friendID &&
          $scope.startcall(true, $scope.state.friendID, config)
        );
      };
    },
  ]
);
