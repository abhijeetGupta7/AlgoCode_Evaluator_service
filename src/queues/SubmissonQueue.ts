import { Queue } from 'bullmq';

import redisConnection from '../config/redisConfig';

export default new Queue("SubmissonQueue",{ connection:redisConnection }); 