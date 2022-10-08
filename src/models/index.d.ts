import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type ChannelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TaskTemplateMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EmailMessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AuditMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ConfigMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Channel {
  readonly id: string;
  readonly assignTo: string;
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
  readonly assignTo: string;
  readonly channel: Channel;
  readonly contactID: string;
  readonly channelType: string;
  readonly Name: string;
  readonly taskAttributes?: string | null;
  readonly status: string;
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

export declare class EmailMessage {
  readonly id: string;
  readonly channelID: string;
  readonly from: string;
  readonly to: string;
  readonly messageID: string;
  readonly body: string;
  readonly subject: string;
  readonly attachments?: string | null;
  readonly receivedTime: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<EmailMessage, EmailMessageMetaData>);
  static copyOf(source: EmailMessage, mutator: (draft: MutableModel<EmailMessage, EmailMessageMetaData>) => MutableModel<EmailMessage, EmailMessageMetaData> | void): EmailMessage;
}

export declare class Audit {
  readonly id: string;
  readonly reference: string;
  readonly performedBy: string;
  readonly activity?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Audit, AuditMetaData>);
  static copyOf(source: Audit, mutator: (draft: MutableModel<Audit, AuditMetaData>) => MutableModel<Audit, AuditMetaData> | void): Audit;
}

export declare class Config {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly ARNReference: string;
  readonly parameters?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Config, ConfigMetaData>);
  static copyOf(source: Config, mutator: (draft: MutableModel<Config, ConfigMetaData>) => MutableModel<Config, ConfigMetaData> | void): Config;
}