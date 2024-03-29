import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class SecurityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // IAM Role
    const iamdemorole = new iam.Role(this,'iamdemologicalid',{
      roleName: 'demoiamEC2role',
      description: 'demo role for EC2',
      assumedBy:new iam.ServicePrincipal('ec2.amazonaws.com'),
    })
    iamdemorole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
  
    //cfnoutput
    const demoIAMrole = new cdk.CfnOutput(this,'demoIAM',{
      value:iamdemorole.roleArn,
      description:"iam role for ec2",
      exportName:'demoIAMRoleforEC2'
    })
  }
}
