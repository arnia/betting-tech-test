import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import reducer from "./reducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
