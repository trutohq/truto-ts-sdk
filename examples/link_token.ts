import TrutoApi from '../src'

// Initialize the Truto API client
const truto = new TrutoApi({
  token: process.env.TRUTO_API_TOKEN as string,
  baseUrl: process.env.TRUTO_API_BASE_URL as string,
})

async function createLinkToken() {
  try {
    // Create a link token for a new integration
    const response = await truto.linkToken.createForNewIntegration({
      tenant_id: 'test', // Replace with your actual tenant ID
    })

    console.log('Link token created successfully:')
    console.log(response)

    // The response will contain a link_token that you can use to initiate the account linking process
    // You can use this token in your frontend application to start the OAuth flow
  } catch (error) {
    console.error('Error creating link token:', error)
  }
}

// Run the example
createLinkToken()
