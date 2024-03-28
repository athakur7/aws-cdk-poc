import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Duration } from 'aws-cdk-lib';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda role 
    const retailFeedLambdaRole = new iam.Role(this, 'retailFeedLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      roleName: 'retailFeedLambdaRole',
      description: 'Lambda role for retail feed',
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'), 
                        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
                        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess')]
    });
    // lambda function
    const retailFeedLambda = new lambda.Function(this, 'retailFeedLambda', {
      handler: 'lambda_function.lambda.handler',
      role: retailFeedLambdaRole,
      functionName: 'retailFeedLambda',
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset('../services/'),
      description: 'Lambda function for retail feed',
      // time out for lambda function
      timeout: Duration.minutes(1),
    });
    retailFeedLambda.node.addDependency(retailFeedLambdaRole);

     //s3 bucket
    const retails3bucket = new s3.Bucket(this,'retailbucketlogicalid',{
      bucketName:'at-retailfeeds3bucket001',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // empty the bucket for deletion
      autoDeleteObjects: true,
    })

     // upload files under assests 
    //  const s3UploadObj = new s3deployment.BucketDeployment(this,'deploy-bucket-asset',{
    //   sources: [s3deployment.Source.asset('../assets')],
    //   destinationBucket: retails3bucket,
    // })

    // s3 event notification
    retails3bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(retailFeedLambda));

  // dynamodb
  const retaildynamodb = new dynamodb.Table(this,'dynamodblogicalid', {
    tableName:'retaildynamodbtable',
    partitionKey: {name:'customername',type:dynamodb.AttributeType.STRING},
    deletionProtection: false,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
  })

  }
}
