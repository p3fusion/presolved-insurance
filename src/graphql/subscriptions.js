/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel {
    onCreateChannel {
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
export const onUpdateChannel = /* GraphQL */ `
  subscription OnUpdateChannel {
    onUpdateChannel {
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
export const onDeleteChannel = /* GraphQL */ `
  subscription OnDeleteChannel {
    onDeleteChannel {
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
export const onCreateTaskTemplate = /* GraphQL */ `
  subscription OnCreateTaskTemplate {
    onCreateTaskTemplate {
      id
      name
      description
      attributes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTaskTemplate = /* GraphQL */ `
  subscription OnUpdateTaskTemplate {
    onUpdateTaskTemplate {
      id
      name
      description
      attributes
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTaskTemplate = /* GraphQL */ `
  subscription OnDeleteTaskTemplate {
    onDeleteTaskTemplate {
      id
      name
      description
      attributes
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask {
    onCreateTask {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask {
    onUpdateTask {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask {
    onDeleteTask {
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
export const onCreateEmailMessage = /* GraphQL */ `
  subscription OnCreateEmailMessage {
    onCreateEmailMessage {
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
export const onUpdateEmailMessage = /* GraphQL */ `
  subscription OnUpdateEmailMessage {
    onUpdateEmailMessage {
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
export const onDeleteEmailMessage = /* GraphQL */ `
  subscription OnDeleteEmailMessage {
    onDeleteEmailMessage {
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
export const onCreateAudit = /* GraphQL */ `
  subscription OnCreateAudit {
    onCreateAudit {
      id
      reference
      performedBy
      activity
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAudit = /* GraphQL */ `
  subscription OnUpdateAudit {
    onUpdateAudit {
      id
      reference
      performedBy
      activity
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAudit = /* GraphQL */ `
  subscription OnDeleteAudit {
    onDeleteAudit {
      id
      reference
      performedBy
      activity
      createdAt
      updatedAt
    }
  }
`;
export const onCreateConfig = /* GraphQL */ `
  subscription OnCreateConfig {
    onCreateConfig {
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
export const onUpdateConfig = /* GraphQL */ `
  subscription OnUpdateConfig {
    onUpdateConfig {
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
export const onDeleteConfig = /* GraphQL */ `
  subscription OnDeleteConfig {
    onDeleteConfig {
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
export const onCreateTenantConfig = /* GraphQL */ `
  subscription OnCreateTenantConfig {
    onCreateTenantConfig {
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
export const onUpdateTenantConfig = /* GraphQL */ `
  subscription OnUpdateTenantConfig {
    onUpdateTenantConfig {
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
export const onDeleteTenantConfig = /* GraphQL */ `
  subscription OnDeleteTenantConfig {
    onDeleteTenantConfig {
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
