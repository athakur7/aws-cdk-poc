import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class NetworkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // VPC and Subnets
     const demoVPC = new ec2.Vpc(this, 'demoVPC', {
       vpcName:'demoVPC1',
       ipAddresses:ec2.IpAddresses.cidr('10.0.0.0/16'),
       natGateways:0,
     });
  }
}
