import { StateType } from '../../types';

const reducer = (state: StateType, action: { type: string; payload: any }) => {
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
      };
    case 'SET_ALERT':
      return {
        ...state,
        activeAlert: action.payload.active,
        alertContent: action.payload.alertContent,
      };
    default:
      return state;
  }
};

export default reducer;
