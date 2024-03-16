import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Alias } from 'aws-cdk-lib/aws-kms';


export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const demolambda = new lambda.Function(this,'demologicalid',{
      handler:'lambda_function.lambda_handler',
      runtime:lambda.Runtime.PYTHON_3_9,
      code:lambda.Code.fromAsset('../services/'),
      functionName:'demo-cdk-lambda'
    })
    //cloudwatch logs
    const cloudwatchdemo = new cloudwatch.Alarm(this,'cloudwatch-demo',{
      alarmName: 'demo-lambda-alarm',
      evaluationPeriods: 1,
      threshold: 1,
      metric: demolambda.metricErrors(),
    })

  }
}
