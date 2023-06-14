import mongoose, {Schema, SchemaTypes, model} from "mongoose";

await mongoose.connect("mongodb://localhost:27017/userposts");

await mongoose.disconnect();