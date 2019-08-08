import produce from "immer";
import _ from "lodash";

const defaultState = {
  eventsWithPrimaryMarket: { loading: false },
  events: {},
  markets: {},
  settings: {
    showDecimalPrices: false
  }
};

export default function reducer(state = defaultState, action) {
  return produce(state, draft => {
    if (action.type === "START_LOADING_EVENTS") {
      draft.eventsWithPrimaryMarket.loading = true;
      draft.eventsWithPrimaryMarket.data = [];
    }

    if (action.type === "START_LOADING_EVENT") {
      draft.events[action.eventId] = {
        loading: true,
        data: {}
      };
    }

    if (action.type === "EVENT_NOT_FOUND") {
      draft.events[action.eventId] = {
        loading: false,
        errorMessage: action.errorMessage,
        data: {}
      };
    }

    if (action.type === "SET_EVENT") {
      draft.event[action.eventId].loading = false;
      draft.event[action.eventId].data = action.event;
    }

    if (action.type === "SET_EVENTS") {
      draft.eventsWithPrimaryMarket.loading = false;
      draft.eventsWithPrimaryMarket.data = action.events;
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
