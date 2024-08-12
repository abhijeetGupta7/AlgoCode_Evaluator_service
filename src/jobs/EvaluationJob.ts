import { Job } from 'bullmq';

import { IJob } from '../types/bullMqJobDefinition';

export default class EvaluationJob implements IJob {
  name:string;
  payload: Record< string, unknown >;
  constructor(payload:Record<string,unknown>) {
    this.name=this.constructor.name;
    this.payload=payload;
  }

  handle = async (job?:Job) => {
    console.log("Handler of Job");
    console.log(this.payload);
    if(job) {
      console.log(job.data);
    }
  };

  failed = (job?:Job) : void => {
    console.log("Job failed");
    if(job) {
      console.log(job.id);
    }
  };
}
