import { takeEvery, put, all, select } from "redux-saga/effects";
import _ from "lodash";

function* getMarket(action) {
  yield put({ type: "START_LOADING_MARKET", marketId: action.marketId });

  yield put({
    type: "SOCKET_SEND",
    payload: { type: "getMarket", id: action.marketId }
  });
}

export function* getMarketWatcher() {
  yield takeEvery("GET_MARKET", getMarket);
}

function* getOutcomes(action) {
  const market = yield select(state =>
    _.get(state, `markets['${action.marketId}'].data`, [])
  );

  if (_.isEmpty(market.outcomes)) {
    return;
  }

  const loadedOutcomes = _.get(market, "outcomesData.data", {});
  const loadedOutcomesCount = _.keys(loadedOutcomes).length;
  const allOutcomes = market.outcomes.length;

  // if all outcomes are loaded
  if (loadedOutcomesCount === allOutcomes) {
    return;
  }

  yield put({
    type: "START_LOADING_OUTCOMES",
    marketId: action.marketId
  });

  const reqs = market.outcomes.map(id =>
    put({
      type: "SOCKET_SEND",
      payload: { type: "getOutcome", id }
    })
  );

  yield all(reqs);
}

export function* getOutcomesWatcher() {
  yield takeEvery("GET_OUTCOMES", getOutcomes);
}
