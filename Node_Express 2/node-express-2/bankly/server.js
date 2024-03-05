/** Server for bank.ly. */


import { listen } from "./app";

listen(3000, () => {
  console.log(`Server starting on port 3000`);
});
