import { takeEvery, all, fork, put } from "redux-saga/effects";

import openWebSocketChannel from "./webSocketChannel";

function* sendEventsRequest() {
  yield takeEvery("GET_EVENTS", function*() {
    yield put({ type: "START_LOADING_EVENTS" });

    yield put({
      type: "SOCKET_SEND",
      payload: { type: "getLiveEvents", primaryMarkets: true }
    });
  });
}

function* receiveSocketEvents() {
  yield takeEvery("SOCKET_EVENT", function*({ payload }) {
    if (payload.type === "LIVE_EVENTS_DATA") {
      yield put({ type: "SET_EVENTS", events: payload.data });
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(openWebSocketChannel),
    fork(sendEventsRequest),
    fork(receiveSocketEvents)
  ]);
}
