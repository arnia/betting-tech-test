import { eventChannel, END } from "redux-saga";

import { call, take, put, fork, takeEvery, apply } from "redux-saga/effects";

function createChannelWebSocket(socket) {
  return eventChannel(emitter => {
    socket.addEventListener("message", e => {
      const wEventDTO = JSON.parse(e.data);
      emitter(wEventDTO);
    });

    socket.onclose = () => emitter(END);

    return () => socket.close();
  });
}

function createWebSocket(url) {
  return new WebSocket(url);
}

function* handleRequests(socket) {
  yield takeEvery("SOCKET_SEND", function*(action) {
    if (socket.readyState === WebSocket.CONNECTING) {
      socket.onopen = () => {
        socket.send(JSON.stringify(action.payload));
      };
    } else if (socket.readyState === WebSocket.OPEN) {
      yield apply(socket, socket.send, [JSON.stringify(action.payload)]);
    }
  });
}

function* openWebSocketChannel() {
  const socket = yield call(createWebSocket, "ws://localhost:8889");
  const socketChannel = yield call(createChannelWebSocket, socket);

  yield fork(handleRequests, socket);

  while (true) {
    try {
      const payload = yield take(socketChannel);

      yield put({ type: "SOCKET_RECEIVE", payload });
    } catch (err) {
      console.log("socket error: ", err);
    }
  }
}

export default openWebSocketChannel;
