/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChannel = /* GraphQL */ `
  mutation CreateChannel(
    $input: CreateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    createChannel(input: $input, condition: $condition) {
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
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel(
    $input: UpdateChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    updateChannel(input: $input, condition: $condition) {
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
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel(
    $input: DeleteChannelInput!
    $condition: ModelChannelConditionInput
  ) {
    deleteChannel(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
