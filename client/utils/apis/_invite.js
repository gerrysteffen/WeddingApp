import ServerURL from './serverUrl';

const inviteAPIs = {
  postInvites: async (accessToken, inputData, eventId) => {
    const data = [];
    inputData.forEach((dataItem) => {
      data.push({
        user: {
          firstName: dataItem.firstName,
          lastName: dataItem.lastName,
          email: dataItem.email,
        },
        invite: {
          maxAddGuests: Number(dataItem.maxAddGuests),
          event: eventId,
        },
      });
    });
    const res = await fetch(ServerURL + '/invites', {
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

  getInvite: async (invId) => {
    const res = await fetch(ServerURL + '/invite/' + invId, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => console.log(error));
    return res.json();
  },

  updateInviteWithRsvp: async (invite, rsvp) => {
    const data = {
      users: invite.guests,
      invite: {
        _id: invite._id,
        attendanceStatus: invite.attendanceStatus
      },
      rsvps: rsvp
    };
    // console.log(data)
    const res = await fetch(ServerURL + '/invitersvp', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((error) => console.log(error));
    return res.json();
  },

  getInvites: async (accessToken, inviteIds) => {
    const data = {
      invites: inviteIds
    }
    const res = await fetch(ServerURL + '/invites', {
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

  // getMyEvents: async (accessToken) => {
  //   const res = await fetch(ServerURL + '/myevents', {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }).catch((error) => console.log(error));
  //   return res.json();
  // },

  // updateEvent: async (accessToken, event) => {
  //   const data = {
  //     event: {
  //       _id: event._id,
  //       name: event.name,
  //       description: event.description,
  //       date: event.date,
  //       organisers: event.organisers,
  //     },
  //   };
  //   const res = await fetch(ServerURL + '/event', {
  //     method: 'PUT',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify(data),
  //   }).catch((error) => console.log(error));
  //   return res.json();
  // },
};

export default inviteAPIs;
