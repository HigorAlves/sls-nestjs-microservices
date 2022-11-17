import * as path from 'path'

import { Stack, StackProps } from 'aws-cdk-lib'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

export class ServerlessStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		const lambdaLayer = new lambda.LayerVersion(this, 'HandlerLayer', {
			description: 'Api Handler Dependencies',
			code: lambda.Code.fromAsset(
				path.resolve(__dirname, '../../node_modules')
			),
			compatibleRuntimes: [
				lambda.Runtime.NODEJS_14_X,
				lambda.Runtime.NODEJS_16_X
			]
		})

		const hello = new lambda.Function(this, 'HelloHandler', {
			runtime: lambda.Runtime.NODEJS_16_X,
			code: lambda.Code.fromAsset('lambda'),
			handler: 'hello.handler'
		})

		new apigw.LambdaRestApi(this, 'TestFunction', {
			handler: hello
		})

		const handlerNodeJS = new NodejsFunction(this, 'Handler', {
			runtime: lambda.Runtime.NODEJS_14_X,
			entry: path.resolve(__dirname, '../../dist/apps/user/main.js'),
			depsLockFilePath: '../yarn.lock',
			handler: 'handler',
			layers: [lambdaLayer]
		})

		const api = new apigw.RestApi(this, 'Serverless-API', {
			restApiName: `serverless-api`,
			description: 'api gateway',
			deployOptions: {
				stageName: 'default'
			}
		})
		const handler = new lambda.Function(this, 'Handler', {
			code: lambda.Code.fromAsset(
				path.resolve(__dirname, '../../dist/apps/user')
			),
			handler: 'main.handler',
			runtime: lambda.Runtime.NODEJS_16_X,
			layers: [lambdaLayer]
		})

		api.root
			.addResource('user')
			.addMethod('ANY', new apigw.LambdaIntegration(handler))
	}
}
