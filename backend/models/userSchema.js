import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    { timestamps: true }
);

// Model
const User = mongoose.model("User", UserSchema);

export default User;
