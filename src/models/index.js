// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Channel, Task } = initSchema(schema);

export {
  Channel,
  Task
};