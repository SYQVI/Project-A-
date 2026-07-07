const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    messageId: {
        type: String,
        default: null
    },

    status: {
        type: String,
        enum: ["pending", "claimed", "accepted", "rejected"],
        default: "pending"
    },

    claimedBy: {
        type: String,
        default: null
    },

    reviewedBy: {
        type: String,
        default: null
    },

    answers: {
        type: [{
            question: String,
            answer: String
        }],
        default: []
    }

}, {
    timestamps: true
});

module.exports = model("Application", applicationSchema);
