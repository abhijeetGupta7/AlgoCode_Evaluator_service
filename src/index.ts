
import express, {Express} from "express"; // we can use cjs import also

import serverConfig from "./config/server.config";
import apirouter from "./routes";

const app:Express = express();

app.use("/api",apirouter);

app.listen(serverConfig.PORT, () => {
  console.log("Server is listening at port", serverConfig.PORT);
  console.log("Badi garmi h");
  console.log("Apne pr rakh visvash abnde");
  console.log("Ms Dhoni");
});
