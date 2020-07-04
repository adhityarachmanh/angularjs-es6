import { BuildComponent } from "../module-builder";

const costumeRules = {
  scope: {
    togglenotif: "=",
    call: "&",
    videocall: "&",
    endcall: "=",
  },
};
export default BuildComponent(
  "notif",
  costumeRules,
  "components/notif",
  "NotifController",
  [
    "$scope",
    function ($scope) {
      console.log($scope);
      
      var notifModal = document.getElementById("notif-modal");
      var notifMsg = document.getElementById("notif-message");

      $scope.title = "Component Notif Modal";
      $scope.togglenotif = function (notif, msg) {
        if (notif) {
          notifModal.classList.add("active");
          notifMsg.innerText = msg;
        } else {
          notifModal.classList.remove("active");
          notifMsg.innerText = "";
        }
      };
    },
  ]
);
