import { ApiClient } from '../apiClient'
import qs from 'qs'


export type McpInitCallPayload = {
    method: 'initialize'
    params: {
        protocolVersion?: string
        clientInfo: {
            name: string
            version: string
        }
    }
}

export type McpListToolsPayload = {
    method: 'tools/list'
    id?: number
}

export type McpCallToolPayload = {
    method: 'tools/call'
    id?: number
    params: {
        name: string
        arguments: Record<string, unknown>
    }
}

export type McpPayload = McpInitCallPayload | McpListToolsPayload | McpCallToolPayload

export type McpQueryParams = {
    integrated_account_id?: string
    [key: string]: unknown
}

export class Mcp {
    constructor(private apiClient: ApiClient) { }

    public async call(token: string, payload: McpPayload, queryParams?: McpQueryParams) {
        const queryString = qs.stringify(queryParams)
        return this.apiClient.request(
            `mcp/${token}${queryString ? `?${queryString}` : ''}`,
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        )
    }

    public async initialize(token: string, clientName: string, clientVersion: string, queryParams?: McpQueryParams) {
        return this.call(token, {
            method: 'initialize',
            params: {
                protocolVersion: '2024-11-05',
                clientInfo: {
                    name: clientName,
                    version: clientVersion
                }
            }
        }, queryParams)
    }

    public async listTools(token: string, queryParams?: McpQueryParams) {
        return this.call(token, { method: 'tools/list', id: 1 }, queryParams)
    }

    public async callTool(token: string, name: string, args: Record<string, unknown>, queryParams?: McpQueryParams) {
        return this.call(token, { method: 'tools/call', id: 2, params: { name, arguments: args } }, queryParams)
    }
}
