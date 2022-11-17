import * as path from 'path'

import { Stack, StackProps } from 'aws-cdk-lib'
import * as gateway from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

export class ServerlessStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		const test = new lambda.Function(this, 'Test', {
			runtime: lambda.Runtime.NODEJS_16_X,
			code: lambda.Code.fromAsset('lambda'),
			handler: 'hello.handler'
		})

		new gateway.LambdaRestApi(this, 'TestFunction', {
			handler: test
		})
	}
}
