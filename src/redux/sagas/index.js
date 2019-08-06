import { takeEvery, all, fork, put } from "redux-saga/effects";
import handleSocketEvents from "./handleSocketEvents";
import openWebSocketChannel from "./webSocketChannel";

function* sendEventsRequest() {
  yield put({ type: "START_LOADING_EVENTS" });

  yield put({
    type: "SOCKET_SEND",
    payload: { type: "getLiveEvents", primaryMarkets: true }
  });
}

function* sendEventsRequestWatcher() {
  yield takeEvery("GET_EVENTS", sendEventsRequest);
}

function* sendMarketRequest(action) {
  yield put({ type: "START_LOADING_MARKET", marketId: action.marketId });

  yield put({
    type: "SOCKET_SEND",
    payload: { type: "getMarket", id: action.marketId }
  });
}

function* sendMarketRequestWatcher() {
  yield takeEvery("GET_MARKET", sendMarketRequest);
}

export default function* rootSaga() {
  yield all([
    fork(openWebSocketChannel),
    fork(sendEventsRequestWatcher),
    fork(handleSocketEvents),
    fork(sendMarketRequestWatcher)
  ]);
}
