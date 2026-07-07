const { Schema, model } = require("mongoose");

const guildConfigSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },

    applicationChannel: {
        type: String,
        default: null
    },

    logsChannel: {
        type: String,
        default: null
    },

    staffRole: {
        type: String,
        default: null
    },

    panelMessage: {
        type: String,
        default: null
    },

    panelChannel: {
        type: String,
        default: null
    }

}, {
    timestamps: true
});

module.exports = model("GuildConfig", guildConfigSchema);
