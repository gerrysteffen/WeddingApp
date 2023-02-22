import { EventInfo } from "../../types";
import ServerURL from "./serverUrl";

const eventAPIs = {
  postEvent: async (accessToken: string, event: EventInfo) => {
    const data = {
      event: {
        name: event.name,
        date: event.date,
        description: event.description,
      },
    };
    const res = await fetch(ServerURL + '/event', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error)) as Response;
    return res.json();
  },

  getEvent: async (accessToken: string, eventId: string) => {
    const res = await fetch(ServerURL + '/event/'+eventId, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error)) as Response;;
    return res.json();
  },

  // getPublicEvent: async (eventId) => {
  //   const res = await fetch(ServerURL + '/publicevent/'+eventId, {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).catch((error) => console.log(error)) as Response;;
  //   return res.json();
  // },
  
  getEvents: async (accessToken) => {
    const res = await fetch(ServerURL + '/events', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error)) as Response;;
    return res.json();
  },

  getMyEvents: async (accessToken) => {
    const res = await fetch(ServerURL + '/myevents', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error)) as Response;;
    return res.json();
  },

  updateEvent: async (accessToken, event) => {
    const data = {
      event: {
        _id: event._id,
        name: event.name,
        description: event.description,
        date: event.date,
        organisers: event.organisers,
      },
    };
    const res = await fetch(ServerURL + '/event', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error)) as Response;;
    return res.json();
  },
};

export default eventAPIs;
