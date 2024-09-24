import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  roleId: mongoose.ObjectId
});

const User = model('User', userSchema);

export default User;