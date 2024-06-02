import express, {Express} from "express"; // we can use cjs import also

import serverAdapter from "./bull_board/bull_board_setup";
import serverConfig from "./config/server.config";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apirouter from "./routes";
import SampleWorker from "./workers/sampleWorker";

const app:Express = express();

app.use("/api",apirouter);
app.use('/admin/queues', serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log("Server is listening at port", serverConfig.PORT);
  console.log('For the Bull-Board UI, open http://localhost:8080/admin/queues');
});

sampleQueueProducer("SampleJob",{
  name:"Abhijeet",
  profession:"Student",
  Interest:"WebD, CP, DSA"
}, 1
);

sampleQueueProducer("SampleJob",{
  name:"Kakarott",
  profession:"Fighter",
  Interest:"Food, Fighting"
}, 3
);

sampleQueueProducer("SampleJob",{
  name:"Tony Stark",
  profession:"SuperHero",
  Interest:"Tech, Romeo, Samajsevak"
}, 2
);


SampleWorker("SampleQueue");

