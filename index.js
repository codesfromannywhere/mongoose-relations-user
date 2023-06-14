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
//     age: 1,
// })


// const post1 = new postModel(
//     {
//         title: "The moon gives me goosebumps",
//         content: "because its usually very cold at night.",
//     }
// );


// const post2 = new postModel(
//     {
//         title: "New Animal: Moongooses",
//         content: "Discoverd on the moon"
//     }
// );


// ====== HIER WIRD EINE USER-ID EINEM POST ZU "gepusht/zugeordnet" ======

// post1.author.push(user);
// await post1.save()

// post2.author.push(user);
// await post2.save()


// ====== SUCHEN NACH DATEN =======

// Suchen Sie in der Datenbank nach einem Benutzer mit einem bestimmten Namen und geben Sie alle seine Posts aus.

const findUsername = await userModel.find({ name: "Moon Goose" });

if (findUsername.length > 0) {
    const userId = findUsername[0]._id;

    const findUserPostAll = await postModel.find({ author: userId });

    console.log(findUserPostAll);
} else {
    console.log("Author nicht gefunden.");
}


// Suchen Sie in der Datenbank nach einem Post mit einem bestimmten Titel und geben Sie den Autor dieses Posts aus.

const findUserPosts = await postModel.find({ title: "New Animal: Moongooses" })
console.log(findUserPosts[0].author);


// ===== CIAO KAKAO, LIEBE DATENBANK <3 =======

await mongoose.disconnect();