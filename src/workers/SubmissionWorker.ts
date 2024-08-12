import { Job,Worker } from 'bullmq';

import redisConnection from '../config/redisConfig';
import SubmissionJob from '../jobs/SubmissonJob';

export default function SubmissionWorker(queueName:string) {
  new Worker(queueName,async (job:Job)=> {
    console.log("Submisson Worker kicked successfully");
    
    if(job.name=="SubmissonJob") {
      const submissionJobInstance=new SubmissionJob(job.data);
      console.log("Handler of Submisson job is executing");
      console.log(job.data);
      submissionJobInstance.handle(job);   
    }
  },
  { connection:redisConnection }
  ); 
}
