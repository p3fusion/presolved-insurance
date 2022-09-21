import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ChannelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TaskTemplateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Channel {
  readonly id: string;
  readonly contactID: string;
  readonly channelType: string;
  readonly contactAttributes?: string | null;
  readonly tasks?: (Task | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Channel, ChannelMetaData>);
  static copyOf(source: Channel, mutator: (draft: MutableModel<Channel, ChannelMetaData>) => MutableModel<Channel, ChannelMetaData> | void): Channel;
}

export declare class Task {
  readonly id: string;
  readonly channel: Channel;
  readonly contactID: string;
  readonly channelType: string;
  readonly Name: string;
  readonly taskAttributes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Task, TaskMetaData>);
  static copyOf(source: Task, mutator: (draft: MutableModel<Task, TaskMetaData>) => MutableModel<Task, TaskMetaData> | void): Task;
}

export declare class TaskTemplate {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly attributes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TaskTemplate, TaskTemplateMetaData>);
  static copyOf(source: TaskTemplate, mutator: (draft: MutableModel<TaskTemplate, TaskTemplateMetaData>) => MutableModel<TaskTemplate, TaskTemplateMetaData> | void): TaskTemplate;
}