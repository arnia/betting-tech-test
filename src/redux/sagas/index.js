import { all, fork, put, takeEvery } from "redux-saga/effects";
import handleSocketEvents from "./handleSocketEvents";
import openWebSocketChannel from "./webSocketChannel";
import { getMarketWatcher, getOutcomesWatcher } from "./marketSaga";
import { sendEventRequestWatcher, sendEventsRequestWatcher } from "./eventSaga";

function* enableSubscription({ to, id }) {
  const key = to[0] + "." + id.toString();

  yield put({
    type: "SOCKET_SEND",
    payload: {
      type: "subscribe",
      keys: [key]
    }
  });
}

function* enableSubscriptionWatcher() {
  yield takeEvery("SUBSCRIBE", enableSubscription);
}

function* disableSubscription({ to, id }) {
  const key = to[0] + "." + id.toString();

  yield put({
    type: "SOCKET_SEND",
    payload: {
      type: "unsubscribe",
      keys: [key]
    }
  });
}

function* disableSubscriptionWatcher() {
  yield takeEvery("UNSUBSCRIBE", disableSubscription);
}

export default function* rootSaga() {
  yield all([
    fork(openWebSocketChannel),
    fork(sendEventsRequestWatcher),
    fork(sendEventRequestWatcher),
    fork(handleSocketEvents),
    fork(getMarketWatcher),
    fork(getOutcomesWatcher),
    fork(enableSubscriptionWatcher),
    fork(disableSubscriptionWatcher)
  ]);
}
