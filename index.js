
const baseUrl = 'https://jobs.github.com/positions.json?page=1&search=javascript'
const params = {
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
}

async function handleRequest() {
  const response = await fetch(baseUrl, params)
  const result = await gatherResponse(response)
  return new Response(result, params)
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest())
})

async function gatherResponse (response) {
  const { headers } = response
  const contentType = headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json())
  } else {
    return await response.text()
  }
}
