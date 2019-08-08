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
  const [marketData, outcomes] = yield select(state => [
    _.get(state, `markets['${action.marketId}'].data`, {}),
    state.outcomes
  ]);

  if (_.isEmpty(marketData.outcomes)) {
    return;
  }

  const missingOutcomes = marketData.outcomes.filter(id =>
    _.isEmpty(_.get(outcomes, id + ".data", {}))
  ).length;

  // if all outcomes are loaded
  if (missingOutcomes === 0) {
    return;
  }

  yield put({
    type: "START_LOADING_OUTCOMES",
    outcomesIds: marketData.outcomes
  });

  const reqs = marketData.outcomes.map(id =>
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
