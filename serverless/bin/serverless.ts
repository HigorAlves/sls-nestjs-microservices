#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'

import { ServerlessStack } from '../lib/serverless-stack'
import 'source-map-support/register'

const app = new cdk.App()
new ServerlessStack(app, 'ServerlesStack')
