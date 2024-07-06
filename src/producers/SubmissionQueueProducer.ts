import SubmissionQueue from "../queues/SubmissionQueue";

// we have omiited the name paramter as we know that is will always be "SubmissionJob"
export default async function SubmissionQueueProducer(payload:Record<string,unknown>) {
  await SubmissionQueue.add("SubmissionJob",payload);
  console.log("Producer added subbmission Job added in Submission Queue successfully");
}