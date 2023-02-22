import { CommsInfo } from "../../types";
import ServerURL from "./serverUrl";

const commsAPIs = {
  postComm: async (accessToken: string, comm: CommsInfo) => {
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
    }).catch((error) => console.log(error)) as Response;
    return res.json();
  },
}

export default commsAPIs