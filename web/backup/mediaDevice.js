import { BuildFactory } from "../module-builder";

function MediaDevice() {
  return {
    start: function () {
      const constraints = {
        video: {
          facingMode: "user",
          height: { min: 360, ideal: 720, max: 1080 },
        },
        audio: true,
      };

      return navigator.mediaDevices.getUserMedia(constraints);
    },
    toggle: function (stream, type, on) {
      const len = arguments.length;
      if (stream) {
        stream[`get${type}Tracks`]().forEach((track) => {
          const state = len === 2 ? on : !track.enabled;
          _.set(track, "enabled", state);
        });
      }
      return stream;
    },
    stop: function (stream) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      return stream;
    },
  };
}
export default BuildFactory("MediaDevice", MediaDevice);
