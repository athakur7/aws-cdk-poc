import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    
    //dyanmodb table
    const dynamodbdemo  = new dynamodb.Table(this,'dyanmodb-at',{
      tableName: 'customerTable',
      readCapacity: 3,
      writeCapacity: 3,
      partitionKey: {name:'customerid', type:dynamodb.AttributeType.NUMBER}
    })
  }
}
