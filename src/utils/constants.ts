export const PYTHON_IMAGE="python:3.8-slim";
export const JAVA_IMAGE="openjdk";
export const CPP_IMAGE="gcc";
export const SUBMISSIOB_QUEUE="SubmissionQueue";

// As data is read chunk by chunk, so every chunk has a header and a value 
// This const represents the Header size of dockerStream.
// DockerStream "Header" will contain the data about the type of stream: "stdout/stderr" and the length of data streamed, 
export const DOCKER_STREAM_HEADER_SIZE=8;  // in bytes