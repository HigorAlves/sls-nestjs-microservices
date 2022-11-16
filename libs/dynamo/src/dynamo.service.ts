import {
	BatchExecuteStatementCommand,
	DynamoDBClient
} from '@aws-sdk/client-dynamodb'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DynamoService {
	private readonly client: DynamoDBClient

	constructor() {
		this.client = new DynamoDBClient({ region: 'us-east-1' })
	}

	public async getTableNames(): Promise<any> {
		const command = new BatchExecuteStatementCommand({ Statements: [] })
		return await this.client.send(command)
	}
}
