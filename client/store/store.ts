import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import { Store } from '../types';

// initial states here
export const initialState: Store = {
  accessToken: null,
  user: null,
  events: null,
  activeEvent: null,
  navBarMode: false,
  userMode: 'userDashboard',
  eventMode: 'eventDashboard',
  activeAlert: false,
  alertContent: {
    severity: 'error',
    message: 'Something went wrong.',
  },
};

// middleware
const middleware = [thunk];

// creating store
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
