import CppExecutor from "../containers/cppExecutor";
import PythonExecutor from "../containers/pythonExecutor";
import JavaExecutor from "../containers/runJavaExecutor";
import { CodeExecutorStrategy } from "../types/CodeExecutorStrategy";

function createExector(codeLanguage:string) : CodeExecutorStrategy | null {
  if(codeLanguage==="python") {
    return new PythonExecutor();
  } else if(codeLanguage==="cpp") {
    return new CppExecutor();
  } else if(codeLanguage==="java") {
    return new JavaExecutor();
  } else {
    return null;
  }
}

export default createExector;