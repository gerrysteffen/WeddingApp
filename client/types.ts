export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  active: boolean;
  activeEvent?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  invites: Invite[];
}

export type Event = {
  _id: string;
  createdTimestamp: Date;
  updatedTimestamp: Date;
  name: string;
  date: Date;
  description: string;
  fiance1: string;
  fiance2: string;
  invites: Invite[];
  organisers: string[];
  eventComms: Comms[];
}

export type ActiveEvent = {
  _id: string;
  createdTimestamp: Date;
  updatedTimestamp: Date;
  name: string;
  date: Date;
  description: string;
  fiance1: User;
  fiance2: User;
  invites: Invite[];
  organisers: string[] | User[];
  eventComms: Comms[];
}

export type Invite = {
  _id: string;
  event: Event;
  mainGuest: User;
  isOrganiser: boolean;
  isVIP: boolean;
  role: string;
  attendanceStatus: string;
  maxAddGuests: number;
  numberAddGuests: number;
  guests: User[];
  rsvps: RSVP[];
}

export type RSVP = {
  _id: string;
  invite: Invite;
  user: User;
  attendanceStatus: string;
  mealPreference: string;
  allergies: string[];
}

export type Comms = {
  createdDate: Date,
  updatedDate: Date,
  event: Event;
  title: string,
  body: string,
}

export type AlertType = {
  severity: string;
  message: string;
}

export type StateType = {
  accessToken: string;
  user: User | null;
  events: Event[] | null,
  activeEvent: Event | null,
  userMode: string,
  activeAlert: Boolean;
  alertContent: AlertType;
}
