import EvaluationQueue from "../queues/EvaluationQueue";

export default async function evaluationQueueProducer(payload:Record<string,unknown>) {
  await EvaluationQueue.add("EvaluationJob",payload);
  console.log("EvaluationJob added in Evaluation Queue successfully");
}