import mongoose from "mongoose";

//User Schema
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique: true,
    },
    email: {
        type : String,
        required: true,
        unique : true,
    },

    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true
})

//Create User Model.
const User = mongoose.model('User',userSchema);

export default User;