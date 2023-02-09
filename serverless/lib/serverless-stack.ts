import { Stack, StackProps } from 'aws-cdk-lib'
import * as gateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

import { UserApiHandler } from '../lambda/user'

export class ServerlessStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		const api = new gateway.RestApi(this, 'slsApiGateway', {
			description: 'API Gateway for Serverless',
			restApiName: `sls-api-gateway`,
			deployOptions: {
				stageName: 'default',
				tracingEnabled: true
			}
		})

		const userAPI = new UserApiHandler(this, {})

		const user = api.root.addResource('user')
		user.addProxy({
			defaultIntegration: new gateway.LambdaIntegration(userAPI.instance)
		})
	}
}
