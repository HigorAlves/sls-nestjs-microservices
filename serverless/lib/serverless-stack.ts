import * as path from 'path'

import { Stack, StackProps } from 'aws-cdk-lib'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

export class ServerlessStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		const lambdaLayer = new lambda.LayerVersion(this, 'HandlerLayer', {
			code: lambda.Code.fromAsset(
				path.resolve(__dirname, '../../node_modules')
			),
			compatibleRuntimes: [
				lambda.Runtime.NODEJS_14_X,
				lambda.Runtime.NODEJS_16_X
			],
			description: 'Api Handler Dependencies'
		})

		const hello = new lambda.Function(this, 'HelloHandler', {
			runtime: lambda.Runtime.NODEJS_16_X,
			code: lambda.Code.fromAsset('lambda'),
			handler: 'hello.handler'
		})

		new apigw.LambdaRestApi(this, 'TestFunction', {
			handler: hello
		})
	}
}
