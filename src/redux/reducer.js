import produce from "immer";
import _ from "lodash";

const defaultState = {
  eventsWithPrimaryMarket: { loading: false },
  events: {},
  eventsLoading: false,
  markets: {},
  outcomes: {},
  settings: {
    showDecimalPrices: false
  }
};

function eventsReducer(draft, action) {
  if (action.type === "START_LOADING_EVENTS") {
    draft.eventsLoading = true;
  }

  if (action.type === "SET_LIVE_EVENTS") {
    let events = {};
    (action.events || []).forEach(event => {
      draft.eventsLoading = action.loading;
      events[event.eventId] = {
        loading: false,
        eventId: event.eventId,
        data: event
      };
    });
    draft.events = events;
  }

  if (action.type === "EVENT_NOT_FOUND") {
    draft.events[action.eventId] = {
      loading: false,
      errorMessage: action.errorMessage
    };
  }
}

function marketsReducer(draft, action) {
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

    // order event's markets after each load
    const event = draft.events[action.market.eventId];
    const orderedMarkets = _.orderBy(
      (event.markets || []).map(id =>
        draft.markets[id] ? draft.markets[id] : { marketId: id }
      ),
      ["displayOrder"]
    );

    event.markets = orderedMarkets.map(m => m.marketId);
  }
}

function outcomesReducer(draft, action) {
  if (action.type === "START_LOADING_OUTCOMES") {
    const market = _.get(draft, `markets['${action.marketId}'].data`, {});
    (market.outcomes || []).forEach(id => {
      _.set(draft, `outcomes['${id}']`, {
        loading: true,
        data: {}
      });
    });
    market.loadingOutcomes = true;
  }

  if (action.type === "SET_OUTCOME_DATA") {
    const market = draft.markets[action.outcome.marketId].data;
    draft.outcomes[action.outcome.outcomeId] = {
      loading: false,
      data: action.outcome
    };

    const missingOutcomes = (market.outcomes || []).filter(id =>
      _.isEmpty(_.get(draft, "outcomes[id].data", {}))
    ).length;

    if (missingOutcomes === 0) {
      market.loadingOutcomes = false;
    }
  }
}

function subscriptionEventsReducer(draft, action) {
  if (action.type === "CHANGE_OUTCOME_STATUS") {
    const outcome = draft.outcomes[action.data.outcomeId];
    if (outcome && outcome.data) {
      outcome.data.price = action.data.price;
      outcome.data.status = action.data.status;
    }
  }

  if (action.type === "CHANGE_MARKET_STATUS") {
    const market = draft.markets[action.data.marketId];
    if (market && market.data) {
      market.data.status = action.data.status;
    }
  }

  if (action.type === "PRICE_CHANGE_STATUS") {
    const outcome = draft.outcomes[action.data.outcomeId];
    if (outcome && outcome.data) {
      outcome.data.price = action.data.price;
      outcome.data.status = action.data.status;
    }
  }
}

export default function reducer(state = defaultState, action) {
  return produce(state, draft => {
    eventsReducer(draft, action);

    marketsReducer(draft, action);

    outcomesReducer(draft, action);

    subscriptionEventsReducer(draft, action);

    if (action.type === "TOGGLE_PRICE_FORMAT") {
      draft.settings.showDecimalPrices = !draft.settings.showDecimalPrices;
    }
  });
}
