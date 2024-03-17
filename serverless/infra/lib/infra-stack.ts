import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // s3 bucket
    const s3bucket = new s3.Bucket(this,'s3-bucket',{
      bucketName: 'at-test-bucket-8438438',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // empty the bucket for deletion
      autoDeleteObjects: true,
    })

    // upload files under assests 
    const s3UploadObj = new s3deployment.BucketDeployment(this,'deploy-bucket-asset',{
      sources: [s3deployment.Source.asset('../assests')],
      destinationBucket: s3bucket,
    })

    // IAM role
    const balanceStatusRole = new iam.Role(this,'balanceRole',{
      roleName: 'balanceLambdaRole',
      description: 'role for lambda accessing s3 bucket',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    })
    balanceStatusRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));

    // Lambda function
    const bankinglambdaFunc = new lambda.Function(this,'bankingBalanceLambdaFunc',{
      handler: 'lambda_function.lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_9,
      code: lambda.Code.fromAsset('../services/'),
      role: balanceStatusRole,
    })

    // API gateway
    const bankingRestApi = new apigateway.LambdaRestApi(this,'bankingRestAPI',{
      handler: bankinglambdaFunc,
      restApiName: "banking-rest-api",
      deploy: true,
      proxy: false,
    })
    const bankstatus = bankingRestApi.root.addResource('bankstatus');
    bankstatus.addMethod('GET');  // GET /items
  }
}
