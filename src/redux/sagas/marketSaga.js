import { takeEvery, all, put } from "redux-saga/effects";

function* getPrimaryMarkets(action) {
  yield put({ type: "START_LOADING_MARKETS", marketIds: action.marketIds });

  const reqs = (action.marketIds || []).map(id =>
    put({
      type: "SOCKET_SEND",
      payload: { type: "getMarket", id }
    })
  );

  yield all(reqs);
}

export default function* getPrimaryMarketsWatcher() {
  yield takeEvery("GET_PRIMARY_MARKETS", getPrimaryMarkets);
}
