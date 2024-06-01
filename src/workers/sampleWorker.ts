import { Job,Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import SampleJob from "../jobs/SampleJob";


export default function SampleWorker(queueName:string) {
  console.log("Worker kicked successfully");                // Worker/consumer same hi h (just name)
  new Worker(queueName,async (job:Job) => {
    
    if(job.name==="SampleJob") {
      const sampleJobInstance=new SampleJob(job.data);

      console.log("Handler of job is executing");
      sampleJobInstance.handle(job);
    }
  },
  { connection:redisConnection }
  );
}
