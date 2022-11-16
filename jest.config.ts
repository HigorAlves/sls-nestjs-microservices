import type { Config } from 'jest'

const config: Config = {
	verbose: true,
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: './coverage',
	testEnvironment: 'node',
	roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
	moduleNameMapper: {
		'^@app/dynamo(|/.*)$': '<rootDir>/libs/dynamo/src/$1'
	}
}

export default config
