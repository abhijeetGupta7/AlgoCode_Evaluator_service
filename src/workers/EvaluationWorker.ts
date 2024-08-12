import { Job, Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import EvaluationJob from "../jobs/EvaluationJob";

export default async function EvaluationWorker(queueName:string) {
  new Worker(queueName,async(job:Job)=>{
    if(job.name==="EvaluationJob") {
      const EvaluationJobInstance=new EvaluationJob(job.data);
      console.log("Handler of Evaluation Job called");
      EvaluationJobInstance.handle(job);
    }
  },
  { connection:redisConnection }
  );
}