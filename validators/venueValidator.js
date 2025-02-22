module.exports = {
    createUserSchema: {
        type: "object",
        properties: {
            name: { type: "string", minLength: 3 },
            location: { type: "string" },
            capacity: { type: "integer" }
        },
        required: ["name", "location", "capacity"],
        additionalProperties: false
    }
};
