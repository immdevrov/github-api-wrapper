const baseUrl = 'https://jobs.github.com/positions.json'
const params = {
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  }
}

async function handleRequest(request) {
  const searchString = new URL(request.url).search
  const response = await fetch(baseUrl + searchString, params)
  const result = await gatherResponse(response)
  return new Response(result, params)
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})

async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json())
  } else {
    return await response.text()
  }
}
