#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'

import { ServerlessStack } from '../lib/serverless-stack'

const app = new cdk.App()
new ServerlessStack(app, 'ServerlessStack')
