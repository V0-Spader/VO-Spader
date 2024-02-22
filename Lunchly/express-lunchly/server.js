/** Start server for Lunchly. */

import { listen } from "./app";

listen(3000, function() {
  console.log("listening on 3000");
});
