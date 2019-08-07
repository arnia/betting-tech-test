import { takeEvery, put } from "redux-saga/effects";

function* sendEventsRequest() {
  yield put({ type: "START_LOADING_EVENTS" });

  yield put({
    type: "SOCKET_SEND",
    payload: { type: "getLiveEvents", primaryMarkets: true }
  });
}

export default function* sendEventsRequestWatcher() {
  yield takeEvery("GET_EVENTS", sendEventsRequest);
}
