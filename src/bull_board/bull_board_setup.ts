import sampleQueue from "../queues/sampleQueue";
import SubmissionQueue from "../queues/SubmissonQueue";

const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(sampleQueue),new BullAdapter(SubmissionQueue)],
  serverAdapter: serverAdapter,
});

export default serverAdapter;