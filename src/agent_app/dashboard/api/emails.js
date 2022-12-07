import { API, DataStore, Auth } from 'aws-amplify'
import { listEmailMessages } from '../../../graphql/queries'
import { TaskTemplate } from '../../../models'

export const getAllEmails = async () => {
    try {
        let result = await API.graphql({
            query: listEmailMessages,           
        })
        //let taskTemplates = await DataStore.query(TaskTemplate)
        console.log({ result });
        return result?.data?.listEmailMessages?.items || []
    } catch (error) {
        console.error({ getAllEmails: error })
        throw error
    }

}

