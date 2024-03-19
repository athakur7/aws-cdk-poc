import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineAppStage } from './demoawspipeline-app-stack';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
export class CodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  
   // The code that defines your stack goes here
    // AWS CI-CD Pipeline
    const democicdpipeline = new CodePipeline(this,'demopipeline',
{
      synth: new ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: CodePipelineSource.connection('athakur7/aws-cdk-poc/codepipeline', 'main',{
        connectionArn: 'arn:aws:codestar-connections:us-east-2:509935023135:connection/84e6ff6e-73b5-4958-8c80-46263ec0f981',
        }),
        
        commands: [
          // 'cd codepipeline',
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    const testingStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '509935023135', region: 'us-east-2' }
    }));

    testingStage.addPost(new ManualApprovalStep('approval'));

    const prodStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '509935023135', region: 'us-east-2' }
    }));


  }
}
