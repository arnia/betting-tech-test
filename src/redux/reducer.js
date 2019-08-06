const defaultState = {
  events: { loading: false },
  markets: {}
};

export default function reducer(state = defaultState, action) {
  if (action.type === "START_LOADING_EVENTS") {
    return {
      ...state,
      events: {
        loading: true,
        data: []
      }
    };
  }

  if (action.type === "SET_EVENTS") {
    return {
      ...state,
      events: {
        loading: false,
        data: action.events
      }
    };
  }

  if (action.type === "START_LOADING_MARKET") {
    return {
      ...state,
      markets: {
        ...state.markets,
        [action.marketId]: {
          loading: true,
          data: {}
        }
      }
    };
  }

  if (action.type === "SET_MARKET_DATA") {
    return {
      ...state,
      markets: {
        ...state.markets,
        [action.market.marketId]: {
          loading: false, // will make it true when we get the outcomes
          data: action.market
        }
      }
    };
  }

  if (action.type === "SET_OUTCOME_DATA") {
    debugger;
    const newState = {
      ...state,
      markets: {
        ...state.markets,
        [action.outcome.marketId]: {
          loading: true,
          data: {
            ...state.markets[action.outcome.marketId],
            outcomesData: {
              ...(state.markets[action.outcome.marketId].outcomesData || {}),
              [action.outcome.outcomeId]: action.outcome
            }
          }
        }
      }
    };
    return newState;
  }

  return state;
}
