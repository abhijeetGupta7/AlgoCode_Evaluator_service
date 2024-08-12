import { Job } from 'bullmq';

import evaluationQueueProducer from '../producers/EvaluationQueueProducer';
import { IJob } from '../types/bullMqJobDefinition';
import { SubmissonPayload } from '../types/submissonPayload';
import createExector from '../utils/ExecutorFactory';

export default class SubmissionJob implements IJob {
  name:string;
  payload: Record< string, SubmissonPayload >;
  constructor(payload:Record<string,SubmissonPayload>) {
    this.name=this.constructor.name;
    this.payload=payload;
  }

  handle = async (job?:Job) => {
    console.log("Handler of Job");
    console.log(this.payload);
    if(job) {
      //console.log(job.name,job.id,job.data);
      const key=Object.keys(this.payload)[0];  // as of now key is the unique submissonId
      const codeLanguage=this.payload[key].language;
      const code=this.payload[key].code;
      const inputTestCase=this.payload[key].inputTestCase;
      const outputTestCase=this.payload[key].outputTestCase;
      const executor=createExector(codeLanguage);
      if(executor!=null) {
        const response=await executor.execute(code,inputTestCase,outputTestCase);
        evaluationQueueProducer( {
          userId:this.payload[key].userId,
          submissonId:this.payload[key].submissonId,
          response
        });
        if(response.status==="SUCCESS") {
          console.log("Code executed Successfully");
          console.log(response);
        }
        else if(response.status==="WA") {
          console.log("Wrong answer");
          console.log(response);
        } 
        else {
          console.log("Something went wrong with code");
          console.log(response);
        }
      } else {
        console.log("ERROR");   // TODO proper error
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
