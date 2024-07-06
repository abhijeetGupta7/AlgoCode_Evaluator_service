import Docker from "dockerode";

async function createDockerContainer(image:string,cmd_executable:string[]) {
  const docker = new Docker();

  const dockerContainer= await docker.createContainer({
    Image: image,
    Cmd: cmd_executable,
    AttachStdin: true,  // to enable input stream
    AttachStdout: true,  // to enable output stream
    AttachStderr: true,  // to enable error stream
    OpenStdin: true,    // keep the input stream open even when no interaction
    Tty: false, 
  });
  return dockerContainer;
}

export default createDockerContainer;