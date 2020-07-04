import { BuildPage } from "../module-builder";
import _ from "lodash";

export default BuildPage("/", "pages/home", "HomeController", [
  "$scope",
  "$location",
  "ws",
  "MediaDevice",
  function ($scope, location, ws, MediaDevice) {
    $scope.state = {
      clientId: "",
      callWindow: "",
      callModal: "",
      callFrom: "",
      localSrc: null,
      peerSrc: null,
      isLogin: false,
    };

    $scope.pc = {};
    $scope.config = null;
    $scope.stream = null;
    $scope.mediaDevice = MediaDevice;
    $scope._setState = function (data) {
      $scope.state = {
        ...$scope.state,
        ...data,
      };
    };
    // PeerConnection
    $scope.startCall = function (isCaller, friendID, config) {
      if (isCaller) $scope.emit("call", { to: friendID, config });
      else {
        $scope.openMopdal(null);
        $scope.openWindow("active");
      }
    };

    $scope.PERMISSION_MEDIA_DEVICE = function (data) {
      $scope.mediaDevice
        .start()
        .then((stream) => {
          $scope.stream = stream;
          $scope.audio = true;
          $scope.video = true;
          $scope.emit("request", { to: data.to });
          if (!data.isCaller) $scope.openMopdal(null);
          $scope.openWindow("active");
        
        })
        .catch((err) => {
          if (err instanceof DOMException) {
            alert("Cannot open webcam and/or microphone");
          } else {
            console.log(err);
          }
        });
    };
    $scope.TOGGLE_MEDIA_DEVICE = function (deviceType) {
      if (deviceType === "video") {
        $scope.video = !$scope.video;
        $scope.mediaDevice.toggle($scope.stream, "Video", $scope.video);
      }
      if (deviceType === "audio") {
        $scope.audio = !$scope.audio;
        $scope.mediaDevice.toggle($scope.stream, "Audio", $scope.audio);
      }
      console.log($scope.stream);
    };
    $scope.rejectCall = function () {
      const { callFrom } = $scope.state;
      $scope.emit("end", { to: callFrom });
    };

    $scope.endCall = function (isStarter) {
      const { callFrom } = $scope.state;
      console.log($scope.state);
      
      // $scope.mediaDevice.stop($scope.stream);
      // $scope.emit("end", { to: callFrom });
      // $scope.openWindow(null);
      // $scope.openMopdal(null);
      // $scope.pc = {};
      // $scope.config = null;
      // $scope._setState({
      //   localSrc: null,
      //   peerSrc: null,
      // });
    };
    $scope.onMessage = function (response) {
      var message = response;
      const data = JSON.parse(message["data"]);
      switch (data.event) {
        case "call":
          $scope.eventCall(data);
          break;
        case "request":
          $scope.eventRequest(data);
          break;
        case "end":
          $scope.eventEnd(data);
          break;
      }
    };
    $scope.eventEnd = function (data) {
      switch (data.s) {
        case 0:
          $scope.mediaDevice.stop($scope.stream);
          $scope.openWindow(null);
          break;

        default:
          
          $scope.openMopdal(null);
          break;
      }
    };
    $scope.eventRequest = function (data) {
      switch (data.s) {
        case 0:
          
          $scope.callFrom=data.from
          $scope.openMopdal("active", data.from);

          break;
        default:
          break;
      }
    };
    $scope.eventCall = function (data) {
      switch (data.s) {
        case 0:
          $scope.callFrom=data.from
          $scope.PERMISSION_MEDIA_DEVICE(data);
          break;
        default:
          alert(data.to + " offline");
          break;
      }
    };

    $scope.doLogin = function () {
      ws.c("ws://localhost:8787", $scope.state.clientId, $scope.onMessage);
      $scope.emit("online");
      $scope._setState({ isLogin: true });
    };
    $scope.emit = function (event, payload) {
      ws.s(
        JSON.stringify({
          data: {
            event,
            ...payload,
          },
        })
      );
    };
    $scope.openWindow = function (status) {
      var mwElement = document.getElementById("call-window");

      switch (status) {
        case "active":
          mwElement.classList.add("active");
          break;
        default:
          mwElement.classList.remove("active");
          break;
      }
    };
    $scope.openMopdal = function (status, from) {
      var modalElement = document.getElementById("notif-modal");
      var msgElement = document.getElementById("notif-message");
      switch (status) {
        case "active":
          msgElement.innerText = `${from} menghubungimu`;
          modalElement.classList.add("active");
          break;
        default:
          modalElement.classList.remove("active");
          break;
      }
    };
    $scope.genderateSID = function () {
      const MIN = 1000;
      const MAX = 9999;
      const num = Math.floor(Math.random() * (MAX + 1 - MIN)) + MIN;
      $scope.state.clientId = "HIPMI-TESTER-" + num;
    };
    $scope.componentDidMount = function () {
      $scope.genderateSID();
    };
    $scope.componentDidMount();
  },
]);
