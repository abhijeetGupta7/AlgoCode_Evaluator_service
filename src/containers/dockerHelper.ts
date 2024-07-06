// Helper for converting the bufferOutput to decoded String output and also have the logic to identify whether error or output, gracefully converted in string

import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";

export default function decodeDockerStream(buffer:Buffer) : DockerStreamOutput {
  let offset=0;  // This variable keeps track of the current  position in the buffer

  // Output that will store the decoded string format
  const output:DockerStreamOutput={ stdout:"",stderr:"" };

  // loop until the offset reaches the end of buffer
  while(offset<buffer.length) {

    // header(8 bytes) contains the type of stream (4 bytes) and is present at chunk[0] 
    const typeOfStream=buffer[offset];

    // This length variable holds the length of the value/data streamed
    // We will read this variable on an offset of 4 bytes from the start of the chunk
    const length=buffer.readUInt32BE(offset+4);

    // Shifting the offset towards left (8 bytes) from the start of the chunk to read the data/vallue streamed
    offset+=DOCKER_STREAM_HEADER_SIZE;   // it is of 8 bytes (in the utils/constants.ts)

    // Already stated in dockerode docs (this value comparison is a feature)
    if(typeOfStream===1) {
      // stdout stream
      output.stdout=buffer.toString("utf-8",offset,offset+length);  
    }
    
    else if(typeOfStream==2) {
      // stderr stream
      output.stderr=buffer.toString("utf-8",offset,offset+length);
    }
    offset+=length;  // move offset to next chunk
  }

  return output;
}