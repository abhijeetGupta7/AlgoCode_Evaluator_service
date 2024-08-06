import SubmissionQueue from "../queues/SubmissonQueue";

// we have omiited the name paramter as we know that is will always be "SubmissionJob"
export default async function SubmissionQueueProducer(payload:Record<string,unknown>) {
  await SubmissionQueue.add("SubmissonJob",payload);
  console.log("Producer added subbmisson Job added in Submission Queue successfully");
}