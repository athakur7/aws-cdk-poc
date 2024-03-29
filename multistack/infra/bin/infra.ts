#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IAMRoleStack } from '../lib/iamrole-stack';
import { S3Stack } from '../lib/s3-stack';

const app = new cdk.App();
new S3Stack(app, 's3stack', {

});

new IAMRoleStack(app, 'IAMRolestack', {

});