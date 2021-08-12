import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../src/redux/rootReducer";
import sagas from "../src/redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)(rootReducer);

sagaMiddleware.run(sagas);

export default store;

/* const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose; 

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))); */
