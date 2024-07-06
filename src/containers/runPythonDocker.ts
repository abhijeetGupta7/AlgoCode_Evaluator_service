import { PYTHON_IMAGE } from "../utils/constants";
import createDockerContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import { pullImage } from "./pullImage";

async function runPythonContainer(code:string,inputTestCase:string) {
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

  await new Promise((res)=>{
    loggerStream.on("end",()=>{
      console.log(rawLogBuffer);
      const completedBuffer=Buffer.concat(rawLogBuffer);  // an array containing the complete buffer data 
      const decodedStream=decodeDockerStream(completedBuffer);  // decode the buffer data to string
      console.log(decodedStream);
      res(decodeDockerStream);
    });  
  });

  // remove the container when done with it
  await pythonDockerContainer.remove();
}
export default runPythonContainer;