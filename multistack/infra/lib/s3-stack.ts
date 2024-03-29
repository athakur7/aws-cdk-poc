import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //S3 bucket
    const balancestatuss3 = new s3.Bucket(this,"s3bucketlogicalid",{
      bucketName: 'at-test-bucket-01fefdfdfd',
      versioned: false,
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

  }
}