import ServerURL from "./serverUrl";

const commsAPIs = {
  postComm: async (accessToken, comm) => {
    const data = {
      comm: {
        title: comm.title,
        event: comm.event,
        body: comm.body,
      },
    };
    const res = await fetch(ServerURL + '/comm', {
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
}

export default commsAPIs