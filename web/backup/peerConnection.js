import { BuildFactory } from "../module-builder";

const PC_CONFIG = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] };

export default BuildFactory(
  "PeerConnection",
  [
    "ws",
    "MediaDevice",
    function (ws, MediaDevice) {
      this.pc = new RTCPeerConnection(PC_CONFIG);
      this.pc.onicecandidate = (event, friendID) =>
        ws.s(
          JSON.stringify({
            data: {
              event: "call",
              to: friendID,
              candidate: event.candidate,
            },
          })
        );
      this.pc.ontrack = (event) => this.$emit("peerStream", event.streams[0]);

      this.mediaDevice = MediaDevice;

          
      return {
        start: function (isCaller, config, friendID) {
          this.friendID = friendID;
          mediaDevice
            .on("stream", (stream) => {
              stream.getTracks().forEach((track) => {
                pc.addTrack(track, stream);
              });
              this.emit("localStream", stream);
              if (isCaller)
                ws.s(
                  JSON.stringify({
                    data: {
                      event: "request",
                      to: friendID,
                    },
                  })
                );
              else createOffer();
            })
            .start(config);

          return this;
        },
        createOffer: function () {
          this.pc
            .createOffer()
            .then(this.getDescription)
            .catch((err) => console.log(err));
          return this;
        },
      };
    },
  ],
  []
);
