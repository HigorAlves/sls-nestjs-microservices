import { Module } from '@nestjs/common'

import { DynamoService } from './dynamo.service'

@Module({
	providers: [DynamoService],
	exports: [DynamoService]
})
export class DynamoModule {}
