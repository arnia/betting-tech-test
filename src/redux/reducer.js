import produce from "immer";
import _ from "lodash";

const defaultState = {
  events: { loading: false },
  markets: {}
};

export default function reducer(state = defaultState, action) {
  return produce(state, draft => {
    if (action.type === "START_LOADING_EVENTS") {
      draft.events.loading = true;
      draft.events.data = [];
    }

    if (action.type === "SET_EVENTS") {
      draft.events.loading = false;
      draft.events.data = action.events;
    }

    if (action.type === "START_LOADING_MARKETS") {
      (action.marketIds || []).forEach(id => {
        draft.markets[id] = {
          loading: true,
          data: {}
        };
      });
    }

    if (action.type === "SET_MARKET_DATA") {
      const outcomes = _.get(
        draft,
        `markets['${action.marketId}'].outcomes`,
        []
      );
      draft.markets[action.market.marketId] = {
        loading: outcomes.length > 0, // will make it true when we get the outcomes
        data: action.market
      };
    }

    if (action.type === "SET_OUTCOME_DATA") {
      const market = draft.markets[action.outcome.marketId].data;

      if (!market.outcomesData) {
        market.outcomesData = {};
      }

      market.outcomesData[action.outcome.outcomeId] = action.outcome;

      if (_.keys(market.outcomesData).length === market.outcomes.length) {
        draft.markets[action.outcome.marketId].loading = false;
      }
    }
  });
}
