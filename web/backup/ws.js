import { BuildFactory } from "../module-builder";

function $websocket() {
  var stack = [],
    i,
    ws;
  return {
    c: function (url,path, onMessage, onClose, onError) {
        ws = new WebSocket(url+"/"+path);
      
      ws.onmessage = onMessage;

      if (angular.isFunction(onClose)) {
        ws.onclose = onClose;
      }
      if (angular.isFunction(onError)) {
        ws.onerror = onError;
      }
      ws.onopen = function (event) {
        for (i in stack) {
          ws.send(stack[i]);
        }
        stack = [];
      };
    },
    t: function () {
      return ws ? ws.readyState : 0;
    },
    s: function (data) {
      //data = JSON.stringify(data);
      if (ws.readyState == 1) {
        ws.send(data);
      } else {
        stack.push(data);
      }
    },
    e: function () {
      ws.close();
    },
  };
}
export default BuildFactory("ws", $websocket);
