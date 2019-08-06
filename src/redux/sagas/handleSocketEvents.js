import { takeEvery, put, all } from "redux-saga/effects";
import _ from "lodash";

function* receiveSocketEvents({ payload }) {
  if (payload.type === "LIVE_EVENTS_DATA") {
    yield put({ type: "SET_EVENTS", events: payload.data });
  }

  if (payload.type === "MARKET_DATA") {
    yield put({ type: "SET_MARKET_DATA", market: payload.data });

    const outcomes = _.get(payload, "data.outcomes", []);

    const outcomesReqs = outcomes.map(outcomeId =>
      put({
        type: "SOCKET_SEND",
        payload: { type: "getOutcome", id: outcomeId }
      })
    );

    yield all(outcomesReqs);
  }

  if (payload.type === "OUTCOME_DATA") {
    yield put({ type: "SET_OUTCOME_DATA", outcome: payload.data });
  }
}

function* receiveSocketEventsWatcher() {
  yield takeEvery("SOCKET_RECEIVE", receiveSocketEvents);
}

export default receiveSocketEventsWatcher;
