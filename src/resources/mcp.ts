import { ApiClient, ApiClientRequestOptions } from '../apiClient'

export class Mcp {
    constructor(private apiClient: ApiClient) { }

    /**
     * Make an MCP (Model Context Protocol) request.
     *
     * @param token The MCP token
     * @param message The MCP JSON-RPC message
     * @param init Optional request options
     */
    public async call<T = any>(
        token: string,
        message: {
            jsonrpc: '2.0'
            method: string
            params?: any
            id: string | number
        },
        init?: ApiClientRequestOptions
    ): Promise<T> {
        return this.apiClient.request<T>(`/mcp/${token}`, {
            method: 'POST',
            body: message,
            ...init,
        })
    }

    /**
     * Helper method to list available tools for an MCP server.
     *
     * @param token The MCP token
     * @param id JSON-RPC request ID
     * @param init Optional request options
     */
    public listTools(
        token: string,
        id: string | number = 1,
        init?: ApiClientRequestOptions
    ) {
        return this.call(
            token,
            { jsonrpc: '2.0', method: 'tools/list', id },
            init
        )
    }

    /**
     * Helper method to call a tool on an MCP server.
     *
     * @param token The MCP token
     * @param name Tool name
     * @param args Tool arguments
     * @param id JSON-RPC request ID
     * @param init Optional request options
     */
    public callTool(
        token: string,
        name: string,
        args: any = {},
        id: string | number = 1,
        init?: ApiClientRequestOptions
    ) {
        return this.call(
            token,
            {
                jsonrpc: '2.0',
                method: 'tools/call',
                params: { name, arguments: args },
                id,
            },
            init
        )
    }

    /**
     * Helper method to initialize an MCP connection.
     *
     * @param token The MCP token
     * @param clientInfo Optional client information
     * @param id JSON-RPC request ID
     * @param init Optional request options
     */
    public initialize(
        token: string,
        clientInfo?: { name: string; version: string },
        id: string | number = 1,
        init?: ApiClientRequestOptions
    ) {
        return this.call(
            token,
            {
                jsonrpc: '2.0',
                method: 'initialize',
                params: {
                    protocolVersion: '2024-11-05',
                    clientInfo,
                    capabilities: {},
                },
                id,
            },
            init
        )
    }
}
