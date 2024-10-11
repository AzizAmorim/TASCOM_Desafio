import mongoose from "mongoose";

async function db(URL){
    await mongoose.connect(URL).then(() => {
        console.log("MongoDB Conectado!");
    });
};

export default db;