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


const user = await userModel.create({
    name: "Lemon Ade",
    age: 22,
})


const post1 = new postModel(
    {
        title: "When live gives you lemon",
        content: "... you can make some fresh lemon juice.",
    }
);


const post2 = new postModel(
    {
        title: "Easy Peasy",
        content: "lemon squeezyyyyy."
    }
);

// ====== HIER WIRD EINE USER-ID EINEM POST ZU "gepusht/zugeordnet" ======

post1.author.push(user);
await post1.save()

post2.author.push(user);
await post2.save()



// const postforUser = await userModel.findById("6489b3a5a63ef6e46581ae5f")
// console.log(postforUser);


await mongoose.disconnect();