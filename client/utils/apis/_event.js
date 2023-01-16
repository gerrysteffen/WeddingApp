import ServerURL from "./serverUrl";

const eventAPIs = {
  postEvent: async (accessToken, event) => {
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
    }).catch((error) => console.log(error));
    return res.json();
  },

  getEvent: async (accessToken, eventId) => {
    const res = await fetch(ServerURL + '/event/'+eventId, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error));
    return res.json();
  },

  getEvents: async (accessToken) => {
    const res = await fetch(ServerURL + '/events', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error));
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
    }).catch((error) => console.log(error));
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
    }).catch((error) => console.log(error));
    return res.json();
  },
};

export default eventAPIs;
