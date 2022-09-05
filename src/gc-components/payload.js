export const createProfile=()=>{
    return {"FirstName":"Khizar ","LastName":"Ahmed","Gender":"MALE","PartyType":"INDIVIDUAL","BirthDate":"1986-09-07","AccountNumber":"9715463636","EmailAddress":"khizaras@gmail.com","MailingAddress":{"Address1":"102","Address2":"big street","Country":"IN","PostalCode":"600005","City":"Chennai","Province":"Tamil Nadu"},"PhoneNumber":"+919715463636","DomainName":"amazon-connect-P3fusion-uat"}
}

const tasksEndpoints=[
    {
        "endpointARN": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/73174441-536b-48a7-87dd-ff45406eee52",
        "endpointId": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/73174441-536b-48a7-87dd-ff45406eee52",
        "type": "agent",
        "name": "Jim",
        "phoneNumber": null,
        "agentLogin": null,
        "queue": null
    },
    {
        "endpointARN": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/245c9d61-c8fc-4f4e-9414-ea94b22c52e9",
        "endpointId": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/transfer-destination/245c9d61-c8fc-4f4e-9414-ea94b22c52e9",
        "type": "agent",
        "name": "Supervisor",
        "phoneNumber": null,
        "agentLogin": null,
        "queue": null
    }
]
const taskTemplate=[
    {
        "Arn": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/task-template/0d82df03-9a49-43d6-a38c-707075e424e0",
        "CreatedTime": 1661515621.589,
        "Description": "Loss History",
        "Id": "0d82df03-9a49-43d6-a38c-707075e424e0",
        "LastModifiedTime": 1661515621.589,
        "Name": "Loss History",
        "Status": "ACTIVE"
    },
    {
        "Arn": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/task-template/0f6dbec0-4caa-4e25-bd61-1cef93899acb",
        "CreatedTime": 1661515495.04,
        "Description": "Address Change",
        "Id": "0f6dbec0-4caa-4e25-bd61-1cef93899acb",
        "LastModifiedTime": 1661515495.04,
        "Name": "Address Change",
        "Status": "ACTIVE"
    },
    {
        "Arn": "arn:aws:connect:us-east-1:851171462885:instance/bc83e5db-b0ea-4c92-a4df-5b7d994869fa/task-template/0db3b826-c940-4611-b8b3-dd54e104fe9c",
        "CreatedTime": 1661515344.353,
        "Description": "Add additional building to existing insurance",
        "Id": "0db3b826-c940-4611-b8b3-dd54e104fe9c",
        "LastModifiedTime": 1661515344.353,
        "Name": "Add Building",
        "Status": "ACTIVE"
    }
]