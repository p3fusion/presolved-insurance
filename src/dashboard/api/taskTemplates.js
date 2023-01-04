import { API, DataStore, Auth } from 'aws-amplify'
import { listTaskTemplates, listChannels } from '../../graphql/queries'


export const getTaskTemplates  = async () => {
    try {
        let result = await API.graphql({
            query: listTaskTemplates,
            authMode: 'API_KEY',
            authToken: "da2-fe33kite7zho7nlro4cliwvxxe"
        })  
        //let taskTemplates = await DataStore.query(TaskTemplate)
        return result.data
    } catch (error) {
        console.error({ getTaskTemplates: error })
        throw error
    }

}


export const getAllUsersFromConnect = async () => {
    try {
        const apiName = 'ConnectAPI';
        const path = '/users';
        const myInit = {
            headers: {},
            response: true,
            queryStringParameters: {
                name: 'param',
            }
        }
        let result = await API.get(apiName, path, myInit)
        return result.data

    } catch (error) {
        console.error({ error })
        throw error
    }

}

export const getAllChannels = async () => {
    try {   
        const query = `
        query ListChannels(
            $filter: ModelChannelFilterInput
            $limit: Int
            $nextToken: String
          ) {
            listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
              items {
                id
                assignTo
                contactID
                channelType
                contactAttributes
                tasks {
                    items {
                        id
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
                }
                createdAt
                updatedAt
              }
              nextToken
            }
          }
        `    
        let result = await API.graphql({
            query:listChannels,
            authMode: 'API_KEY',
            authToken: "da2-fe33kite7zho7nlro4cliwvxxe"
        })
        //let taskTemplates = await DataStore.query(TaskTemplate)
        return result.data.listChannels.items

    } catch (error) {
        console.error({ getAllChannels: error })
        throw error
    }

}