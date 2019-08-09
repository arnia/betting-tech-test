import produce from "immer";
import _ from "lodash";

const defaultState = {
  events: {},
  eventsLoading: false,
  markets: {},
  outcomes: {},
  settings: {
    showDecimalPrices: false
  },
  subcriptions: {
    events: {},
    markets: {},
    outcomes: {}
  },
  betSlip: []
};

function betSlipReducer(draft, action) {
  if (action.type === "BET_SLIP_ADD") {
    const alreadyAdded = _.find(draft.betSlip, id => id === action.outcomeId);

    if (!alreadyAdded) {
      const outcome = draft.outcomes[action.outcomeId];
      if (outcome.data) {
        draft.betSlip.unshift(action.outcomeId);
      }
    }
  }

  if (action.type === "BET_SLIP_REMOVE") {
    draft.betSlip = draft.betSlip.filter(id => id !== action.outcomeId);
  }
}

function eventsReducer(draft, action) {
  if (action.type === "START_LOADING_EVENTS") {
    draft.eventsLoading = true;
  }

  if (action.type === "SET_LIVE_EVENTS") {
    let events = {};
    (action.events || []).forEach(event => {
      draft.eventsLoading = action.loading;
      const oldEvent = draft.events[event.eventId] || {};
      events[event.eventId] = {
        ...oldEvent,
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
        outcomeId: id,
        data: {}
      });
    });
    market.loadingOutcomes = true;
  }

  if (action.type === "SET_OUTCOME_DATA") {
    const market = draft.markets[action.outcome.marketId].data;
    draft.outcomes[action.outcome.outcomeId] = {
      loading: false,
      outcomeId: action.outcome.outcomeId,
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

function subscriptionResultsReducer(draft, action) {
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

function subscriptionsReducer(draft, action) {
  if (action.type === "SUBSCRIBE") {
    const obj = _.get(draft, action.to + "s." + action.id);
    if (obj) {
      obj.subscribed = true;
    }
  }

  if (action.type === "UNSUBSCRIBE") {
    const obj = _.get(draft, action.to + "s." + action.id);

    if (obj) {
      obj.subscribed = false;
    }
  }
}

export default function reducer(state = defaultState, action) {
  return produce(state, draft => {
    eventsReducer(draft, action);

    marketsReducer(draft, action);

    outcomesReducer(draft, action);

    subscriptionResultsReducer(draft, action);

    subscriptionsReducer(draft, action);

    betSlipReducer(draft, action);

    if (action.type === "TOGGLE_PRICE_FORMAT") {
      draft.settings.showDecimalPrices = !draft.settings.showDecimalPrices;
    }
  });
}
