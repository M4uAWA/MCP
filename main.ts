import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

//server instantiation
const server = new McpServer({
    name: "wheather-mcp-server",
    version: "1.0.0",
});

//server tool
server.tool(
    'get-weather',
    'tool to get the weather for city',
    {
        city: z.string().describe('The name of the city to get the weather for'),
    },
    async ({ city }) => {
        //Request
        return {
            content: [
                {
                    type: "text",
                    text: `The weather in ${city} is sunny with a high of 25°C.`
                }
            ]
        }
    }
);

//local connection