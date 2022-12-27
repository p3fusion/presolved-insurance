
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

export const saveTaskAPI = (taskData) => {
    /* {id,assignTo,channelID,contactID,channelType,Name,taskAttributes,status} */
    let agent = username.current.value
    const newtask = {
        assignTo:agent,
        contactID: state.channel.contactID,
        channelID: state.channel.id,
        channelType: state.channel.channelType,
        Name: taskData.name,
        status: 'pending',
        taskAttributes: JSON.stringify(taskData.attributes)
    }
    console.log({ newtask })

    API.graphql({ query: mutations.createTask, variables: { input: newtask } }).then((result) => {
        console.log({ id: newtask.channelID, result });
    }).catch((error) => {
        console.error({ mutationscreateChannel: error })
    })

}

export const addTaskAPI = (id) => {
    let { tasks } = state
    let findtask = find(config.templates.data, { id })
    let isAdded = filter(state.tasks, { id })
    if (isAdded.length > 0) {
        notification.warning({
            message: "You have already added the task " + findtask.name
        })
    } else {

        let parseFields = JSON.parse(findtask.attributes)
        let newformat = parseFields.map((itm) => {
            return {
                ...itm,
                name: itm.name.replaceAll(" ", "_")
            }
        })
        let rawtaskItem = {
            ...findtask,
            attributes: newformat
        }
        //let taskItem = formatTemplateAttributes(rawtaskItem)
        tasks.push(rawtaskItem)
        setState({ ...state, tasks })
    }


}