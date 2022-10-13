
               /*  const newTask = {
                    name: "string", //required, max len: 512
                    description: "string", //optional, max len: 4096
                    endpoint: tasksEndpoints[0], //required for non templated tasks, can be retrieved via `agent.getEndpoints()`. Agent and queue endpoints supported.
                    taskTemplateId: "string", //required for templated tasks, ID of the template the task is created from. Template should belong to connect instance
                    previousContactId: "string", //optional, the previous contact ID for a linked task
                    references: { //optional. Only URL references are supported for non templated tasks
                        "reference name 1": { // string, max len: 4096
                            type: "URL", //required, string, one of connect.ReferenceType types, 
                            value: "https://www.amazon.com" //required, string, max len: 4096
                        },
                        "reference name 2": { // string, max len: 4096
                            type: "EMAIL", //required, string, one of connect.ReferenceType types
                            value: "example@abc.com" //required, string, max len: 4096
                        },	
                        "reference name 3": { // string, max len: 4096
                            type: "NUMBER", //required, one of connect.ReferenceType types
                            value: 1000 //required, number
                        },
                        "reference name 4": { // string, max len: 4096
                            type: "DATE", //required, string, one of connect.ReferenceType types
                            value: 1649961230 //required, number
                        },
                        "reference name 5": { // string, max len: 4096
                            type: "STRING", //required, string, one of connect.ReferenceType types
                            value: "example@abc.com" //required, string, max len: 4096
                        }	
                    },
                   
                };//ends newTask
                console.log(newTask);
                agent.createTask(newTask, {
                    success: function (data) { 
                        console.log("Created a task with contact id: ", data.contactId) 
                    },
                    failure: function (err) { 
                        console.log("error has occured",err); 
                    }
                }); */
                
                //ends createT

                /*  const queryParams = {// required                   
                     maxResults: 50 //optional, number, max value of 100
                 };
                 
                 agent.listTaskTemplates(queryParams, {
                     success: function(data) { 
                         console.log({data});
                      },
                     failure: function(err) {console.error({err}); }
                 });
                 */
                
               /*  var queuesARNs = agent.getAllQueueARNs();
                agent.getEndpoints(queuesARNs,{
                        success: function (data) {
                            var endpoints = data.endpoints; // or data.addresses
                            console.log({data,endpoints});                           
                            const newTask = {
                                name: "Test task from taskJS", //required, max len: 512
                                description: "N/A", //optional, max len: 4096
                                endpoint: endpoints[3],
                                references: { //optional
                                    "reference name": { // string, max len: 4096
                                        type: "URL", //required, currently only "URL" is supported as a reference type,
                                        value: "https://www.amazon.com" //required, string, max len: 4096
                                    }
                                }
                            };//ends newTask
                            console.log(newTask);
                            agent.createTask(newTask, {
                                success: function (data) { 
                                    console.log("Created a task with contact id: ", data.contactId) 
                                },
                                failure: function (err) { 
                                    console.log("error has occured",err); 
                                }
                            });//ends createTask 


                        },//end success
                        failure: function (err) {
                            console.error({err})
                        }
                    }//ends QueueARN
                );// ends agent.getEndpoints  */
                
                  /*  client.createProfile({
             
                 "DomainName": "amazon-connect-P3fusion-uat",
                 "FirstName": "Khizar Ahmed"
             }).then((res) => {
                 console.log('Success response: ' + JSON.stringify(res));
             }).catch((errorResp) => {
                 console.log('Error response: ' + JSON.stringify(errorResp));
             });       */

             



            /*  if (connect.isCCP()) {
                 
                 client.listProfileObjects({
                     "MaxResults": 10
                 }).then((profiles) => {
                     console.table(profiles)
                 }).catch((ex) => {
                     console.error({ ex });
                 })
             } */

            /*  client.searchProfiles({
                 "KeyName": "name",
                 "Values": ["sai"]
             }).then((res) => {
                 console.log({ res });
             }).catch((ex) => {
                 console.error({ ex });
             })
  */

             /* 
             
              if (connect.agent.initialized) {
            connect.agent(function (agent) {

                const templateParams = {// required
                    id: '0db3b826-c940-4611-b8b3-dd54e104fe9c', //required, string, template ID, template should belong to connect instance                  
                };

                agent.getTaskTemplate(templateParams, {
                    success: function (data) {
                        console.log("Template data loaded successfully")
                        console.log({ templateParams, data })
                    },
                    failure: function (err) { console.error({ err }) }
                });

            })

          
        }
             
             */