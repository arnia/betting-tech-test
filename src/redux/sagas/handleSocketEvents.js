import { takeEvery, put, all } from "redux-saga/effects";
import _ from "lodash";

function* receiveSocketEvents({ payload }) {
  if (payload.type === "LIVE_EVENTS_DATA") {
    yield put({ type: "SET_EVENTS", events: payload.data });
  }

  if (payload.type === "MARKET_DATA") {
    yield put({ type: "SET_MARKET_DATA", market: payload.data });
  }

  if (payload.type === "OUTCOME_DATA") {
    yield put({ type: "SET_OUTCOME_DATA", outcome: payload.data });
  }

  if (payload.type === "ERROR" && payload.data.actionType === "getEvent") {
    yield put({
      type: "EVENT_NOT_FOUND",
      eventId: payload.data.id,
      errorMessage: payload.data.message
    });
  }
}

function* receiveSocketEventsWatcher() {
  yield takeEvery("SOCKET_RECEIVE", receiveSocketEvents);
}

export default receiveSocketEventsWatcher;
