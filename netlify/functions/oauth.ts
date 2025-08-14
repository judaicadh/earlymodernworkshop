import type { Handler } from '@netlify/functions'
import { createNetlifyAuth } from 'netlify-cms-oauth-provider-node'

const provider = createNetlifyAuth({ provider: 'github' })

export const handler: Handler = async (event, context) => {
    return provider.handler(event, context)
}