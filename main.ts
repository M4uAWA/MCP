import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from 'zod'

//server instantiation
const server = new McpServer({
    name: "currency-mcp-server",
    version: "1.0.0"
});

//server tool
server.tool(
    'convert-currency',
    'tool to convert an amount between two currencies using an open API',
    {
        amount: z.number().describe('Amount of money to convert'),
        from: z.string().describe('Currency code to convert from, e.g., USD'),
        to: z.string().describe('Currency code to convert to, e.g., EUR'),
    },
    async ({ amount, from, to }) => {

        // Llamada a API gratuita (Frankfurter)
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);

        if (!res.ok) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error getting conversion rate.`
                    }
                ]
            }
        }

        const data = await res.json();
        const converted = data.rates[to];

        return {
            content: [
                {
                    type: "text",
                    text: `${amount} ${from} equals ${converted} ${to}.`
                }
            ]
        }
    }
);

//local connection
const transport = new StdioServerTransport();
server.connect(transport);