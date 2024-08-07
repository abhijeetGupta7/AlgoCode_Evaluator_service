import { Job,Worker } from 'bullmq';

import redisConnection from '../config/redisConfig';
import SubmissionJob from '../jobs/SubmissonJob';

export default function SubmissionWorker(queueName:string) {
  console.log("Worker kicked successfully");
  new Worker(queueName,async (job:Job)=> {
    
    if(job.name=="SubmissonJob") {
      const submissionJobInstance=new SubmissionJob(job.data);
      console.log("Handler of job is executing");
      submissionJobInstance.handle(job);   
    }
  },
  { connection:redisConnection }
  );
}
