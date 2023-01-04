import { API } from "aws-amplify"
import * as queries from '../../graphql/queries'
import * as mutations from '../../graphql/mutations'

export const createNewChannelAPI = (contactData, user) => {
    /* {id,assignTo,contactID,channelType,contactAttributes} */
    let agent = username.current.value
    const newChannel = {
        assignTo: agent,
        contactID: contactData.contactId,
        channelType: contactData.type,
        contactAttributes: JSON.stringify({ ...contactData })
    }
    console.log({ newChannel, agent })

    API.graphql({ query: mutations.createChannel, variables: { input: newChannel } }).then((result) => {
        let currentChannelRawData = result.data.createChannel
        let currentChannel = {
            ...currentChannelRawData
        }
        setState({ ...state, channel: { ...currentChannel } })
    }).catch((error) => {
        console.error({ mutationscreateChannel: error })
    })
}

export const getAllTasksAPI = () => {
    return new Promise((resolve, reject) => {
        API.graphql({ query: queries.listTasks }).then((result) => {
            resolve(result.data.listTasks.items)
        }).catch((error) => {
            console.error({ listTasks: error })
        })
    })


}

export const saveTaskAPI = (taskData) => {
    return new Promise((resolve, reject) => {
        API.graphql({ query: mutations.createTask, variables: { input: taskData } }).then((result) => {
            console.log({ id: taskData.channelID, result });
            resolve({ id: taskData.channelID, result })
        }).catch((error) => {
            console.error({ mutationscreateChannel: error })
        })
    })
}