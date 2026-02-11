import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcryptjs";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.pre("save", async function(){
        if (!this.isModified("password")) return;
        let salt = await genSalt(10);
        this.password = await hash(this.password, salt);
})


export const UserModel = model("User", userSchema);