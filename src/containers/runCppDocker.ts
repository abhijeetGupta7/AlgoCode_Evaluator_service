import { CPP_IMAGE } from "../utils/constants";
import createDockerContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";
import { pullImage } from "./pullImage";

async function runCppContainer(code:string,inputTestCase:string) {
  console.log("Intializing the new CPP docker container"); 
  
  console.log("Pulling the Docker Image");
  await pullImage(CPP_IMAGE);
  const runCommand= `echo '${code.replace(/'/g,`'\\"`)}' > demo.cpp && g++ demo.cpp -o demo && echo '${inputTestCase.replace(/'/g,`'\\"`)}' | stdbuf -oL -eL ./demo`;
  const cppDockerContainer=await createDockerContainer(CPP_IMAGE,[
    '/bin/sh',
    '-c',
    runCommand
  ]); 

  // starting / booting container
  await cppDockerContainer.start();
  console.log("started the docker container");

  const loggerStream=await cppDockerContainer.logs({
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
  await cppDockerContainer.remove();
}
export default runCppContainer;