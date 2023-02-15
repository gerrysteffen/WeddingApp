import { User } from '../../types';

export const setReload = (toggle: Boolean) => ({
  type: 'SET_RELOAD',
  payload: toggle,
});
export const setLoading = (toggle: Boolean) => ({
  type: 'SET_LOADING',
  payload: toggle,
});
export const setAlert = (
  active: Boolean,
  severity: string,
  message: string
) => ({
  type: 'SET_ALERT',
  payload: {
    active: active,
    alertContent: { severity: severity, message: message },
  },
});
export const setAccessToken = (accessToken: string | null) => ({
  type: 'SET_ACCESSTOKEN',
  payload: accessToken,
});
export const setUser = (user: User | null) => ({
  type: 'SET_USER',
  payload: user,
});
export const setEvents = (events: Event[] | null) => ({
  type: 'SET_EVENTS',
  payload: events,
});
export const setActiveEvent = (event: Event | null) => ({
  type: 'SET_ACTIVE_EVENT',
  payload: event,
});
export const updateUser = (userAttributes: any) => ({
  type: 'UPDATE_USER',
  payload: userAttributes,
});
export const setUserMode = (userMode: string) => ({
  type: 'SET_USER_MODE',
  payload: userMode,
});
export const setEventMode = (eventMode: string) => ({
  type: 'SET_EVENT_MODE',
  payload: eventMode,
});
export const setNavBarMode = (navBarMode: boolean) => ({
  type: 'SET_NAVBAR_MODE',
  payload: navBarMode,
});
export const resetState = () => ({
  type: 'RESET_STATE',
  payload: null,
});


