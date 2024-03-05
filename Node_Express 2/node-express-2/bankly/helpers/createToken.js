import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";


/** return signed JWT for payload {username, admin}. */

function createToken(username, admin=false) {
  let payload = {username, admin};
  return sign(payload, SECRET_KEY);
}


export default createToken;