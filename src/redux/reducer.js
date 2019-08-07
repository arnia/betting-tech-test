import produce from "immer";
import _ from "lodash";

const defaultState = {
  events: { loading: false },
  markets: {},
  settings: {
    showDecimalPrices: false
  }
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

    if (action.type === "START_LOADING_MARKET") {
      draft.markets[action.marketId] = {
        loading: true,
        data: {}
      };
    }

    if (action.type === "SET_MARKET_DATA") {
      draft.markets[action.market.marketId] = {
        loading: false,
        data: action.market
      };
    }

    if (action.type === "START_LOADING_OUTCOMES") {
      const market = draft.markets[action.marketId].data;

      if (!market.outcomesData) {
        market.outcomesData = {
          data: {},
          loading: true
        };
      }

      market.loadingOutcomes = true;
    }

    if (action.type === "SET_OUTCOME_DATA") {
      const market = draft.markets[action.outcome.marketId].data;
      const outcomesData = market.outcomesData;

      outcomesData.data[action.outcome.outcomeId] = action.outcome;

      const loadedOutcomes = _.keys(outcomesData.data).length;
      const allOutcomes = market.outcome;

      if (loadedOutcomes === allOutcomes) {
        market.loadingOutcomes = false;
        outcomesData.loading = false;
      }
    }

    if (action.type === "TOGGLE_PRICE_FORMAT") {
      draft.settings.showDecimalPrices = !draft.settings.showDecimalPrices;
    }
  });
}
