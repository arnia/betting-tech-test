import { takeEvery, put } from "redux-saga/effects";

function* sendEventsRequest() {
  yield put({ type: "START_LOADING_EVENTS" });

  yield put({
    type: "SOCKET_SEND",
    payload: { type: "getLiveEvents", primaryMarkets: true }
  });
}

export function* sendEventsRequestWatcher() {
  yield takeEvery("GET_EVENTS", sendEventsRequest);
}

function* sendEventRequest(action) {
  yield put({ type: "START_LOADING_EVENT", eventId: action.eventId });

  yield put({
    type: "SOCKET_SEND",
    payload: { type: "getEvent", id: action.eventId }
  });
}

export function* sendEventRequestWatcher() {
  yield takeEvery("GET_EVENT", sendEventRequest);
}
