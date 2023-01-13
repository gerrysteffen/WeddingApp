const url = 'http://localhost:3001';

const eventAPIs = {
  postEvent: async (accessToken, event) => {
    const data = {
      event: {
        name: event.name,
        date: event.date,
        description: event.description,
      }
    }
    const res = await fetch(url + '/event', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data)
    }).catch((error) => console.log(error));
    return res.json();
  },

  getEvent: async (accessToken, eventId) => {
    const data = {
      event: {
        _id: eventId
      }
    }
    const res = await fetch(url + '/event', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data)
    }).catch((error) => console.log(error));
    return res.json();
  },

  getEvents: async (accessToken) => {
    const res = await fetch(url + '/events', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error));
    return res.json();
  },

  getMyEvents: async (accessToken) => {
    const res = await fetch(url + '/myevents', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }).catch((error) => console.log(error));
    return res.json();
  },
}

export default eventAPIs