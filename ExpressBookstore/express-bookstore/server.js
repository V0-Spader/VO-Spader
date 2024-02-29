/** Server for bookstore. */


import { listen } from "./app";

listen(3000, () => {
  console.log(`Server starting on port 3000`);
});
