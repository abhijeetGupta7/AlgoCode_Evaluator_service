import { Job } from 'bullmq';

import runCppContainer from '../containers/runCppDocker';
import { IJob } from '../types/bullMqJobDefinition';
import { SubmissionPayload } from '../types/submissionPayload';

export default class SubmissionJob implements IJob {
  name:string;
  payload: Record< string, SubmissionPayload >;
  constructor(payload:Record<string,SubmissionPayload>) {
    this.name=this.constructor.name;
    this.payload=payload;
  }

  handle = async (job?:Job) => {
    console.log("Handler of Sample Job");
    console.log(this.payload);
    if(job) {
      //console.log(job.name,job.id,job.data);
      const key=Object.keys(this.payload)[0];  // as of now key is the unique userID
      if(this.payload[key].language=="CPP") {
        const response=await runCppContainer(this.payload[key].code,this.payload[key].inputTestCase);
        console.log("Evaluated respone is",response);
      }
    }
  };

  failed = (job?:Job) : void => {
    console.log("Job failed");
    if(job) {
      console.log(job.id);
    }
  };
}
