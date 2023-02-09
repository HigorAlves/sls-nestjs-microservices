exports.handler = async function (event) {
	console.log('request:', JSON.stringify(event, undefined, 2))
	console.log(event)
	return {
		statusCode: 200,
		headers: { 'Content-Type': 'text/plain' },
		body: event
	}
}
