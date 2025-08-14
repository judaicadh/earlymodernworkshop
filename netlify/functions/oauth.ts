import type { Handler } from '@netlify/functions'
import { createNetlifyAuth } from 'netlify-cms-oauth-provider-node'

// Map CMS endpoints to the provider (GitHub)
const provider = createNetlifyAuth({
    provider: 'github',
    // Optional: restrict to your org with allowList, etc.
})

export const handler: Handler = async (event, context) => {
    return provider.handler(event, context)
}