import bodyParser from "body-parser";
import express, {Express} from "express"; // we can use cjs import also

import serverAdapter from "./bull_board/bull_board_setup";
import serverConfig from "./config/server.config";
import runCppContainer from "./containers/cppExecutor";
import runPythonContainer from "./containers/pythonExecutor";
import runJavaContainer from "./containers/runJavaExecutor";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import SubmissionQueueProducer from "./producers/SubmissionQueueProducer";
import apirouter from "./routes";
import { SUBMISSIOB_QUEUE } from "./utils/constants";
import SampleWorker from "./workers/sampleWorker";
import SubmissionWorker from "./workers/SubmissionWorker";

const app:Express = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",apirouter);
app.use('/admin/queues', serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log("Server is listening at port", serverConfig.PORT);
  console.log('For the Bull-Board UI, open http://localhost:8080/admin/queues');
  
  const codePython=`print(input())`;
  const codeJava=`import java.util.Scanner;
class Main {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int num=sc.nextInt();
        System.out.println("Number is ");
        System.out.println(num);
    }
}`;

  const codeCpp=`#include<bits/stdc++.h>
using namespace std;
int main() {
    int a,b;
    cin >> a >> b;      
    cout << "value of a is " << a << " and b is " << b;
}
`;
  const inputTestCase="77 23";

  //runPythonContainer(codePython,inputTestCase);
  //runJavaContainer(codeJava,inputTestCase);
  // runCppContainer(codeCpp,inputTestCase);

  SubmissionQueueProducer({ '777' :{  // userID:data
    language:"CPP",
    code:codeCpp,
    inputTestCase:inputTestCase
  }
  });

  SubmissionWorker(SUBMISSIOB_QUEUE);
});



/*
sampleQueueProducer("SampleJob",{
  name:"Abhijeet",
  profession:"Student",
  Interest:"WebD, CP, DSA"
}, 1
);

sampleQueueProducer("SampleJob",{
  name:"Kakarott",
  profession:"Fighter",
  Interest:"Food, Fighting"
}, 3
);
*/
sampleQueueProducer("SampleJob",{
  name:"Tony Stark",
  profession:"SuperHero",
  Interest:"Tech, Romeo, Samajsevak"
}, 2
);


SampleWorker("SampleQueue"); 

