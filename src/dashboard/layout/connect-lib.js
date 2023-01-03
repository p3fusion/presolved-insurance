import { notification } from "antd";
import { API } from "aws-amplify";
import { addNewChannel } from "../store/reducers/channels";
import * as mutations from '../../graphql/mutations'
import '../../gc-components/amazon-connect-customer-profiles'


const masterTopics = {
    "LOGIN_POPUP": "connect::loginPopup",
    "SEND_LOGS": "connect::sendLogs",
    "SOFTPHONE": "connect::softphone",
    "RINGTONE": "connect::ringtone",
    "METRICS": "connect::metrics"
}
const loginOptions = {
    autoClose: true,
    height: 600,
    width: 400,
    top: 80,
    right: 100
}
const connectUrl = "https://p3fusion-qa.my.connect.aws/ccp-v2";
const loginUrl = "https://d-9067b5964e.awsapps.com/start/#/saml/default/Amazon%20Connect%20Agent%20App/ins-f150c516c8f568f6";

class connectWrapper {

    constructor({ connect, dispatch, addNewChannel, setState, updateUser, updateSettings, state, divCCP, navigate }) {
        this.connect = connect;
        this.dispatch = dispatch;
        this.setState = setState;
        this.updateUser = updateUser;
        this.updateSettings = updateSettings;
        this.addNewChannel = addNewChannel;
        this.state = state;
        this.divCCP = divCCP;
        this.navigate = navigate;
        this.cbConnect = null
    }
    initiateCCP() {
        const { connect, dispatch, setState, updateUser, state, divCCP } = this
        if (divCCP.current) {

            connect.agentApp.initCCP(divCCP.current, {
                ccpUrl: connectUrl, // REQUIRED
                region: "us-east-1", // REQUIRED for `CHAT`, optional otherwise
                softphone: {
                    // optional, defaults below apply if not provided
                    allowFramedSoftphone: true, // optional, defaults to false
                    disableRingtone: false, // optional, defaults to false
                    ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
                },
                pageOptions: {
                    //optional
                    enableAudioDeviceSettings: false, //optional, defaults to 'false'
                    enablePhoneTypeSettings: true //optional, defaults to 'true'
                },
                ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
                ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
                ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
            });
            this.getLoginStatus({ connect, dispatch, setState, updateUser, state, divCCP: divCCP.current })
            this.listenIncomingActivities()
        }
    }
    getLoginStatus() {
        const { connect, dispatch, setState, updateUser, state, divCCP } = this
        let i = 0;
        const interval = setInterval(() => {
            console.log(i + ") polling . . .",);
            if (connect.agent.initialized) {
                console.log("Login success stoppping the poll . . .");
                this.getAgentInfoFromConnect({ setState, dispatch, updateUser, connect, state, divCCP });
                clearInterval(interval)
            }
            if (i > 10) {
                connect.agentApp.stopApp(divCCP)
                this.showConnectLoginPopup(connect)
                clearInterval(interval)
            }
            i++;
        }, 1000);
    }
    getAgentInfoFromConnect() {
        const { connect, dispatch, setState, updateUser, updateSettings, state, navigate } = this
        console.log("::Gettting loged in Agent information::");
        connect.agent((agent) => {
            let agentData = agent._getData()
            let currentState = agent.getStatus()
            setState({ ...state, connect: connect, currentState: currentState.name });
            dispatch(updateUser(agentData.configuration))
            dispatch(updateSettings(agentData.configuration))
            console.log("::completed loading the Agent information::");
            //navigate("/interactions", { state: agentData })
        });
    }
    showConnectLoginPopup() {
        const { connect, divCCP } = this
        connect.core.getPopupManager().clear(masterTopics.LOGIN_POPUP);
        connect.core.getPopupManager().open(connectUrl, masterTopics.LOGIN_POPUP, loginOptions)
    }
    setAgentState({ agentState }) {
        const { connect, setState, state } = this
        connect.agent((agent) => {
            agent.setState(agentState)
            notification.success({
                message: `changed status to ${agentState.name} `
            })
            let currentState = agent.getStatus()
            setState({ ...state, currentState: currentState.name });
        })
    }
    listenIncomingActivities() {
        const { connect, navigate, updateSettings, dispatch } = this
        var that = this

        connect.contact(function (contact) {

            contact.onConnecting(function (contact) {
                console.log("onConnecting::", contact);
                var contactData = contact._getData()
                console.log({
                    onConnecting:contactData
                });
                let settings = {
                    eventName: "onConnecting",
                    activeTask: contactData,
                    isConnected: false
                }
                dispatch(updateSettings(settings))
            })

            contact.onIncoming(function (contact) {
                console.log("onIncoming::", contact);
                var contactData = contact._getData()
                console.log({
                    onIncoming:contactData
                });
                let settings = {
                    eventName: "onIncoming",
                    activeTask: contactData,
                    isConnected: false
                }
                dispatch(updateSettings(settings))
            });

            contact.onRefresh(function (contact) {});

            contact.onAccepted(function (contact) {
                console.log("onAccepted::", contact);
                var contactData = contact._getData()
                console.log({
                    onAccepted:contactData
                });
                let settings = {
                    eventName: "onAccepted",
                    activeTask: contactData,
                    isConnected: true
                }

                var contactAttributes = { ...contactData }
                delete contactAttributes.connections
                delete contactAttributes.contactFeatures
                delete contactAttributes.queue
                //setState({ ...state, showWrapButton: true })
                that.createChannel(contactAttributes).then((channel) => {
                    settings = {
                        ...settings,
                        channel: channel
                    }
                    dispatch(updateSettings(settings))
                    dispatch(addNewChannel({ ...contactData }))
                    navigate("/interactions", { state: contactData })
                }).catch((err)=>{
                    console.error({channelError:err})
                })


            });

            contact.onEnded(function () {
                console.log("onEnded::", contact);
                var contactData = contact._getData()
                console.log({
                    onEnded:contactData
                });
                let settings = {
                    eventName: "onEnded",
                    activeTask: null,
                    isConnected: false
                }
                dispatch(updateSettings(settings))
            });

            contact.onConnected(function () {
                console.log("onConnected::", contact);
                var contactData = contact._getData()
                console.log({
                    onConnected:contactData
                });
                let settings = {
                    eventName: "onConnected",
                    activeTask: contactData,
                    isConnected: true
                }
                dispatch(updateSettings(settings))

            });
        });

    }
    createChannel(contactData) {
        return new Promise((resolve, reject) => {
            resolve({
                "id": "15d986c8-a649-4f76-9a37-82ece28dd201",
                "assignTo": "",
                "contactID": "e2fd4945-1074-482f-b979-7f3dfee5db4d",
                "channelType": "chat",
                "contactAttributes": "{\"initialContactId\":null,\"contactId\":\"e2fd4945-1074-482f-b979-7f3dfee5db4d\",\"initiationMethod\":null,\"name\":null,\"description\":null,\"attributes\":{\"Distribute by percentage\":{\"name\":\"Distribute by percentage\",\"value\":\"17%\"}},\"state\":{\"type\":\"connecting\",\"timestamp\":\"2022-12-29T15:01:53.043Z\"},\"contactDuration\":\"0\",\"type\":\"chat\",\"queueTimestamp\":null,\"status\":{\"type\":\"connecting\",\"timestamp\":\"2022-12-29T15:01:53.043Z\"}}",
                "tasks": {
                    "items": [],
                    "nextToken": null
                },
                "createdAt": "2022-12-29T15:02:06.050Z",
                "updatedAt": "2022-12-29T15:02:06.050Z"
            })
           /*  let agent = ""
            const newChannel = {
                assignTo: agent,
                contactID: contactData.contactId,
                channelType: contactData.type,
                contactAttributes: JSON.stringify({ ...contactData })
            }
            

            API.graphql({ query: mutations.createChannel, variables: { input: newChannel } }).then((result) => {
                let currentChannelRawData = result.data.createChannel
                let currentChannel = {
                    ...currentChannelRawData
                }
                console.log({currentChannel});
                resolve({ ...currentChannel })
            }).catch((error) => {
                console.error({ mutationscreateChannel: error })
                reject({ mutationscreateChannel: error })
            }) */
        })

    }

    fetchProfiles(){
        const {connect} =this
        const profile = new connect.CustomerProfilesClient('https://p3fusion-qa.my.connect.aws/')
        profile.listAccountIntegrations({
            "DomainName": "amazon-connect-p3fusion-qa",
            "KeyName": "_profileId",
            "Values": [
                "96493fff2dd9421ab9ab728ff422f166"
            ],
            "MaxResults": 10,
            "NextToken": null
        }, (error,result) => {
            console.log({CustomerProfilesClient:{error}});
            console.log({ CustomerProfilesClient: result });
            return {result,error}
        })
    }


}

export default connectWrapper;
