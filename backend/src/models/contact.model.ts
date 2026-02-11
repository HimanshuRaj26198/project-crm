import { Schema, model } from  "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    status: {
        type:String,
        enum: ["Lead", "Prospect", "Customer"],
        default: "Lead"
    },
    notes: {
        type: String
    },
},{
    timestamps: true
})

export const contactModel = model("Contact", contactSchema);
