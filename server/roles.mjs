import mongoose from "mongoose";

const { Schema, model } = mongoose;

const roleSchema = new Schema({
  role: String
});

const Role = model('Role', roleSchema);

export default Role;