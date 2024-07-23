import mongoose from "mongoose";

function connectDatabase(){
    const db_url = process.env.DB_URL
    if(db_url){
        mongoose.set("strictQuery", true)
        mongoose.connect(db_url)
        mongoose.connection.on('connected', () => {
            console.log("Database connected successfully")
        })
        mongoose.connection.on('error', (error) => {
            console.log("Connection error ", error)
        })
    }else{
        throw {name: "No DB Url", message: "Database URL not added in environment"}
    }
}

export {
    connectDatabase
}