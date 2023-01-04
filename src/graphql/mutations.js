/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
      id
      assignTo
      contactID
      channelType
      contactAttributes
      notes
      tasks {
        items {
          id
          assignTo
          channelID
          contactID
          channelType
          Name
          taskAttributes
          notes
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel(
    $input: UpdateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    updateChannel(input: $input, condition: $condition) {
      id
      assignTo
      contactID
      channelType
      contactAttributes
      notes
      tasks {
        items {
          id
          assignTo
          channelID
          contactID
          channelType
          Name
          taskAttributes
          notes
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel(
    $input: DeleteChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    deleteChannel(input: $input, condition: $condition) {
      id
      assignTo
      contactID
      channelType
      contactAttributes
      notes
      tasks {
        items {
          id
          assignTo
          channelID
          contactID
          channelType
          Name
          taskAttributes
          notes
          status
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTaskTemplate = /* GraphQL */ `
  mutation CreateTaskTemplate(
    $input: CreateTaskTemplateInput!
    $condition: ModelTaskTemplateConditionInput
  ) {
    createTaskTemplate(input: $input, condition: $condition) {
      id
      name
      description
      attributes
      createdAt
      updatedAt
    }
  }
`;
export const updateTaskTemplate = /* GraphQL */ `
  mutation UpdateTaskTemplate(
    $input: UpdateTaskTemplateInput!
    $condition: ModelTaskTemplateConditionInput
  ) {
    updateTaskTemplate(input: $input, condition: $condition) {
      id
      name
      description
      attributes
      createdAt
      updatedAt
    }
  }
`;
export const deleteTaskTemplate = /* GraphQL */ `
  mutation DeleteTaskTemplate(
    $input: DeleteTaskTemplateInput!
    $condition: ModelTaskTemplateConditionInput
  ) {
    deleteTaskTemplate(input: $input, condition: $condition) {
      id
      name
      description
      attributes
      createdAt
      updatedAt
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      assignTo
      channelID
      channel {
        id
        assignTo
        contactID
        channelType
        contactAttributes
        notes
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      contactID
      channelType
      Name
      taskAttributes
      notes
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      assignTo
      channelID
      channel {
        id
        assignTo
        contactID
        channelType
        contactAttributes
        notes
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      contactID
      channelType
      Name
      taskAttributes
      notes
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      assignTo
      channelID
      channel {
        id
        assignTo
        contactID
        channelType
        contactAttributes
        notes
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      contactID
      channelType
      Name
      taskAttributes
      notes
      status
      createdAt
      updatedAt
    }
  }
`;
export const createEmailMessage = /* GraphQL */ `
  mutation CreateEmailMessage(
    $input: CreateEmailMessageInput!
    $condition: ModelEmailMessageConditionInput
  ) {
    createEmailMessage(input: $input, condition: $condition) {
      id
      channelID
      from
      to
      messageID
      body
      subject
      attachments
      receivedTime
      createdAt
      updatedAt
    }
  }
`;
export const updateEmailMessage = /* GraphQL */ `
  mutation UpdateEmailMessage(
    $input: UpdateEmailMessageInput!
    $condition: ModelEmailMessageConditionInput
  ) {
    updateEmailMessage(input: $input, condition: $condition) {
      id
      channelID
      from
      to
      messageID
      body
      subject
      attachments
      receivedTime
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmailMessage = /* GraphQL */ `
  mutation DeleteEmailMessage(
    $input: DeleteEmailMessageInput!
    $condition: ModelEmailMessageConditionInput
  ) {
    deleteEmailMessage(input: $input, condition: $condition) {
      id
      channelID
      from
      to
      messageID
      body
      subject
      attachments
      receivedTime
      createdAt
      updatedAt
    }
  }
`;
export const createAudit = /* GraphQL */ `
  mutation CreateAudit(
    $input: CreateAuditInput!
    $condition: ModelAuditConditionInput
  ) {
    createAudit(input: $input, condition: $condition) {
      id
      reference
      performedBy
      activity
      createdAt
      updatedAt
    }
  }
`;
export const updateAudit = /* GraphQL */ `
  mutation UpdateAudit(
    $input: UpdateAuditInput!
    $condition: ModelAuditConditionInput
  ) {
    updateAudit(input: $input, condition: $condition) {
      id
      reference
      performedBy
      activity
      createdAt
      updatedAt
    }
  }
`;
export const deleteAudit = /* GraphQL */ `
  mutation DeleteAudit(
    $input: DeleteAuditInput!
    $condition: ModelAuditConditionInput
  ) {
    deleteAudit(input: $input, condition: $condition) {
      id
      reference
      performedBy
      activity
      createdAt
      updatedAt
    }
  }
`;
export const createConfig = /* GraphQL */ `
  mutation CreateConfig(
    $input: CreateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    createConfig(input: $input, condition: $condition) {
      id
      name
      type
      ARNReference
      parameters
      createdAt
      updatedAt
    }
  }
`;
export const updateConfig = /* GraphQL */ `
  mutation UpdateConfig(
    $input: UpdateConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    updateConfig(input: $input, condition: $condition) {
      id
      name
      type
      ARNReference
      parameters
      createdAt
      updatedAt
    }
  }
`;
export const deleteConfig = /* GraphQL */ `
  mutation DeleteConfig(
    $input: DeleteConfigInput!
    $condition: ModelConfigConditionInput
  ) {
    deleteConfig(input: $input, condition: $condition) {
      id
      name
      type
      ARNReference
      parameters
      createdAt
      updatedAt
    }
  }
`;
export const createTenantConfig = /* GraphQL */ `
  mutation CreateTenantConfig(
    $input: CreateTenantConfigInput!
    $condition: ModelTenantConfigConditionInput
  ) {
    createTenantConfig(input: $input, condition: $condition) {
      id
      name
      company
      adminEmail
      phone
      isSignedup
      intents
      templates
      Channels
      instanceURL
      connectInstanceURL
      createdAt
      updatedAt
    }
  }
`;
export const updateTenantConfig = /* GraphQL */ `
  mutation UpdateTenantConfig(
    $input: UpdateTenantConfigInput!
    $condition: ModelTenantConfigConditionInput
  ) {
    updateTenantConfig(input: $input, condition: $condition) {
      id
      name
      company
      adminEmail
      phone
      isSignedup
      intents
      templates
      Channels
      instanceURL
      connectInstanceURL
      createdAt
      updatedAt
    }
  }
`;
export const deleteTenantConfig = /* GraphQL */ `
  mutation DeleteTenantConfig(
    $input: DeleteTenantConfigInput!
    $condition: ModelTenantConfigConditionInput
  ) {
    deleteTenantConfig(input: $input, condition: $condition) {
      id
      name
      company
      adminEmail
      phone
      isSignedup
      intents
      templates
      Channels
      instanceURL
      connectInstanceURL
      createdAt
      updatedAt
    }
  }
`;
