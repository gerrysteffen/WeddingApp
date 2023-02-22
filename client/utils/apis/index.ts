import commsAPIs from "./_comm.js";
import eventAPIs from "./_event.js";
import inviteAPIs from "./_invite.js";
import userAPIs from "./_user.js";

const apiCalls = {
  ...userAPIs,
  ...eventAPIs,
  ...inviteAPIs,
  ...commsAPIs
}

export default apiCalls
