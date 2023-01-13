import eventAPIs from "./_event.js";
import userAPIs from "./_user.js";

const apiCalls = {
  ...userAPIs,
  ...eventAPIs
}

export default apiCalls
