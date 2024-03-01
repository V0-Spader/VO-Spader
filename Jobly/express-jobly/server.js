"use strict";

import { listen } from "./app";
import { PORT } from "./config";

listen(PORT, function () {
  console.log(`Started on http://localhost:${PORT}`);
});
