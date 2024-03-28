import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { readFileSync } from 'fs';

export class WebserverStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //Retrieve value from SSM
     const vpcId = ssm.StringParameter.valueFromLookup(this,'/vpc/demoVPCID')

     //Security Group
    const demoVpc = ec2.Vpc.fromLookup(this, 'newVPC', { vpcId:vpcId });
    const demoSG = new ec2.SecurityGroup(this,'demoSG',{
      vpc:demoVpc,
      securityGroupName:'allow http traffic',
      allowAllOutbound:true,
    });
    demoSG.addIngressRule(ec2.Peer.anyIpv4(),ec2.Port.tcp(80),'allow http traffic')
     //EC2 Instance
     const demoEC2 = new ec2.Instance(this,'demoEC2',{
      vpc:demoVpc,
      vpcSubnets:{subnetType:ec2.SubnetType.PUBLIC},
      securityGroup:demoSG,
      instanceType:ec2.InstanceType.of(ec2.InstanceClass.T2,ec2.InstanceSize.MICRO),
      machineImage:ec2.MachineImage.latestAmazonLinux({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,}),
      keyName:'demo_key',})
      //UserData
      const userData = readFileSync('./lib/userdata.sh', 'utf8');
         demoEC2.addUserData(userData);
  }
}