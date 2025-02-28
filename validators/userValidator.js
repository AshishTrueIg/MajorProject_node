const createUserSchema = {
        type: "object",
        properties: {
            name: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            role: { type: "string", enum: ["organizer", "attendee", "admin"] } 
        },
        required: ["name", "email", "role"],
        additionalProperties: false
}

export default createUserSchema;