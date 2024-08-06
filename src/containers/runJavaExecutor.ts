import { CodeExecutorStrategy, ExecutionResponse } from "../types/CodeExecutorStrategy";
import { JAVA_IMAGE } from "../utils/constants";
import createDockerContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import { pullImage } from "./pullImage";

class JavaExecutor implements CodeExecutorStrategy {
  async execute(code: string, inputTestCase: string, outputTestCase:string): Promise<ExecutionResponse> {
    
    console.log(code);
    console.log(inputTestCase);
    console.log(outputTestCase);

    console.log("Intializing the new java docker container"); 
      
    console.log("Pulling the Docker Image");
    await pullImage(JAVA_IMAGE);
    const runCommand= `echo '${code.replace(/'/g,`'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g,`'\\"`)}' | java Main`;
    const javaDockerContainer=await createDockerContainer(JAVA_IMAGE,[
      '/bin/sh',
      '-c',
      runCommand
    ]); 
    
    // starting / booting container
    await javaDockerContainer.start();
    console.log("started the docker container");
    
    const loggerStream=await javaDockerContainer.logs({
      stdout:true,
      stderr:true,
      timestamps:false,
      follow:true               // whether the logs are streamed or returned as a single string
    });
    
    // Attach events on the "loggerStream object" to start and stop reading
    const rawLogBuffer: Buffer[]=[];
    
    loggerStream.on("data",(chunk)=>{
      rawLogBuffer.push(chunk);
    });

    try {
      const CodeResponse : string = await this.fetchDecodedStream(rawLogBuffer,loggerStream);  
      return { output:CodeResponse, status:"COMPLETED" };
    } catch (error) {
      return { output:error as string, status:"ERROR"};
    } finally {
      await javaDockerContainer.remove();  // remove the container when done with it  
    }
  }

  // eslint-disable-next-line no-undef
  fetchDecodedStream(rawLogBuffer:Buffer[] , loggerStream: NodeJS.ReadableStream) : Promise<string> {
    return new Promise((res,rej)=>{
      loggerStream.on("end",()=>{
        console.log(rawLogBuffer);
        const completedBuffer=Buffer.concat(rawLogBuffer);  // an array containing the complete buffer data 
        const decodedStream=decodeDockerStream(completedBuffer);  // decode the buffer data to string
        console.log(decodedStream);
        if(decodedStream.stderr) {
          rej(decodedStream.stderr);
        } else {
          res(decodedStream.stdout);
        }
      });  
    });
  }
}

export default JavaExecutor;