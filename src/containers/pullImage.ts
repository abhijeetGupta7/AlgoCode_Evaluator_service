import Docker from "dockerode";

export async function pullImage(imageName:string) {
  const docker=new Docker(); 

  try {
    return new Promise((res,rej)=>{
      // eslint-disable-next-line no-undef
      docker.pull(imageName,(err:Error,stream: NodeJS.ReadableStream)=>{         
        if(err) throw err;
        docker.modem.followProgress(stream,(err,response)=> err? rej(err) : res(response), (event)=> {
          console.log(event.status);
        });
      });
    });
  }
  catch(error) {
    console.log(error);
  }
}