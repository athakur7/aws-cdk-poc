import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class SsmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // SSM Parameters resource
     const demoSSM = new ssm.StringParameter(this, 'SSMParameters', {
       parameterName:'/vpc/demoVPCID',
    // Important Tip-Dont forget to substitute the value of VPCID from Network Stack   
       stringValue:'vpc-0dc1b7b169d305d99' 
     });
  }
}
