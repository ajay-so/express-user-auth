//user information (username, password, full name, gender, date of birth, country) and then store them in the database.

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username : {
        type : String,
        required : true

    },
    password : {
        type : String,
        required : true

    },
    full_name : {
        type : String,
        required : true

    },
    gender : {
        type : String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    DOB : {
        type : Date,
        required : true

    },
    country : {
        type : String,
        required : true

    }
});

const User = model("User", userSchema);

module.exports =  User ;