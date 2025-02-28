export default{
    createTicketSchema: {
        type: "object",
        properties: {
            eventId: { type: "integer" },
            userId: { type: "integer" },
            type: { type: "string", enum: ["VIP", "General", "Premium"] }, // Example types
            price: { type: "number", minimum: 0 }
        },
        required: ["userId", "type", "price"],
        additionalProperties: false
    }
};
