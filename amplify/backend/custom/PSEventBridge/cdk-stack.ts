import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import * as events from '@aws-cdk/aws-events'
import * as targets  from '@aws-cdk/aws-events-targets';
import * as lambda from '@aws-cdk/aws-lambda';
//import * as iam from '@aws-cdk/aws-iam';
//import * as sns from '@aws-cdk/aws-sns';
//import * as subs from '@aws-cdk/aws-sns-subscriptions';
//import * as sqs from '@aws-cdk/aws-sqs';
import { Rule, Schedule } from '@aws-cdk/aws-events';
import { Duration } from '@aws-cdk/core';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });


    // Access other Amplify Resources 
    
    const retVal:AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this, 
      amplifyResourceProps.category, 
      amplifyResourceProps.resourceName, 
      [
        {category: 'function', resourceName: 'GetMails'},
        {category: 'function', resourceName: 'DownloadEmail'},
      ]
    );

    const GetMailsFunctionArn =  cdk.Fn.ref(retVal.function.GetMails.Arn);

    console.log('GetMailsFunctionArn: ' + GetMailsFunctionArn);

    // 👇 import existing Lambda by ARN
    const importedLambdaFromArn = lambda.Function.fromFunctionArn (
      this,
      'GetMails',
      GetMailsFunctionArn
    );    

    console.log('importedLambdaFromArn: ' + importedLambdaFromArn);
    //Lambda Target
    const lambdaTarget = new targets.LambdaFunction(importedLambdaFromArn, {
      retryAttempts:3,
      maxEventAge: Duration.hours(2),
    });

    const DownloadEmailArn = cdk.Fn.ref(retVal.function.DownloadEmail.Arn);

    const importedDownloadEmailFromArn = lambda.Function.fromFunctionArn (
      this,
      'DownloadEmail',
      DownloadEmailArn
    );

    const lambdaTargetDownloadEmail = new targets.LambdaFunction(importedDownloadEmailFromArn, {
      retryAttempts:3,
      maxEventAge: Duration.hours(2),
    });
    

    //Create a evebtbridge rule
    const rule1 = new Rule(this, 'ScheduleMailFetch', {
      schedule: events.Schedule.cron({ minute: '0', hour: '1' }),
      targets: [lambdaTarget],
    });

    const rule2 = new Rule(this, 'DownloadMail', {     
      targets: [lambdaTargetDownloadEmail],
      eventPattern: {
        source: ['aws.lambda'],
        detailType: ['DownloadEmail'],
      }
    });

    const rule3 = new Rule(this, 'DownloadAttachments', {     
      targets: [lambdaTarget],
      eventPattern: {
        source: ['aws.lambda'],
      }
    });    


    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
    
    // Example 1: Set up an SQS queue with an SNS topic 

    /*
    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const sqsQueueResourceNamePrefix = `sqs-queue-${amplifyProjectInfo.projectName}`;
    const queue = new sqs.Queue(this, 'sqs-queue', {
      queueName: `${sqsQueueResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇create sns topic
    
    const snsTopicResourceNamePrefix = `sns-topic-${amplifyProjectInfo.projectName}`;
    const topic = new sns.Topic(this, 'sns-topic', {
      topicName: `${snsTopicResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: topic.topicArn,
      description: 'The arn of the SNS topic',
    });
    */

    // Example 2: Adding IAM role to the custom stack 
    /*
    const roleResourceNamePrefix = `CustomRole-${amplifyProjectInfo.projectName}`;
    
    const role = new iam.Role(this, 'CustomRole', {
      assumedBy: new iam.AccountRootPrincipal(),
      roleName: `${roleResourceNamePrefix}-${cdk.Fn.ref('env')}`
    }); 
    */

    // Example 3: Adding policy to the IAM role
    /*
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['*'],
        resources: [topic.topicArn],
      }),
    );
    */


  }
}