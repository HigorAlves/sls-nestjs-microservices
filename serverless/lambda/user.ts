import * as path from 'path'

import { Duration } from 'aws-cdk-lib'
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

import { addOutput } from '../helpers/output'

export class UserApiHandler {
	public readonly id = `UserApiHandlerLambdaFunction`
	public readonly description = 'This is the UserApiHandler lambda function'
	// eslint-disable-next-line @typescript-eslint/ban-types
	public instance: Function

	constructor(scope: Construct, props: any) {
		const environmentName = 'dev'
		const region = props.region

		this.instance = new NodejsFunction(scope, this.id, {
			runtime: Runtime.NODEJS_14_X,
			entry: path.resolve('../dist/apps/user/main.js'),
			functionName: `tumble-${environmentName}-userApiHandler`,
			depsLockFilePath: '../yarn.lock',
			handler: 'handler',
			memorySize: 128,
			environment: {
				REGION: region,
				TMB_ENV: environmentName,
				STAGE: environmentName
			},
			timeout: Duration.seconds(30),
			role: props.role,
			bundling: {
				minify: true, // minify code, defaults to false
				sourceMap: true, // include source map, defaults to false
				forceDockerBundling: false
			}
		})

		addOutput(
			scope,
			`${this.id}Lambda`,
			this.instance.functionArn,
			this.description,
			this.id
		)
	}
}
