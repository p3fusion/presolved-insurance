import { API, DataStore } from 'aws-amplify'
import { listTaskTemplates, listChannels } from '../../graphql/queries'
import {TaskTemplate} from '../../models/'

export const getTaskTemplates = async () => {
    try {
       let result = await API.graphql({ query: listTaskTemplates })
        //let taskTemplates = await DataStore.query(TaskTemplate)
        console.log({result});
        return result.data

    } catch (error) {
        console.error({ error })
        throw error
    }

} 

export const getAllChannels = async () => {
    try {
       let result = await API.graphql({ query: listChannels })
        //let taskTemplates = await DataStore.query(TaskTemplate)
        console.log({result});
        return result.data

    } catch (error) {
        console.error({ error })
        throw error
    }

}