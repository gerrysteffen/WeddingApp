import { Store } from '../../types';
import { initialState } from '../store';

const reducer = (state: Store, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'SET_ACCESSTOKEN':
      return {
        ...state,
        accessToken: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload,
      };
    case 'SET_ACTIVE_EVENT':
      return {
        ...state,
        activeEvent: action.payload,
      };
    case 'SET_USER_MODE':
      return {
        ...state,
        userMode: action.payload,
        eventMode: 'eventDashboard'
      };
    case 'SET_EVENT_MODE':
      return {
        ...state,
        eventMode: action.payload,
        userMode: 'userDashboard',
      };
    case 'SET_NAVBAR_MODE':
      return {
        ...state,
        navBarMode: action.payload,
      };
    case 'SET_ALERT':
      return {
        ...state,
        activeAlert: action.payload.active,
        alertContent: action.payload.alertContent,
      };
    case 'RESET_STATE':
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
