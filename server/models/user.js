import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    gender:{
        type:String,
        default : "",
        required: true
    },
    profilePic : {
        type:String,
        default: ""
    },
    tokens: [
        {
            token: {
                type: String,
            },
        },
    ],
},{timestamps:true});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});



userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

export default mongoose.model("chat_user", userSchema);