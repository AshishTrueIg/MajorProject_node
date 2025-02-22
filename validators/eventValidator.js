module.exports = {
    createEventSchema: {
        type: "object",
        properties: {
            title: { type: "string", minLength: 3 },
            description: { type: "string", maxLength: 500 },
            date: { type: "string", format: "date-time" },
            venueId: { type: "integer" },
            organizerId: { type: "integer" },
        },
        required: ["title", "venueId","organizerId"],
        additionalProperties: false
    }
};
