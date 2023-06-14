import mongoose, { Schema, SchemaTypes, model } from "mongoose";

await mongoose.connect("mongodb://localhost:27017/userpost");

// ====== USER SCHEMA ======
const userSchema = new Schema({
    name: String,
    age: Number,
})

const userModel = model("User", userSchema)


// ====== POST SCHEMA ======
const postSchema = new Schema({
    title: String,
    content: String,
    author: [{ type: SchemaTypes.ObjectId, ref: userModel }],
})

const postModel = model("Post", postSchema)



// ====== CREATE NEW DATA ======


// const user = await userModel.create({
//     name: "Moon Goose",
//     age: 47,
// })
// const user2 = await userModel.create({
//     name: "Rosa Blume",
//     age: 27
// })
// const user3 = await userModel.create({
//     name: "Moon Goose",
//     age: 41
// })




const post = new postModel({
    title: "When live gives you lemon",
    content: "... you can make some fresh lemon juice.",
})

post.author.push(post);

await post.save()



await mongoose.disconnect();