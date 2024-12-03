import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshTokens: { 
        type: String, 
        default: null, 
    },
}, { timestamps: true }); 

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
