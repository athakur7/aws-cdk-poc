import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // s3 bucket
    const s3demobucket = new s3.Bucket(this,'at-test-bucket',{
      bucketName: 'at-test-bucket-01fefdfdfd',
      versioned: false,
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // empty the bucket for deletion
      autoDeleteObjects: true,
    })
  }
}
