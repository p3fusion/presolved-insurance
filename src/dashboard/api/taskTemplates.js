import { API, DataStore } from 'aws-amplify'
import { listTaskTemplates } from '../../graphql/queries'
import {TaskTemplate} from '../../models/'

export const getTaskTemplates = async () => {
    try {
       let taskTemplates = await API.graphql({ query: listTaskTemplates })
        //let taskTemplates = await DataStore.query(TaskTemplate)
        console.log({taskTemplates});
        return taskTemplates.data

    } catch (error) {
        console.error({ error })
        throw error
    }

}