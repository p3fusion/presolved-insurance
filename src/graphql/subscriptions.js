/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChannel = /* GraphQL */ `
  subscription OnCreateChannel($filter: ModelSubscriptionChannelFilterInput) {
    onCreateChannel(filter: $filter) {
      id
      contactID
      contactAttributes
      tasks {
        items {
          id
          channelID
          contactID
          Name
          taskAttributes
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
  subscription OnUpdateChannel($filter: ModelSubscriptionChannelFilterInput) {
    onUpdateChannel(filter: $filter) {
      id
      contactID
      contactAttributes
      tasks {
        items {
          id
          channelID
          contactID
          Name
          taskAttributes
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
  subscription OnDeleteChannel($filter: ModelSubscriptionChannelFilterInput) {
    onDeleteChannel(filter: $filter) {
      id
      contactID
      contactAttributes
      tasks {
        items {
          id
          channelID
          contactID
          Name
          taskAttributes
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
      id
      channelID
      channel {
        id
        contactID
        contactAttributes
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      contactID
      Name
      taskAttributes
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
      id
      channelID
      channel {
        id
        contactID
        contactAttributes
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      contactID
      Name
      taskAttributes
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
      id
      channelID
      channel {
        id
        contactID
        contactAttributes
        tasks {
          nextToken
        }
        createdAt
        updatedAt
      }
      contactID
      Name
      taskAttributes
      createdAt
      updatedAt
    }
  }
`;