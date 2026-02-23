const mongoose = require('mongoose');
const{Schema} = mongoose;
const bcrypt = require('bcrypt');


const adminSchema = new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    phonenumber:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default: 'admin'
    }
});

adminSchema.pre("save",async function(){
    const admin = this;
    if (!admin.isModified('password'))return;
    let salt =await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(admin.password, salt);
    admin.password = hash;
});

adminSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
