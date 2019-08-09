import { takeEvery, put } from "redux-saga/effects";
import _ from "lodash";

function* handleSubscriptionEvents({ payload }) {
  if (payload.type === "OUTCOME_STATUS") {
    yield put({ type: "CHANGE_OUTCOME_STATUS", data: payload.data });
  }

  if (payload.type === "MARKET_STATUS") {
    yield put({ type: "CHANGE_MARKET_STATUS", data: payload.data });
  }

  if (payload.type === "PRICE_CHANGE") {
    yield put({ type: "PRICE_CHANGE_STATUS", data: payload.data });
  }
}

function* receiveSocketEvents({ payload }) {
  if (payload.type === "LIVE_EVENTS_DATA") {
    yield put({
      type: "SET_LIVE_EVENTS",
      events: payload.data,
      loading: false
    });
  }

  if (payload.type === "EVENT_DATA") {
    yield put({ type: "SET_LIVE_EVENTS", events: [payload.data] });
  }

  if (payload.type === "MARKET_DATA") {
    yield put({ type: "SET_MARKET_DATA", market: payload.data });
  }

  if (payload.type === "OUTCOME_DATA") {
    yield put({ type: "SET_OUTCOME_DATA", outcome: payload.data });
  }

  if (payload.type === "ERROR") {
    if (
      ["getEvent", "getMarket", "getOutcome"].indexOf(
        payload.data.actionType
      ) !== -1
    ) {
      yield put({
        type: "NOT_FOUND",
        id: payload.data.id,
        errorMessage: payload.data.message,
        to: _.replace(payload.data.actionType, "get", "").toLowerCase() + "s"
      });
    }
  }

  yield* handleSubscriptionEvents({ payload });
}

function* receiveSocketEventsWatcher() {
  yield takeEvery("SOCKET_RECEIVE", receiveSocketEvents);
}

export default receiveSocketEventsWatcher;
