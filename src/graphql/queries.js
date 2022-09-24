/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChannel = /* GraphQL */ `
  query GetChannel($id: ID!) {
    getChannel(id: $id) {
      id
      user
      contactID
      channelType
      contactAttributes
      tasks {
        items {
          id
          user
          assignTo
          channelID
          contactID
          channelType
          Name
          taskAttributes
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
export const listChannels = /* GraphQL */ `
  query ListChannels(
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        contactID
        channelType
        contactAttributes
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTaskTemplate = /* GraphQL */ `
  query GetTaskTemplate($id: ID!) {
    getTaskTemplate(id: $id) {
      id
      name
      description
      attributes
      createdAt
      updatedAt
    }
  }
`;
export const listTaskTemplates = /* GraphQL */ `
  query ListTaskTemplates(
    $filter: ModelTaskTemplateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTaskTemplates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        attributes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      user
      assignTo
      channelID
      channel {
        id
        user
        contactID
        channelType
        contactAttributes
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
      status
      createdAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        assignTo
        channelID
        channel {
          id
          user
          contactID
          channelType
          contactAttributes
          createdAt
          updatedAt
        }
        contactID
        channelType
        Name
        taskAttributes
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
