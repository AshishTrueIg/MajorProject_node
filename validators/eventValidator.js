export default {
    createEventSchema: {
        type: "object",
        properties: {
            title: { type: "string", minLength: 3 },
            description: { type: "string", maxLength: 500 },
            date: { type: "string", format: "date-time" },
            status:{type:"string"},
            venueId: { type: "integer" },
        },
        required: ["title", "venueId"],
        additionalProperties: false
    }
};
