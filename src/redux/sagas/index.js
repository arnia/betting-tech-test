import { all, fork } from "redux-saga/effects";
import handleSocketEvents from "./handleSocketEvents";
import openWebSocketChannel from "./webSocketChannel";
import { getMarketWatcher, getOutcomesWatcher } from "./marketSaga";
import { sendEventRequestWatcher, sendEventsRequestWatcher } from "./eventSaga";

export default function* rootSaga() {
  yield all([
    fork(openWebSocketChannel),
    fork(sendEventsRequestWatcher),
    fork(sendEventRequestWatcher),
    fork(handleSocketEvents),
    fork(getMarketWatcher),
    fork(getOutcomesWatcher)
  ]);
}
