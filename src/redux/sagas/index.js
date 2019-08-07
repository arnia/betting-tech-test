import { all, fork } from "redux-saga/effects";
import handleSocketEvents from "./handleSocketEvents";
import openWebSocketChannel from "./webSocketChannel";
import getPrimaryMarketsWatcher from "./marketSaga";
import sendEventsRequestWatcher from "./eventSaga";

export default function* rootSaga() {
  yield all([
    fork(openWebSocketChannel),
    fork(sendEventsRequestWatcher),
    fork(handleSocketEvents),
    fork(getPrimaryMarketsWatcher)
  ]);
}
