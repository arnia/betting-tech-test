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

  return state;
}
