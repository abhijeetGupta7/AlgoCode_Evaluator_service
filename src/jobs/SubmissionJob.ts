import { Job } from 'bullmq';

import { IJob } from '../types/bullMqJobDefinition';
import { SubmissionPayload } from '../types/submissionPayload';
import createExector from '../utils/ExecutorFactory';

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
      const codeLanguage=this.payload[key].language;
      const code=this.payload[key].code;
      const inputTestCase=this.payload[key].inputTestCase;
      const executor=createExector(codeLanguage);
      if(executor!=null) {
        const response=await executor.execute(code,inputTestCase);
        if(response.status==="COMPLETED") {
          console.log("Code executed Successfully");
          console.log(response);
        } else {
          console.log("Something went wrong with code");
          console.log(response);
        }
      } else {
        console.log("ERROR");   // TODO
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
