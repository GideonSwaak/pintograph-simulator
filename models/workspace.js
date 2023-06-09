import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},
{
    timestamps: true,
});

export default mongoose.model("Workspace", workspaceSchema);