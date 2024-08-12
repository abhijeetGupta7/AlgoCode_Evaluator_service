import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

import EvaluationQueue from "../queues/EvaluationQueue";
import sampleQueue from "../queues/sampleQueue";
import SubmissionQueue from "../queues/SubmissonQueue";

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(sampleQueue),new BullMQAdapter(SubmissionQueue),new BullMQAdapter(EvaluationQueue)],
  serverAdapter: serverAdapter,
});

export default serverAdapter;