const mongoose = require("mongoose");

const DBCon = async () => {
    try {
        mongoose.connect(process.env.DB_URI,)
        console.log("db connected ");
    } catch (error) {
        console.log("error while con DB ", error.message);
    }
}

module.exports = DBCon