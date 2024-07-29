import {CodeExecutorStrategy, ExecutionResponse } from "../types/CodeExecutorStrategy";
import DockerStreamOutput from "../types/dockerStreamOutput";
import { PYTHON_IMAGE } from "../utils/constants";
import createDockerContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import { pullImage } from "./pullImage";

class PythonExecutor implements CodeExecutorStrategy {

  async execute(code: string, inputTestCase: string): Promise<ExecutionResponse> {
    console.log("Intializing the new python docker container"); 

    console.log("Pulling the Docker Image");
    await pullImage(PYTHON_IMAGE);
    const runCommand= `echo '${code.replace(/'/g,`'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g,`'\\"`)}' | python3 test.py`;
    const pythonDockerContainer=await createDockerContainer(PYTHON_IMAGE,[
      '/bin/sh',
      '-c',
      runCommand
    ]); 
    // const pythonDockerContainer=await createDockerContainer(PYTHON_IMAGE,["python3","-c",code,"stty-echo"]); 
    
    // starting / booting container
    await pythonDockerContainer.start();
    console.log("started the docker container");
  
    const loggerStream=await pythonDockerContainer.logs({
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
      return { output:CodeResponse, status:"Completed" };
    } catch (error) {
      return { output:error as string, status:"ERROR"};
    } finally {
      await pythonDockerContainer.remove();  // remove the container when done with it
      
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

export default PythonExecutor;