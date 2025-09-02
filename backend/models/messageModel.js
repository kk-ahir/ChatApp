import mongoose from 'mongoose';
import User from '../models/userSchema.js';

const MessageeSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recevier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "Message cannot be empty"
        },
    },
}, {
    timestamps: true
});

const Message = mongoose.model('Message', MessageeSchema);

export default Message;